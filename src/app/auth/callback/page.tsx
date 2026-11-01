"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { AuthUser, PageLoader, useAuth } from "@/context/AuthContext";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { completeLogin } = useAuth();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/?auth=failed");
      return;
    }

    (async () => {
      try {
        const { token, user } = await apiFetch<{
          token: string;
          user?: AuthUser;
        }>("/api/auth/exchange-code", {
          method: "POST",
          body: JSON.stringify({ code }),
        });
        await completeLogin(token, user ?? null);
        toast.success("Signed in successfully");
        router.replace("/dashboard");
      } catch {
        router.replace("/?auth=failed");
      }
    })();
  }, [searchParams, router, completeLogin]);

  return <PageLoader fullScreen label="Signing you in" />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<PageLoader fullScreen label="Signing you in" />}>
      <CallbackHandler />
    </Suspense>
  );
}
