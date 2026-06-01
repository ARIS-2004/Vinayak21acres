import Link from "next/link";
import Image from "next/image";

const RED = "#7B1313";
const PINK_BG = "#fdf0f0";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Background project image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/ELEVATION_VIEW_2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        {/* White overlay so content stays readable */}
        <div className="absolute inset-0 bg-white/75" />
      </div>

      {/* Top accent strip */}
      <div className="relative z-10 h-1 w-full" style={{ background: RED }} />

      {/* Navbar */}
      <header className="relative z-10 border-b border-gray-100 bg-white/85 backdrop-blur-sm px-6 sm:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-4 sm:gap-5">
          <Image
            src="/logo.png"
            alt="Vinayak 21 Acres"
            width={180}
            height={64}
            className="object-contain"
            style={{ width: "auto", height: "auto", maxHeight: "3.25rem" }}
          />
          <span className="hidden sm:block h-9 w-px bg-gray-200" />
          <Image
            src="/evernal.png"
            alt="Evernal Properties"
            width={160}
            height={56}
            className="hidden sm:block object-contain"
            style={{ width: "auto", height: "auto", maxHeight: "2.5rem" }}
          />
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline-flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to website
        </Link>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 py-10 sm:py-14 flex-1">

        {/* SUCCESS ICON WITH SPARKLES */}
        <div className="relative w-44 h-32 mx-auto mb-6">
          {/* Sparkles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 140" fill="none">
            {/* Plus signs and dots scattered around */}
            <g style={{ color: RED }} fill="currentColor" stroke="currentColor">
              {/* Left side */}
              <path d="M30 50 L34 50 M32 48 L32 52" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="20" cy="78" r="2" />
              <circle cx="42" cy="92" r="2.5" fill="none" strokeWidth="1.5"/>
              <path d="M50 30 L54 30 M52 28 L52 32" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Right side */}
              <path d="M148 38 L152 38 M150 36 L150 40" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="165" cy="55" r="2" />
              <circle cx="180" cy="78" r="2.5" fill="none" strokeWidth="1.5"/>
              <path d="M170 95 L174 95 M172 93 L172 97" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Top */}
              <circle cx="95" cy="10" r="1.5" />
              <circle cx="110" cy="14" r="1.5" />
            </g>
          </svg>

          {/* Circle with check */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
            {/* Outer thin ring */}
            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: "#f3d3d3" }} />
            {/* Inner solid circle */}
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center shadow-md"
              style={{ background: RED }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* HEADLINE */}
        <div className="text-center mb-10">
          <p
            className="text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold mb-4"
            style={{ color: RED }}
          >
            Enquiry Received
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-gray-900 leading-none mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", fontWeight: 700 }}
          >
            Thank You!
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-14 h-px" style={{ background: RED }} />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gray-500">
              Welcome to Vinayak 21 Acres
            </span>
            <span className="block w-14 h-px" style={{ background: RED }} />
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            We have received your enquiry. Our senior sales advisor will reach out to you within{" "}
            <strong className="text-gray-900">24 hours</strong> with personalized details and an exclusive offer.
          </p>
        </div>

        {/* WHAT HAPPENS NEXT — card with dotted timeline */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 mb-5">
          {/* Section title with side lines */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="block flex-1 max-w-[80px] h-px" style={{ background: RED }} />
            <span className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: RED }}>
              What Happens Next
            </span>
            <span className="block flex-1 max-w-[80px] h-px" style={{ background: RED }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-2 relative">
            {/* Dotted connecting lines on desktop */}
            <div
              className="hidden sm:block absolute top-7 left-[17%] right-[83%] border-t border-dashed"
              style={{ borderColor: "#d4a8a8", borderTopWidth: "2px" }}
            />
            <div
              className="hidden sm:block absolute top-7 left-[50%] right-[50%] w-0"
            />
            <div
              className="hidden sm:block absolute top-7 left-[36%] right-[36%] border-t border-dashed"
              style={{ borderColor: "#d4a8a8", borderTopWidth: "2px" }}
            />
            <div
              className="hidden sm:block absolute top-7 left-[55%] right-[17%] border-t border-dashed"
              style={{ borderColor: "#d4a8a8", borderTopWidth: "2px" }}
            />

            {[
              {
                step: "01",
                title: "Personal Callback",
                desc: "Our expert will call you within 24 hours to understand your requirements.",
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.487 17.14l-4.065-3.696a1 1 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.86 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.39z"/>
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Full Project Details",
                desc: "Pricing breakdown, floor plans, payment schedule and availability will be shared.",
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v2H8V8z"/>
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Free Guided Visit",
                desc: "Book a complimentary site visit and experience the project in person.",
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="text-center relative z-10">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: PINK_BG, color: RED }}
                >
                  {s.icon}
                </div>
                <p className="text-[10px] tracking-[0.3em] font-bold uppercase mb-1.5" style={{ color: RED }}>
                  Step {s.step}
                </p>
                <p className="font-bold text-gray-900 text-sm mb-1.5">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Link
            href="/"
            style={{ background: RED }}
            className="flex-1 flex items-center justify-center gap-2 text-white px-6 py-3.5 font-bold rounded-lg hover:opacity-90 transition-opacity text-center text-sm tracking-wider uppercase shadow-md"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
            </svg>
            Explore the Project
          </Link>
          <a
            href="tel:+919123361286"
            className="flex-1 flex items-center justify-center gap-2 border-2 bg-white px-6 py-3.5 font-bold rounded-lg text-center text-sm tracking-wider hover:bg-gray-50 transition-colors"
            style={{ borderColor: RED, color: RED }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.487 17.14l-4.065-3.696a1 1 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.86 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.39z"/>
            </svg>
            +91 91233 61286
          </a>
          <a
            href="https://wa.me/919123361286"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-lg text-white text-sm tracking-wider uppercase transition-opacity hover:opacity-90 shadow-md"
            style={{ background: "#25D366" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* YOUR INFORMATION IS SAFE WITH US */}
        <div
          className="rounded-2xl p-5 sm:p-6 flex items-start gap-5 relative overflow-hidden"
          style={{ background: PINK_BG }}
        >
          {/* Shield icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2"
            style={{ background: "#fff", borderColor: "#f3d3d3", color: RED }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
          </div>

          <div className="flex-1 min-w-0 pr-32 sm:pr-40">
            <p className="font-bold text-gray-900 text-base sm:text-lg mb-1.5">Your Information is Safe with Us</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We respect your privacy. Your details will only be used by our team to assist you and will never be shared with third parties.
            </p>
          </div>

          {/* Decorative building illustration */}
          <svg
            className="absolute right-4 bottom-4 w-24 h-16 sm:w-32 sm:h-20 opacity-50"
            viewBox="0 0 140 80"
            fill="none"
            style={{ color: RED }}
          >
            <g stroke="currentColor" strokeWidth="1.2" fill="none">
              {/* Left building */}
              <rect x="20" y="30" width="22" height="40" />
              <line x1="20" y1="40" x2="42" y2="40" />
              <line x1="20" y1="50" x2="42" y2="50" />
              <line x1="20" y1="60" x2="42" y2="60" />
              <line x1="31" y1="30" x2="31" y2="70" />
              {/* Middle building (tallest) */}
              <rect x="50" y="15" width="30" height="55" />
              <line x1="50" y1="25" x2="80" y2="25" />
              <line x1="50" y1="35" x2="80" y2="35" />
              <line x1="50" y1="45" x2="80" y2="45" />
              <line x1="50" y1="55" x2="80" y2="55" />
              <line x1="65" y1="15" x2="65" y2="70" />
              {/* Right building */}
              <rect x="88" y="35" width="22" height="35" />
              <line x1="88" y1="45" x2="110" y2="45" />
              <line x1="88" y1="55" x2="110" y2="55" />
              <line x1="99" y1="35" x2="99" y2="70" />
              {/* Trees */}
              <circle cx="10" cy="65" r="4" />
              <line x1="10" y1="69" x2="10" y2="73" strokeWidth="0.8" />
              <circle cx="120" cy="62" r="5" />
              <line x1="120" y1="67" x2="120" y2="73" strokeWidth="0.8" />
              {/* Ground line */}
              <line x1="0" y1="73" x2="140" y2="73" strokeWidth="0.8" />
            </g>
          </svg>
        </div>

      </div>
    </main>
  );
}
