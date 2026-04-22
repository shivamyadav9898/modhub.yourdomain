import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";

const router: IRouter = Router();

const ADMIN_EMAIL = process.env["ADMIN_EMAIL"] ?? "";
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
    adminEmail?: string;
  }
}

router.post("/admin/login", (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD &&
    ADMIN_EMAIL &&
    ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    req.session.adminEmail = email;
    return res.json({ ok: true, email });
  }
  return res.status(401).json({ ok: false, error: "Invalid credentials" });
});

router.post("/admin/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("modhub.sid");
    res.json({ ok: true });
  });
});

router.get("/admin/me", (req: Request, res: Response) => {
  if (req.session.isAdmin) {
    return res.json({ isAdmin: true, email: req.session.adminEmail });
  }
  res.json({ isAdmin: false });
});

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) return next();
  res.status(401).json({ error: "Admin authentication required" });
}

export default router;
