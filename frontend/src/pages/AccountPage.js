import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Package, PawPrint } from "lucide-react";
import { api, formatPrice } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (user === false) navigate("/signin");
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      api.get("/orders").then(({ data }) => setOrders(data)).catch(() => setOrders([]));
    }
  }, [user]);

  if (!user) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-[#5A6572]" data-testid="account-loading">Checking your session…</main>;
  }

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <main data-testid="account-page" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6007E] text-xl font-bold text-[#FDF7FA]">
              {user.name ? user.name[0].toUpperCase() : <PawPrint className="h-6 w-6" />}
            </span>
            <div>
              <p className="font-mono-accent text-[10px] tracking-[0.25em] text-[#E6007E]">PACK MEMBER</p>
              <h1 className="font-serif-display text-2xl font-semibold text-[#3E2A33]" data-testid="account-name">
                {user.name || "Welcome back"}
              </h1>
              <p className="text-sm text-[#5A6572]" data-testid="account-email">{user.email}</p>
            </div>
          </div>
          <button
            data-testid="signout-button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-[#3E2A33]/15 px-6 py-3 text-sm font-semibold text-[#3E2A33] transition-colors hover:border-[#E6007E] hover:text-[#E6007E]"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <h2 className="font-serif-display mt-14 mb-6 flex items-center gap-3 text-2xl font-semibold text-[#3E2A33]">
          <Package className="h-5 w-5 text-[#E6007E]" /> Your orders
        </h2>

        {orders === null ? (
          <p className="py-10 text-center text-[#5A6572]">Fetching your orders…</p>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#3E2A33]/20 p-12 text-center" data-testid="orders-empty">
            <p className="font-serif-display text-xl text-[#3E2A33]">No orders yet</p>
            <p className="mt-2 text-sm text-[#5A6572]">When you check out while signed in, every order lands here.</p>
            <Link
              to="/shop"
              data-testid="orders-shop-link"
              className="mt-6 inline-block rounded-full bg-[#3E2A33] px-7 py-3 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="space-y-4" data-testid="orders-list">
            {orders.map((order) => (
              <div key={order.session_id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#3E2A33]/10 bg-white p-6 shadow-sm" data-testid={`order-${order.session_id.slice(-8)}`}>
                <div>
                  <p className="font-mono-accent text-[10px] tracking-[0.2em] text-[#5A6572]">
                    {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {order.session_id.slice(-8).toUpperCase()}
                  </p>
                  <p className="mt-1 text-sm text-[#3E2A33]">
                    {order.items?.map((i) => `${i.slug.replace(/-/g, " ")} ×${i.quantity}`).join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif-display text-lg font-bold text-[#3E2A33]">{formatPrice(order.amount)}</p>
                  <span
                    className={`font-mono-accent rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] ${
                      order.payment_status === "paid" ? "bg-[#7D8F4E]/20 text-[#7D8F4E]" : "bg-[#E6007E]/10 text-[#E6007E]"
                    }`}
                  >
                    {order.payment_status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}
