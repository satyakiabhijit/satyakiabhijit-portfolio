import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  changePasswordAction,
  logoutAction,
  updateSeasonAction,
} from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSiteTheme } from "@/lib/siteTheme";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

const successMessages: Record<string, string> = {
  login: "Logged in.",
  season: "Season theme updated.",
  password: "Password changed successfully.",
};

const errorMessages: Record<string, string> = {
  season: "Invalid season value.",
  "password-missing": "Fill all password fields.",
  "password-mismatch": "New password and confirmation do not match.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?error=auth");
  }

  const params = await searchParams;
  const ok = typeof params.ok === "string" ? params.ok : "";
  const error = typeof params.error === "string" ? params.error : "";
  const currentTheme = await getSiteTheme();
  const success = successMessages[ok] ?? "";
  const errorMessage = errorMessages[error] ?? decodeURIComponent(error || "");

  return (
    <section className="min-h-screen px-4 py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Admin Panel
            </h1>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Logout
              </button>
            </form>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage seasonal site effects and update your admin password.
          </p>

          {success && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
              {success}
            </p>
          )}
          {errorMessage && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Seasonal Theme
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Active: <span className="font-semibold">{currentTheme.season}</span>
          </p>

          <form action={updateSeasonAction} className="space-y-4">
            <label
              htmlFor="season"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Select season
            </label>
            <select
              id="season"
              name="season"
              defaultValue={currentTheme.season}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
            >
              <option value="winter">Winter</option>
              <option value="summer">Summer</option>
              <option value="rain">Rain</option>
              <option value="autumn">Autumn</option>
              <option value="spring">Spring</option>
              <option value="none">None</option>
            </select>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-5 py-2.5"
            >
              Save Theme
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Change Admin Password
          </h2>
          <form action={changePasswordAction} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Current password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nextPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                New password
              </label>
              <input
                id="nextPassword"
                name="nextPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-semibold px-5 py-2.5"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
