import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ME_KEY = ["admin", "me"] as const;

type MeResponse = { isAdmin: boolean; email?: string };

async function fetchMe(): Promise<MeResponse> {
  const res = await fetch("/api/admin/me", { credentials: "same-origin" });
  if (!res.ok) return { isAdmin: false };
  return res.json();
}

export function useAdmin() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ME_KEY,
    queryFn: fetchMe,
    staleTime: 30_000,
  });

  const loginMutation = useMutation({
    mutationFn: async (vars: { email: string; password: string }) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(vars),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Invalid credentials");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ME_KEY });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ME_KEY });
    },
  });

  const login = useCallback(
    (email: string, password: string) => loginMutation.mutateAsync({ email, password }),
    [loginMutation],
  );

  const logout = useCallback(() => logoutMutation.mutateAsync(), [logoutMutation]);

  return {
    isAdmin: data?.isAdmin ?? false,
    email: data?.email,
    loading: isLoading,
    login,
    logout,
    loginPending: loginMutation.isPending,
    loginError: loginMutation.error as Error | null,
  };
}
