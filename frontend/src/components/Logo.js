export default function Logo({ light = false, className = "h-11" }) {
  return (
    <span className={`inline-flex items-center rounded-xl bg-white/95 px-2 py-1 shadow-sm ring-1 ring-[#3E2A33]/5`} data-testid="brand-logo">
      <img
        src="/images/brand-logo.jpg"
        alt="Donna Devlin Designs"
        className={`${className} w-auto object-contain`}
      />
    </span>
  );
}
