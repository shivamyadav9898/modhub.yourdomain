import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center py-32 px-4">
      <div className="glassmorphism rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-extrabold mb-2 text-gradient">404</h1>
          <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back to safety.
          </p>

          <Link href="/">
            <Button size="lg" className="bg-gradient-brand text-white rounded-full px-8 border-0 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
