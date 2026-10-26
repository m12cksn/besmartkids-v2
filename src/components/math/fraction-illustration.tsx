export function FractionIllustration() {
  return (
    <figure className="relative rounded-[2rem] border border-primary/15 bg-white p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold tracking-widest text-primary uppercase">
          Satu nilai, tiga bentuk
        </span>
        <span
          aria-hidden="true"
          className="rounded-full bg-accent px-3 py-1 text-sm font-black"
        >
          Aha!
        </span>
      </div>
      <svg
        viewBox="0 0 360 240"
        role="img"
        aria-labelledby="fraction-title fraction-desc"
        className="mt-3 w-full"
      >
        <title id="fraction-title">Tiga perempat lingkaran</title>
        <desc id="fraction-desc">
          Lingkaran dibagi menjadi empat bagian sama besar. Tiga bagian berwarna
          hijau dan satu bagian kosong.
        </desc>
        <circle cx="180" cy="120" r="103" fill="#f0fdf4" />
        <path d="M180 120 L180 30 A90 90 0 1 1 90 120 Z" fill="#15803d" />
        <path
          d="M180 120 L90 120 A90 90 0 0 1 180 30 Z"
          fill="#f1f5f9"
          stroke="#15803d"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <path d="M180 30 V210 M90 120 H270" stroke="white" strokeWidth="5" />
        <circle
          cx="180"
          cy="120"
          r="90"
          fill="none"
          stroke="#15803d"
          strokeWidth="2"
        />
        <circle cx="58" cy="44" r="7" fill="#facc15" />
        <path
          d="M304 168 v20 m-10-10 h20"
          stroke="#15803d"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="grid grid-cols-3 gap-2 text-center"
        aria-label="Tiga perempat sama dengan nol koma tujuh lima, sama dengan tujuh puluh lima persen"
      >
        {["¾", "0,75", "75%"].map((s, i) => (
          <div
            key={s}
            className={
              i === 0
                ? "rounded-2xl bg-primary px-1 py-3 text-2xl font-black text-white"
                : "rounded-2xl bg-muted px-1 py-3 text-2xl font-black"
            }
          >
            {s}
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-center text-sm leading-6 text-muted-foreground">
        Tiga dari empat bagian sama besar.
        <br />
        Bentuknya berbeda, nilainya tetap sama.
      </figcaption>
    </figure>
  );
}
