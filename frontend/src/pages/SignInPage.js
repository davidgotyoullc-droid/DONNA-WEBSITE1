import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result =
      mode === "signin" ? await login(form.email, form.password) : await register(form.name, form.email, form.password);
    setBusy(false);
    if (result.ok) {
      navigate("/account");
    } else {
      setError(result.error);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-5 py-3.5 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";

  return (
    <main data-testid="signin-page" className="texture-grain mx-auto flex max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm sm:p-10"
      >
        <img src="/images/brand-logo.jpg" alt="Donna Devlin Designs" className="mx-auto mb-6 h-16 w-auto" />
        <div className="mb-8 flex rounded-full border border-[#3E2A33]/15 p-1" data-testid="signin-tabs">
          <button
            data-testid="tab-signin"
            onClick={() => { setMode("signin"); setError(""); }}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${mode === "signin" ? "bg-[#3E2A33] text-[#FDF7FA]" : "text-[#3E2A33]"}`}
          >
            Sign in
          </button>
          <button
            data-testid="tab-register"
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${mode === "register" ? "bg-[#3E2A33] text-[#FDF7FA]" : "text-[#3E2A33]"}`}
          >
            Create account
          </button>
        </div>

        <h1 className="font-serif-display text-2xl font-semibold text-[#3E2A33]">
          {mode === "signin" ? "Welcome back to the pack" : "Join the pack"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#5A6572]">
          {mode === "signin"
            ? "Sign in to track orders and check out faster."
            : "Create an account to keep your orders, sizes and favourite prints in one place."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4" data-testid="signin-form">
          {mode === "register" && (
            <input data-testid="register-name-input" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
          )}
          <input data-testid="signin-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="Email address" className={inputCls} />
          <input
            data-testid="signin-password-input"
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={set("password")}
            placeholder={mode === "register" ? "Password (6+ characters)" : "Password"}
            className={inputCls}
          />
          {error && (
            <p data-testid="signin-error" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            data-testid="signin-submit-button"
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E6007E] py-4 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#3E2A33] disabled:opacity-60"
          >
            {mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create my account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#5A6572]">
          Shopping as a guest works too — <Link to="/shop" className="font-semibold text-[#E6007E] underline underline-offset-2">continue to the shop</Link>.
        </p>
      </motion.div>
    </main>
  );
}
