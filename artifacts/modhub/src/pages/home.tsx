import { useGetStatsOverview, useListFeaturedApps, useListTrendingApps, useListLatestApps, useListCategories } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Activity, Download, Grid, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppCard } from "@/components/app-card";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: stats } = useGetStatsOverview();
  const { data: featured } = useListFeaturedApps();
  const { data: trending } = useListTrendingApps();
  const { data: latest } = useListLatestApps();
  const { data: categories } = useListCategories();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation("/search");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden hero-bg border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="text-gradient">Hitler Mod</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The premium destination for the best apps, games, and mods. Discover curated content with guaranteed safety.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl mb-12"
          >
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search premium apps and mods..."
                className="pl-12 h-14 text-lg bg-black/40 border-white/10 rounded-full focus-visible:border-primary/50 focus-visible:ring-primary/20 glassmorphism"
                onClick={() => setLocation("/search")}
                readOnly
              />
            </form>
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: Grid, label: "Total Apps", value: stats.totalApps },
                { icon: Download, label: "Downloads", value: `${(stats.totalDownloads / 1000).toFixed(1)}k+` },
                { icon: Activity, label: "Categories", value: stats.totalCategories },
                { icon: Star, label: "Avg Rating", value: stats.averageRating.toFixed(1) },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full glassmorphism text-sm font-medium">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{stat.label}:</span>
                  <span className="text-foreground">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 flex flex-col gap-12">
        {/* Categories Strip */}
        {categories && categories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Categories</h2>
              <Link href="/categories">
                <Button variant="ghost" className="text-primary hover:text-primary/80">View All</Button>
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x no-scrollbar">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}>
                  <div className="snap-start whitespace-nowrap px-6 py-3 rounded-xl glassmorphism hover-glow cursor-pointer transition-all flex items-center gap-2">
                    <span className="font-medium">{cat.name}</span>
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">{cat.appCount}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured */}
        {featured && featured.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary fill-primary" /> 
              Featured Apps
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar">
              {featured.map((app, i) => (
                <div key={app.id} className="snap-start min-w-[280px] md:min-w-[320px] w-[80vw] md:w-auto">
                  <AppCard app={app} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending */}
        {trending && trending.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-accent" /> 
              Trending Now
            </h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {trending.slice(0, 4).map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </motion.div>
          </section>
        )}

        {/* Latest */}
        {latest && latest.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {latest.map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
