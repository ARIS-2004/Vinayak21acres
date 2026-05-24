import Link from "next/link";
import Image from "next/image";

const RED = "#7B1313";
const PINK_BG = "#f5d0d0";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Vinayak 21 Acres"
            width={140}
            height={48}
            className="object-contain h-10 w-auto"
            style={{ width: "auto", height: "auto", maxHeight: "2.5rem" }}
          />
        </Link>
      </header>

      {/* Hero card */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center">
          {/* Animated check */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative"
            style={{ background: PINK_BG }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: PINK_BG }}
            />
            <svg
              className="w-12 h-12 relative"
              style={{ color: RED }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: RED }}>
            Submission Received
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Thank&nbsp;You!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-3 max-w-md mx-auto">
            We've received your enquiry for <strong className="text-gray-900">Vinayak 21 Acres</strong>.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
            Our sales expert will reach out to you shortly with all the details. In the meantime, feel free to explore the project.
          </p>

          {/* What's next */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { step: "01", title: "We'll call you", desc: "Within 24 hours on your shared number." },
              { step: "02", title: "Get full details", desc: "Pricing, floor plans, payment plan." },
              { step: "03", title: "Site visit", desc: "Book a free guided visit to the project." },
            ].map((s) => (
              <div key={s.step} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold mb-1.5" style={{ color: RED }}>
                  STEP {s.step}
                </p>
                <p className="font-semibold text-gray-900 text-sm mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              style={{ background: RED }}
              className="text-white px-7 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <a
              href="tel:+919123361286"
              className="border border-gray-300 text-gray-800 px-7 py-3 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Call +91 91233 61286
            </a>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-gray-100 px-6 py-5 text-center">
        <p className="text-xs text-gray-400">
          © 2026 Vinayak Group · Marketed by Evernal Properties
        </p>
      </footer>
    </main>
  );
}
