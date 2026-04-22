import React from "react";
import { Link } from "wouter";
import { Star, Download, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { App } from "@workspace/api-client-react";
import { useFavorites } from "@/hooks/use-favorites";

export function AppCard({ app, index = 0 }: { app: App; index?: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(app.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(app.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/app/${app.id}`}>
        <div className="group relative h-full flex flex-col glassmorphism rounded-2xl p-4 cursor-pointer hover-glow transition-all duration-300">
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors ${
                favorite ? "text-red-500" : "text-white"
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart className="w-4 h-4" fill={favorite ? "currentColor" : "none"} />
            </Button>
          </div>

          <div className="flex gap-4 items-start mb-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/20 flex-shrink-0 border border-white/5">
              <img
                src={app.logoUrl}
                alt={app.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/100x100/1e293b/ffffff?text=" + app.name.charAt(0);
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate text-foreground mb-1 group-hover:text-primary transition-colors">
                {app.name}
              </h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                {app.category}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {app.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-accent font-medium text-sm">
              <Star className="w-4 h-4 fill-accent" />
              <span>{app.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Download className="w-4 h-4" />
              <span>{(app.downloads / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
