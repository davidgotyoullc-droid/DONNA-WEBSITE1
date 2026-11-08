import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MailQuestion } from "lucide-react";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/auth/forgot-password", { email });
    } catch {
      /* same message either way */
    }
    setBusy(false);
    setSent(true);
  };

  return (
    <main data-testid="forgot-password-page" className="mx-auto flex max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm sm:p-10"
      >
        <img src="/images/brand-logo.jpg" alt="Donna Devlin Designs" className="mx-auto mb-6 h-16 w-auto" />
        {sent ? (
          <div className="text-center" data-testid="forgot-sent">
            <MailQuestion className="mx-auto h-12 w-12 text-[#7D8F4E]" />
            <h1 className="font-serif-display mt-4 text-2xl font-semibold text-[#3E2A33]">Check your inbox</h1>
            <p className="mt-3 text-sm leading-relaxed text-[#5A6572]">
              If an account exists for <strong>{email}</strong>, a reset link is on its way. It works once
              and expires in 1 hour.
            </p>
            <Link to="/signin" data-testid="forgot-back-signin" className="mt-6 inline-block rounded-full bg-[#3E2A33] px-7 py-3 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]">
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">Forgot your password?</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#5A6572]">
              Enter the email on your account and we'll send a link to choose a new one.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4" data-testid="forgot-form">
              <input
                data-testid="forgot-email-input"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30"
              />
              <button
                data-testid="forgot-submit-button"
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-[#E6007E] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
              >
                {busy ? "Sending…" : "Email me a reset link"}
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-[#5A6572]">
              Remembered it? <Link to="/signin" className="font-semibold text-[#E6007E] underline underline-offset-2">Sign in</Link>
            </p>
          </>
        )}
      </motion.div>
    </main>
  );
}
