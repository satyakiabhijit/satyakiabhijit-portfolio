import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const errorMessages: Record<string, string> = {
  missing: "Enter both username and password.",
  invalid: "Invalid username or password.",
  auth: "Please sign in to continue.",
  setup: "Admin setup is incomplete. Check server env vars.",
};

const successMessages: Record<string, string> = {
  logout: "You have been logged out.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const authed = await isAdminAuthenticated();
  if (authed) {
    redirect("/admin");
  }

  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : "";
  const ok = typeof params.ok === "string" ? params.ok : "";
  const message = errorMessages[error] ?? "";
  const success = successMessages[ok] ?? "";

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-24 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Private access only.
        </p>

        {message && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{message}</p>
        )}
        {success && (
          <p className="mb-4 text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
