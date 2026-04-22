import { useParams, Link } from "wouter";
import { useListApps, useListCategories } from "@workspace/api-client-react";
import { AppCard } from "@/components/app-card";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apps, isLoading: appsLoading } = useListApps({ category: slug });
  const { data: categories } = useListCategories();

  const categoryName = categories?.find(c => c.slug === slug)?.name || slug;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/categories">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold capitalize text-gradient">{categoryName} Apps</h1>
      </div>

      {appsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-48 glassmorphism rounded-2xl p-4 flex flex-col">
              <div className="flex gap-4">
                <Skeleton className="w-16 h-16 rounded-xl bg-white/5" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-5 w-3/4 bg-white/5" />
                  <Skeleton className="h-4 w-1/2 bg-white/5" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mt-4 bg-white/5" />
              <Skeleton className="h-4 w-2/3 mt-2 bg-white/5" />
            </div>
          ))}
        </div>
      ) : apps && apps.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {apps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4 text-muted-foreground">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No apps found</h3>
          <p className="text-muted-foreground">
            There are no apps in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
