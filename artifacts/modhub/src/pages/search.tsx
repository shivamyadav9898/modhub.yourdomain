import { useState, useEffect } from "react";
import { useListApps } from "@workspace/api-client-react";
import { Search as SearchIcon, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppCard } from "@/components/app-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { motion } from "framer-motion";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 250);
  
  const { data: apps, isLoading } = useListApps({ search: debouncedSearch });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for apps, games..."
            className="pl-14 h-16 text-xl bg-black/20 border-white/10 rounded-2xl focus-visible:border-primary/50 focus-visible:ring-primary/20 glassmorphism"
          />
        </div>
      </div>

      {isLoading ? (
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
          <h3 className="text-xl font-bold mb-2">No results found</h3>
          <p className="text-muted-foreground">
            We couldn't find anything matching "{searchTerm}". Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
