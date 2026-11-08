import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setDone(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "This reset link is invalid or has expired.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";

  return (
    <main data-testid="reset-password-page" className="mx-auto flex max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm sm:p-10"
      >
        <img src="/images/brand-logo.jpg" alt="Donna Devlin Designs" className="mx-auto mb-6 h-16 w-auto" />
        {done ? (
          <div className="text-center" data-testid="reset-done">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#7D8F4E]" />
            <h1 className="font-serif-display mt-4 text-2xl font-semibold text-[#3E2A33]">All set</h1>
            <p className="mt-3 text-sm text-[#5A6572]">Your password is updated — sign in with the new one.</p>
            <Link to="/signin" data-testid="reset-goto-signin" className="mt-6 inline-block rounded-full bg-[#E6007E] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33]">
              Sign in
            </Link>
          </div>
        ) : !token ? (
          <div className="text-center" data-testid="reset-no-token">
            <h1 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">That link looks incomplete</h1>
            <p className="mt-3 text-sm text-[#5A6572]">Request a fresh reset link and we'll email it right over.</p>
            <Link to="/forgot-password" data-testid="reset-request-new" className="mt-6 inline-block rounded-full bg-[#3E2A33] px-7 py-3 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]">
              Request a new link
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">Choose a new password</h1>
            <form onSubmit={submit} className="mt-6 space-y-4" data-testid="reset-form">
              <input data-testid="reset-password-input" required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password (6+ characters)" className={inputCls} />
              <input data-testid="reset-confirm-input" required type="password" minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat the new password" className={inputCls} />
              {error && (
                <p data-testid="reset-error" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}
              <button data-testid="reset-submit-button" type="submit" disabled={busy} className="w-full rounded-full bg-[#E6007E] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33] disabled:opacity-60">
                {busy ? "Saving…" : "Save new password"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
