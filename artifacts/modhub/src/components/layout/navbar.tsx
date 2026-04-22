import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Heart, Shield, Home, Grid, Sun, Moon, Zap, Settings, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Categories", icon: Grid },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/admin", label: "Security", icon: Shield },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gradient">
            Hitler Mod
          </span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open settings menu"
              className="rounded-full h-10 w-10 bg-gradient-brand text-white border-0 shadow-[0_0_18px_rgba(124,58,237,0.55)] hover:shadow-[0_0_28px_rgba(124,58,237,0.85)] transition-shadow"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[88vw] max-w-sm p-0 border-l border-white/10 bg-[#0B0F1A]/95 backdrop-blur-xl text-foreground"
          >
            <SheetHeader className="px-6 py-5 border-b border-white/10 flex-row items-center justify-between space-y-0">
              <SheetTitle className="text-lg font-bold flex items-center gap-2 text-gradient">
                <Settings className="w-5 h-5 text-primary" />
                Settings
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </Button>
              </SheetClose>
            </SheetHeader>

            <nav className="flex flex-col p-4 gap-1.5">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = location === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    <div
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                        active
                          ? "bg-gradient-brand text-white border-transparent shadow-[0_0_20px_rgba(124,58,237,0.45)]"
                          : "bg-white/[0.03] border-white/10 text-foreground hover:bg-white/[0.07] hover:border-primary/40"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          active ? "bg-white/15" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{label}</span>
                    </div>
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={toggleTheme}
                className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all border bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-primary/40 mt-1 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary">
                    {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Theme</p>
                    <p className="text-xs text-muted-foreground capitalize">{theme} mode</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-medium">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>
            </nav>

            <div className="px-6 py-4 mt-auto border-t border-white/10 text-center text-xs text-muted-foreground">
              Hitler Mod &middot; Premium App Store
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
