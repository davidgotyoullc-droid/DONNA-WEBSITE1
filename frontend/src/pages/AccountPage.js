import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Package, PawPrint, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, formatPrice } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const VEST_SIZES = [
  { size: "MINI", min: 10, max: 12 },
  { size: "XS", min: 12, max: 14 },
  { size: "S", min: 13, max: 15 },
  { size: "M", min: 16, max: 18 },
  { size: "L", min: 19, max: 22 },
];

function recommendedSize(girth) {
  if (!girth) return null;
  const exact = VEST_SIZES.find((s) => girth >= s.min && girth < s.max);
  if (exact) return exact.size;
  if (girth < 10) return "MINI";
  if (girth >= 22) return "L (or ask us about custom)";
  const lower = [...VEST_SIZES].reverse().find((s) => girth >= s.min);
  return lower ? `${lower.size} (size up if between)` : null;
}

const EMPTY_DOG = { name: "", breed: "", neck_inches: "", girth_inches: "" };

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [dogs, setDogs] = useState(null);
  const [dogForm, setDogForm] = useState(EMPTY_DOG);
  const [addingDog, setAddingDog] = useState(false);
  const [savingDog, setSavingDog] = useState(false);

  useEffect(() => {
    if (user === false) navigate("/signin");
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      api.get("/orders").then(({ data }) => setOrders(data)).catch(() => setOrders([]));
      api.get("/account/dogs").then(({ data }) => setDogs(data)).catch(() => setDogs([]));
    }
  }, [user]);

  if (!user) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-[#5A6572]" data-testid="account-loading">Checking your session…</main>;
  }

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const saveDogs = async (next) => {
    setSavingDog(true);
    try {
      const payload = next.map((d) => ({ ...d, neck_inches: Number(d.neck_inches), girth_inches: Number(d.girth_inches) }));
      const { data } = await api.put("/account/dogs", { dogs: payload });
      setDogs(data);
      setDogForm(EMPTY_DOG);
      setAddingDog(false);
      toast.success("Pup profile saved");
    } catch {
      toast.error("Couldn't save — check the measurements and try again.");
    } finally {
      setSavingDog(false);
    }
  };

  const addDog = (e) => {
    e.preventDefault();
    saveDogs([...(dogs || []), dogForm]);
  };

  const removeDog = (index) => saveDogs(dogs.filter((_, i) => i !== index));

  const inputCls =
    "w-full rounded-2xl border border-[#3E2A33]/15 bg-white px-4 py-3 text-sm text-[#3E2A33] outline-none transition-colors placeholder:text-[#5A6572]/60 focus:border-[#E6007E] focus:ring-2 focus:ring-[#E6007E]/30";

  return (
    <main data-testid="account-page" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[#3E2A33]/10 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6007E] text-xl font-bold text-white">
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

        {/* My pups — saved sizes */}
        {user.role === "admin" && (
          <div className="mt-8 rounded-3xl border border-[#E6007E]/20 bg-[#E6007E]/5 p-6" data-testid="admin-studio-card">
            <p className="font-mono-accent text-[10px] tracking-[0.25em] text-[#E6007E]">STUDIO TOOLS</p>
            <p className="mt-1 text-sm text-[#3E2A33]">Manage the promotional pop-up campaign your visitors see.</p>
            <Link
              to="/admin"
              data-testid="admin-studio-link"
              className="mt-4 inline-block rounded-full bg-[#3E2A33] px-6 py-3 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              Open Admin Studio
            </Link>
          </div>
        )}

        {/* My pups — saved sizes */}
        <div className="mt-14 mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif-display flex items-center gap-3 text-2xl font-semibold text-[#3E2A33]">
            <PawPrint className="h-5 w-5 text-[#E6007E]" /> My pups' sizes
          </h2>
          {!addingDog && (dogs || []).length < 6 && (
            <button
              data-testid="add-dog-button"
              onClick={() => setAddingDog(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#3E2A33] px-5 py-2.5 text-sm font-semibold text-[#FDF7FA] transition-colors hover:bg-[#E6007E]"
            >
              <Plus className="h-4 w-4" /> Add a pup
            </button>
          )}
        </div>

        {addingDog && (
          <form onSubmit={addDog} className="mb-6 space-y-4 rounded-3xl border border-[#3E2A33]/10 bg-[#FBEEF4] p-6" data-testid="dog-form">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input data-testid="dog-name-input" required value={dogForm.name} onChange={(e) => setDogForm((f) => ({ ...f, name: e.target.value }))} placeholder="Pup's name" className={inputCls} />
              <input data-testid="dog-breed-input" value={dogForm.breed} onChange={(e) => setDogForm((f) => ({ ...f, breed: e.target.value }))} placeholder="Breed (optional)" className={inputCls} />
              <input data-testid="dog-neck-input" required type="number" step="0.5" min="4" max="40" value={dogForm.neck_inches} onChange={(e) => setDogForm((f) => ({ ...f, neck_inches: e.target.value }))} placeholder='Neck (inches)' className={inputCls} />
              <input data-testid="dog-girth-input" required type="number" step="0.5" min="6" max="60" value={dogForm.girth_inches} onChange={(e) => setDogForm((f) => ({ ...f, girth_inches: e.target.value }))} placeholder='Chest girth (inches)' className={inputCls} />
            </div>
            <p className="text-xs text-[#5A6572]">
              Not sure? The <Link to="/fitting-room" className="font-semibold text-[#E6007E] underline underline-offset-2">Fitting Room</Link> walks you through measuring.
            </p>
            <div className="flex gap-3">
              <button data-testid="dog-save-button" type="submit" disabled={savingDog} className="rounded-full bg-[#E6007E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3E2A33] disabled:opacity-60">
                {savingDog ? "Saving…" : "Save pup"}
              </button>
              <button type="button" data-testid="dog-cancel-button" onClick={() => { setAddingDog(false); setDogForm(EMPTY_DOG); }} className="rounded-full border border-[#3E2A33]/15 px-6 py-3 text-sm font-semibold text-[#3E2A33]">
                Cancel
              </button>
            </div>
          </form>
        )}

        {dogs === null ? (
          <p className="py-6 text-center text-[#5A6572]">Fetching the pups…</p>
        ) : dogs.length === 0 && !addingDog ? (
          <div className="rounded-3xl border border-dashed border-[#3E2A33]/20 p-10 text-center" data-testid="dogs-empty">
            <p className="font-serif-display text-lg text-[#3E2A33]">No pups saved yet</p>
            <p className="mt-2 text-sm text-[#5A6572]">Save your dog's measurements once and every size choice gets easier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="dogs-list">
            {dogs.map((dog, i) => (
              <div key={`${dog.name}-${i}`} className="rounded-3xl border border-[#3E2A33]/10 bg-white p-6 shadow-sm" data-testid={`dog-card-${i}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-serif-display text-lg font-semibold text-[#3E2A33]">{dog.name}</p>
                    {dog.breed && <p className="text-xs text-[#5A6572]">{dog.breed}</p>}
                  </div>
                  <button data-testid={`dog-remove-${i}`} onClick={() => removeDog(i)} className="text-[#5A6572] transition-colors hover:text-[#E6007E]" aria-label={`Remove ${dog.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-mono-accent mt-3 text-[10px] tracking-[0.2em] text-[#5A6572]">
                  NECK {dog.neck_inches}″ · GIRTH {dog.girth_inches}″
                </p>
                <p className="mt-3 rounded-2xl bg-[#7D8F4E]/10 px-4 py-2.5 text-sm text-[#3E2A33]" data-testid={`dog-size-${i}`}>
                  Suggested vest/harness size: <strong className="text-[#7D8F4E]">{recommendedSize(dog.girth_inches)}</strong>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
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
