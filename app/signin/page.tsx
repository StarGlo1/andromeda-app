"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Wallet } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading("email");
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading("");
    }
  };

  const handleOAuth = async (provider: string) => {
    setLoading(provider);
    if (provider === "google") {
      try {
        const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (oauthError) throw oauthError;
        return;
      } catch (err: any) {
        setError(err.message || "Failed to sign in with Google");
        setLoading("");
        return;
      }
    }
    // Apple and X remain placeholders
    setTimeout(() => {
      setLoading("");
      router.push("/dashboard");
    }, 1000);
  };

  const handleCryptoWallet = () => {
    setLoading("wallet");
    setTimeout(() => {
      setLoading("");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <main className="signin-page bg-transparent text-text flex justify-center pt-[42px]">
      <div className="max-w-md w-full bg-[#c9bfb2]/60 dark:bg-gray-900/60 border border-default/20 rounded-xl p-8 shadow-lg relative z-10 mt-0">
        <div className="w-20 h-20 mx-auto mb-6">
          <Image
            src="/images/andromeda-logo.png"
            alt="Andromeda Studios Logo"
            width={80}
            height={80}
            className="object-contain w-full h-full"
            priority
            unoptimized
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Sign in to your studio
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-3 mb-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <button
            type="submit"
            disabled={loading !== ""}
            className="w-full bg-[#4f8792] hover:bg-[#426f79] text-white font-medium py-2.5 rounded-full transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {loading === "email" ? "Signing in..." : "Sign In with Email"}
          </button>
        </form>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 border-t border-default"></div>
          <span className="text-xs text-text-muted">or continue with</span>
          <div className="flex-1 border-t border-default"></div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => handleOAuth("google")}
            disabled={loading !== ""}
            className="w-full bg-white dark:bg-gray-800 border border-default text-gray-900 dark:text-gray-100 font-medium py-2.5 rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading === "google" ? "Connecting..." : "Continue with Google"}
          </button>

          <button
            onClick={() => handleOAuth("apple")}
            disabled={loading !== ""}
            className="w-full bg-black border border-gray-700 text-white font-medium py-2.5 rounded-full transition-colors hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            {loading === "apple" ? "Connecting..." : "Continue with Apple"}
          </button>


          <button
            onClick={handleCryptoWallet}
            disabled={loading !== ""}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2.5 rounded-full transition-colors hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            {loading === "wallet" ? "Connecting..." : "Connect Solana Wallet"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to Andromeda?{" "}
            <Link href="/onboarding" className="text-text-brand hover:underline font-medium">
              Create Your Studio
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
