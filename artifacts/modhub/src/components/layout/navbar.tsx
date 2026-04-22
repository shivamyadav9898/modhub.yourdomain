import React from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, Shield, Home, Grid, Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleSearchClick = () => {
    if (location !== "/search") {
      setLocation("/search");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gradient hidden sm:inline-block">
            Hitler Mod
          </span>
        </Link>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search apps, games, mods..."
              className="pl-10 bg-black/20 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 rounded-full h-10 w-full"
              onClick={handleSearchClick}
              readOnly={location !== "/search"}
            />
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="hidden md:block">
            <Button variant={location === "/" ? "secondary" : "ghost"} size="sm" className={location === "/" ? "bg-gradient-brand text-white border-0" : ""}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/categories" className="hidden md:block">
            <Button variant={location === "/categories" ? "secondary" : "ghost"} size="sm" className={location === "/categories" ? "bg-gradient-brand text-white border-0" : ""}>
              <Grid className="w-4 h-4 mr-2" />
              Categories
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant={location === "/favorites" ? "secondary" : "ghost"} size="icon" className={location === "/favorites" ? "bg-gradient-brand text-white border-0 rounded-full" : "rounded-full"}>
              <Heart className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant={location === "/admin" ? "secondary" : "ghost"} size="icon" className={location === "/admin" ? "bg-gradient-brand text-white border-0 rounded-full" : "rounded-full"}>
              <Shield className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </nav>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glassmorphism border-t border-white/10 z-50 px-4 py-2 flex justify-around">
        <Link href="/">
          <Button variant="ghost" size="icon" className={location === "/" ? "text-primary" : "text-muted-foreground"}>
            <Home className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="ghost" size="icon" className={location === "/search" ? "text-primary" : "text-muted-foreground"}>
            <Search className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/categories">
          <Button variant="ghost" size="icon" className={location === "/categories" ? "text-primary" : "text-muted-foreground"}>
            <Grid className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
