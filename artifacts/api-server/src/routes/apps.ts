import { Router, type IRouter } from "express";
import { db, appsTable } from "@workspace/db";
import { and, eq, ilike, desc, sql } from "drizzle-orm";
import {
  ListAppsQueryParams,
  CreateAppBody,
  GetAppParams,
  DeleteAppParams,
  RegisterDownloadParams,
} from "@workspace/api-zod";
import { requireAdmin } from "./admin";

const router: IRouter = Router();

const CATEGORY_NAMES: Record<string, string> = {
  gaming: "Gaming",
  tools: "Tools",
  movies: "Movies",
  study: "Study",
  entertainment: "Entertainment",
  education: "Education",
  social: "Social",
  productivity: "Productivity",
};

function categoryName(slug: string): string {
  return CATEGORY_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

router.get("/apps", async (req, res) => {
  const params = ListAppsQueryParams.parse(req.query);
  const conds = [];
  if (params.search) conds.push(ilike(appsTable.name, `%${params.search}%`));
  if (params.category) conds.push(eq(appsTable.category, params.category));

  let order;
  if (params.sort === "trending") order = desc(appsTable.downloads);
  else if (params.sort === "rating") order = desc(appsTable.rating);
  else order = desc(appsTable.createdAt);

  const rows = await db
    .select()
    .from(appsTable)
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(order);

  res.json(rows);
});

router.get("/apps/featured", async (_req, res) => {
  const rows = await db
    .select()
    .from(appsTable)
    .where(eq(appsTable.featured, true))
    .orderBy(desc(appsTable.rating))
    .limit(10);
  res.json(rows);
});

router.get("/apps/trending", async (_req, res) => {
  const rows = await db
    .select()
    .from(appsTable)
    .orderBy(desc(appsTable.downloads))
    .limit(10);
  res.json(rows);
});

router.get("/apps/latest", async (_req, res) => {
  const rows = await db
    .select()
    .from(appsTable)
    .orderBy(desc(appsTable.createdAt))
    .limit(12);
  res.json(rows);
});

router.get("/apps/:id", async (req, res) => {
  const { id } = GetAppParams.parse(req.params);
  const [row] = await db.select().from(appsTable).where(eq(appsTable.id, id));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.post("/apps", requireAdmin, async (req, res) => {
  const body = CreateAppBody.parse(req.body);
  const [row] = await db
    .insert(appsTable)
    .values({
      name: body.name,
      category: body.category,
      description: body.description,
      logoUrl: body.logoUrl,
      screenshots: body.screenshots,
      downloadUrl: body.downloadUrl,
      size: body.size,
      version: body.version,
      developer: body.developer,
      featured: body.featured ?? false,
    })
    .returning();
  res.status(201).json(row);
});

router.delete("/apps/:id", requireAdmin, async (req, res) => {
  const { id } = DeleteAppParams.parse(req.params);
  await db.delete(appsTable).where(eq(appsTable.id, id));
  res.status(204).end();
});

router.post("/apps/:id/download", async (req, res) => {
  const { id } = RegisterDownloadParams.parse(req.params);
  const [row] = await db
    .update(appsTable)
    .set({ downloads: sql`${appsTable.downloads} + 1` })
    .where(eq(appsTable.id, id))
    .returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json({ url: row.downloadUrl, downloads: row.downloads });
});

router.get("/categories", async (_req, res) => {
  const rows = await db
    .select({
      slug: appsTable.category,
      appCount: sql<number>`count(*)::int`,
    })
    .from(appsTable)
    .groupBy(appsTable.category);

  const knownSlugs = Object.keys(CATEGORY_NAMES);
  const present = new Map(rows.map((r) => [r.slug, r.appCount]));
  const all = knownSlugs.map((slug) => ({
    slug,
    name: categoryName(slug),
    appCount: present.get(slug) ?? 0,
  }));
  // include any extra categories from the DB not in known list
  for (const r of rows) {
    if (!knownSlugs.includes(r.slug)) {
      all.push({ slug: r.slug, name: categoryName(r.slug), appCount: r.appCount });
    }
  }
  res.json(all);
});

router.get("/stats/overview", async (_req, res) => {
  const [agg] = await db
    .select({
      totalApps: sql<number>`count(*)::int`,
      totalDownloads: sql<number>`coalesce(sum(${appsTable.downloads}),0)::int`,
      totalCategories: sql<number>`count(distinct ${appsTable.category})::int`,
      averageRating: sql<number>`coalesce(avg(${appsTable.rating}),0)::float`,
    })
    .from(appsTable);
  res.json(agg);
});

export default router;
