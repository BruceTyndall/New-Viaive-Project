export function TrustBar() {
  const items = [
    "Virtuoso · member network",
    "Four Seasons Preferred Partner",
    "Belmond Bellini Club",
    "Rosewood Elite",
    "Aman Inner Circle",
    "Rocco Forte Knights",
  ];
  return (
    <section className="bg-[#f6f3ee] border-y border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="text-[10px] tracking-[0.32em] uppercase text-black/50 text-center mb-6">
          Verified Partner Programs · Real Perks, Not Affiliations
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-black/60">
          {items.map((i) => (
            <span
              key={i}
              className="text-[13px] tracking-wide"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
