import { useFavorites } from "@/hooks/use-favorites";
import { useListApps } from "@workspace/api-client-react";
import { AppCard } from "@/components/app-card";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { data: apps, isLoading } = useListApps();

  const favoriteApps = apps?.filter(app => favorites.includes(app.id)) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />
        My Favorites
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 glassmorphism rounded-2xl p-4 animate-pulse bg-white/5"></div>
          ))}
        </div>
      ) : favoriteApps.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {favoriteApps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-full glassmorphism flex items-center justify-center mb-6 text-muted-foreground">
            <HeartOff className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No favorites yet</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            You haven't added any apps to your favorites. Explore our collection and find apps you love.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-brand text-white border-0 rounded-full px-8">
              Explore Apps
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
