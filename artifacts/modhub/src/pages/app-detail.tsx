import { useParams, Link } from "wouter";
import { useGetApp, getGetAppQueryKey, useRegisterDownload } from "@workspace/api-client-react";
import { useState } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ArrowLeft, Download, Star, Shield, Heart, Share2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AppDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: app, isLoading, isError } = useGetApp(id || "", {
    query: {
      enabled: !!id,
      queryKey: getGetAppQueryKey(id || "")
    }
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = id ? isFavorite(id) : false;
  
  const [descExpanded, setDescExpanded] = useState(false);

  const registerDownload = useRegisterDownload();

  const handleDownload = () => {
    if (!app) return;
    toast.success("Download started", { description: app.name });
    registerDownload.mutate({ id: app.id }, {
      onSuccess: (data) => {
        window.open(data.url, "_blank");
      },
      onError: () => {
        toast.error("Failed to initialize download");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-10 h-10 rounded-full mb-8 bg-white/5" />
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <Skeleton className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white/5 flex-shrink-0" />
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="h-10 w-2/3 max-w-md bg-white/5" />
            <Skeleton className="h-6 w-1/3 max-w-xs bg-white/5" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-32 rounded-full bg-white/5" />
              <Skeleton className="h-12 w-12 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !app) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">App not found</h1>
        <p className="text-muted-foreground mb-8">The app you are looking for does not exist or has been removed.</p>
        <Link href="/">
          <Button variant="outline" className="glassmorphism">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/">
        <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 mb-8">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden glassmorphism flex-shrink-0 border border-white/10 shadow-xl"
        >
          <img 
            src={app.logoUrl} 
            alt={app.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/200x200/1e293b/ffffff?text=${app.name.charAt(0)}`;
            }}
          />
        </motion.div>

        <div className="flex-1 w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{app.name}</h1>
                <p className="text-xl text-primary font-medium mb-4">{app.developer}</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 hidden sm:flex">
                {app.category}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 mb-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-foreground font-bold text-lg">
                  <span>{app.rating.toFixed(1)}</span>
                  <Star className="w-5 h-5 fill-accent text-accent" />
                </div>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-foreground font-bold text-lg">
                  <span>{(app.downloads / 1000).toFixed(1)}k+</span>
                </div>
                <span className="text-xs text-muted-foreground">Downloads</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-foreground font-bold text-lg">
                  <span>{app.size}</span>
                </div>
                <span className="text-xs text-muted-foreground">Size</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-foreground font-bold text-lg">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-xs text-muted-foreground">Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handleDownload}
                size="lg" 
                className="bg-gradient-brand text-white border-0 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all rounded-full px-8 text-lg h-14"
                disabled={registerDownload.isPending}
              >
                <Download className="w-5 h-5 mr-2" />
                {registerDownload.isPending ? "Starting..." : "Download APK"}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-14 w-14 rounded-full glassmorphism ${favorite ? "text-red-500 border-red-500/30 bg-red-500/10" : ""}`}
                onClick={() => toggleFavorite(app.id)}
              >
                <Heart className="w-6 h-6" fill={favorite ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full glassmorphism">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {app.screenshots && app.screenshots.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar">
            {app.screenshots.map((img, i) => (
              <div key={i} className="snap-start flex-shrink-0 w-[240px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden glassmorphism border border-white/10">
                <img 
                  src={img} 
                  alt={`Screenshot ${i + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glassmorphism rounded-3xl p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-primary" />
          About this app
        </h2>
        <div className="relative">
          <p className={`text-muted-foreground leading-relaxed whitespace-pre-wrap ${!descExpanded ? "line-clamp-4" : ""}`}>
            {app.description}
          </p>
          {!descExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
          )}
        </div>
        <Button 
          variant="ghost" 
          className="mt-2 text-primary hover:text-primary/80 p-0 h-auto font-semibold"
          onClick={() => setDescExpanded(!descExpanded)}
        >
          {descExpanded ? (
            <><ChevronUp className="w-4 h-4 mr-1" /> Show less</>
          ) : (
            <><ChevronDown className="w-4 h-4 mr-1" /> Read more</>
          )}
        </Button>

        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Version</p>
            <p className="font-medium">{app.version}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Updated</p>
            <p className="font-medium">{new Date(app.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Developer</p>
            <p className="font-medium text-primary">{app.developer}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <p className="font-medium capitalize">{app.category}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
