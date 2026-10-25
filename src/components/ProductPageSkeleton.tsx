export default function ProductPageSkeleton() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* HERO */}

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT */}

            <div className="animate-pulse">
              <div className="h-4 w-28 rounded bg-brand-orange/20 mb-5" />

              <div className="h-12 sm:h-14 w-[80%] rounded-lg bg-white/[0.08] mb-5" />

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-white/[0.05]" />

                <div className="h-4 w-[92%] rounded bg-white/[0.05]" />

                <div className="h-4 w-[70%] rounded bg-white/[0.05]" />
              </div>
            </div>


            {/* IMAGE */}

            <div className="aspect-[4/3] rounded-3xl bg-white/[0.06] animate-pulse" />

          </div>
        </div>
      </section>


      {/* CONTENT */}

      <section className="py-16 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-8 w-64 rounded bg-white/[0.08] animate-pulse mb-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-brand-border bg-brand-card p-6 animate-pulse"
              >
                <div className="h-5 w-1/2 rounded bg-white/[0.08] mb-4" />

                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/[0.05]" />

                  <div className="h-3 w-[85%] rounded bg-white/[0.05]" />

                  <div className="h-3 w-[60%] rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}