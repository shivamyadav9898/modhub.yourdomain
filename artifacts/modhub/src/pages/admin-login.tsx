import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Shield, LogIn, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/hooks/use-admin";

export default function AdminLogin() {
  const { login, loginPending, loginError } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      /* error surfaced via loginError */
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card
          className="border backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(79,70,229,0.35)",
            borderRadius: 18,
            boxShadow: "0 20px 60px -10px rgba(79,70,229,0.35)",
          }}
        >
          <CardHeader className="text-center space-y-3 pt-8">
            <div
              className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
            >
              <Shield className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Admin Access
            </CardTitle>
            <p className="text-sm text-[#9CA3AF]">
              Sign in to manage the Hitler Mod store
            </p>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-[#9CA3AF]">
                  Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@app.com"
                  className="bg-[#0B0F1A]/60 border-[rgba(79,70,229,0.3)] text-white placeholder:text-[#4B5563]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-[#9CA3AF]">
                  Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#0B0F1A]/60 border-[rgba(79,70,229,0.3)] text-white placeholder:text-[#4B5563]"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError.message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loginPending}
                className="w-full text-white border-0 h-11 font-semibold"
                style={{
                  background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                  boxShadow: "0 8px 24px -8px rgba(79,70,229,0.6)",
                }}
              >
                {loginPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                {loginPending ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-center text-xs text-[#6B7280]">
                Authorized personnel only
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
