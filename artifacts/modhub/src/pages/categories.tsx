import { useListCategories } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Gamepad2, Wrench, Film, GraduationCap, Tv, BookOpen, Users, Briefcase, LayoutGrid } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "gaming": return Gamepad2;
    case "tools": return Wrench;
    case "movies": return Film;
    case "study": return GraduationCap;
    case "entertainment": return Tv;
    case "education": return BookOpen;
    case "social": return Users;
    case "productivity": return Briefcase;
    default: return LayoutGrid;
  }
};

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <LayoutGrid className="w-8 h-8 text-primary" />
        Explore Categories
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : categories && categories.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            return (
              <motion.div key={cat.slug} variants={itemVariants}>
                <Link href={`/category/${cat.slug}`}>
                  <div className="glassmorphism rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover-glow transition-all h-full aspect-square group">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
                    <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                      {cat.appCount} {cat.appCount === 1 ? 'app' : 'apps'}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No categories found.
        </div>
      )}
    </div>
  );
}
