"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const RED = "#7B1313";
const PINK_BG = "#f5d0d0";

type FloorPlanUnit = {
  type: string;
  config: string;
  category: string;
  image: string;
  odd: { carpet: string; balcony: string; bua: string; sbua: string };
  even?: { carpet: string; balcony: string; bua: string; sbua: string };
};

function SectionLabel({ text }: { text: string }) {
  return <div className="section-label">{text}</div>;
}

/* ── ICONS ───────────────────────────────────────── */
function IconSecurity() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <path d="M24 4L8 11v13c0 9 7 17 16 20 9-3 16-11 16-20V11L24 4z" strokeLinejoin="round"/>
      <path d="M16 24l6 6 10-10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBadminton() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <rect x="8" y="20" width="20" height="14" rx="4"/>
      <line x1="28" y1="27" x2="42" y2="13"/>
      <circle cx="14" cy="10" r="5"/>
    </svg>
  );
}
function IconBasketball() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <circle cx="22" cy="30" r="14"/>
      <path d="M22 16v-6M14 22H8M30 22h6"/>
      <path d="M13 19s3 5 3 11M31 19s-3 5-3 11"/>
      <rect x="10" y="6" width="24" height="6" rx="1"/>
    </svg>
  );
}
function IconCCTV() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <rect x="6" y="16" width="24" height="14" rx="3"/>
      <polygon points="30,19 44,13 44,33 30,27"/>
      <circle cx="18" cy="23" r="3"/>
      <line x1="18" y1="30" x2="18" y2="38"/>
      <line x1="10" y1="38" x2="26" y2="38"/>
    </svg>
  );
}
function IconFire() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <path d="M24 6c0 0-10 10-10 20a10 10 0 0020 0C34 16 24 6 24 6z"/>
      <path d="M24 20c0 0-5 5-5 10a5 5 0 0010 0C29 25 24 20 24 20z" fill={RED} fillOpacity="0.2"/>
    </svg>
  );
}
function IconGym() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <rect x="2" y="20" width="8" height="8" rx="2"/>
      <rect x="38" y="20" width="8" height="8" rx="2"/>
      <rect x="10" y="16" width="6" height="16" rx="2"/>
      <rect x="32" y="16" width="6" height="16" rx="2"/>
      <line x1="16" y1="24" x2="32" y2="24" strokeWidth="4"/>
    </svg>
  );
}
function IconIndoor() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <circle cx="24" cy="10" r="6"/>
      <circle cx="14" cy="28" r="6"/>
      <circle cx="34" cy="28" r="6"/>
      <circle cx="24" cy="42" r="4"/>
      <line x1="24" y1="16" x2="24" y2="36"/>
    </svg>
  );
}
function IconPool() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={RED} strokeWidth="2.5" className="w-12 h-12">
      <circle cx="34" cy="10" r="4"/>
      <path d="M12 22l8-10 6 8 6-4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 34c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4" strokeLinecap="round"/>
      <path d="M6 42c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 8 4" strokeLinecap="round"/>
    </svg>
  );
}

const amenities = [
  { icon: <IconSecurity />, label: "24x7 Security" },
  { icon: <IconBadminton />, label: "Badminton Court" },
  { icon: <IconBasketball />, label: "Basketball Court" },
  { icon: <IconCCTV />, label: "CCTV" },
  { icon: <IconFire />, label: "Fire Protection & Fire Safety Requirements" },
  { icon: <IconGym />, label: "Gym" },
  { icon: <IconIndoor />, label: "Indoor Games" },
  { icon: <IconPool />, label: "Swimming Pool" },
];

const galleryImages = [
  { src: "/gallery/ELEVATION_VIEW_2.jpg", alt: "Elevation View" },
  { src: "/gallery/CENTRAL_LAWN.jpg", alt: "Central Lawn" },
  { src: "/gallery/AMPHITHEATER.jpg", alt: "Amphitheater" },
  { src: "/gallery/POOL-2.jpg", alt: "Swimming Pool" },
  { src: "/gallery/OPEN AIR FUTSAL GROUND.jpg", alt: "Futsal Ground" },
  { src: "/gallery/KIDSPLAY_AREA.jpg", alt: "Kids Play Area" },
  { src: "/gallery/INDOOR GAMES.jpg", alt: "Indoor Games" },
  { src: "/gallery/BANQUET.jpg", alt: "Banquet Hall" },
  { src: "/gallery/KIDS PLAY ROOM.jpg", alt: "Kids Play Room" },
  { src: "/gallery/WATERBODY_EXPERIENCE_VIEW.jpg", alt: "Water Body" },
];

const unitTypes = [
  { config: "2 BHK + 2TL", category: "Standard", sba: "971 Sq. Ft.", price: "₹ 71 Lacs" },
  { config: "3 BHK + 2TL", category: "Smart", sba: "1130 – 1162 Sq. Ft.", price: "₹ 82 Lacs" },
  { config: "3 BHK + 2TL", category: "Comfort", sba: "1215 – 1275 Sq. Ft.", price: "₹ 88.50 Lacs" },
  { config: "3 BHK + 3TL", category: "Luxury", sba: "1400 – 1550 Sq. Ft.", price: "₹ 1.01 Cr" },
];

const paymentMilestones = [
  { milestone: "Application Money", amount: "₹ 1,00,000 + GST" },
  { milestone: "Booking Amount (Within 15 days)", amount: "10% + GST" },
  { milestone: "On Agreement Execution / Registration", amount: "10% + 50% Legal + GST" },
  { milestone: "On Piling Level Completion", amount: "10% + GST" },
  { milestone: "On Plinth Level Casting", amount: "10% + GST" },
  { milestone: "On 3rd Floor Casting", amount: "10% + GST" },
  { milestone: "On 6th Floor Casting", amount: "7% + GST" },
  { milestone: "On 10th Floor Casting", amount: "7% + GST" },
  { milestone: "On 13th Floor Casting", amount: "7% + GST" },
  { milestone: "On 17th Floor Casting", amount: "7% + GST" },
  { milestone: "On Ultimate Roof Casting", amount: "7% + GST" },
  { milestone: "On Flooring Completion", amount: "5% + GST" },
  { milestone: "On Lift Installation Commencement", amount: "5% + 100% EC&D + 50% Legal + GST" },
  { milestone: "On Offer for Possession", amount: "5% + GST" },
];

const nearbyPlaces = {
  shopping: [
    { place: "Gabtala Bazaar", time: "1 Min" },
    { place: "Spencer's", time: "6 Mins" },
    { place: "Downtown Mall", time: "7 Mins" },
    { place: "Rosedale Plaza", time: "7 Mins" },
  ],
  hospitals: [
    { place: "Wellcare Nursing Home", time: "< 1 Min" },
    { place: "Tata Medical Centre", time: "12 Mins" },
    { place: "Neotia Bhagirathi", time: "15 Mins" },
    { place: "Ohio Hospital", time: "15 Mins" },
  ],
  work: [
    { place: "Infosys", time: "1 Min" },
    { place: "ITC Infotech", time: "2 Mins" },
    { place: "Wipro", time: "2 Mins" },
    { place: "Unitech Infospace", time: "10 Mins" },
    { place: "TCS", time: "12 Mins" },
  ],
  schools: [
    { place: "Orchids The International School", time: "7 Mins" },
    { place: "DPS Newtown", time: "15 Mins" },
    { place: "The Newtown School", time: "15 Mins" },
    { place: "Narayana School", time: "20 Mins" },
  ],
  colleges: [
    { place: "Army Institute of Management", time: "5 Mins" },
    { place: "University of Engineering & Management", time: "7 Mins" },
    { place: "St Xavier's University", time: "7 Mins" },
    { place: "Sister Nivedita University", time: "15 Mins" },
    { place: "Techno International", time: "15 Mins" },
  ],
  landmarks: [
    { place: "Biswa Bangla Gate", time: "12 Mins" },
    { place: "Nearest Metro", time: "12 Mins" },
    { place: "Airport", time: "30 Mins" },
    { place: "Science City", time: "30 Mins" },
  ],
};

const floorPlanData: Record<string, { overview: string; units: FloorPlanUnit[] }> = {
  "Tower 2A": {
    overview: "/gallery/Floorplans/Tower 2A ~ Typical Floor Plan.png",
    units: [
      { type: "Type A", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2A  Type A~ 3BHK 3T (Luxury).png", odd: { carpet: "873", balcony: "147", bua: "1107", sbua: "1476" }, even: { carpet: "873", balcony: "158", bua: "1118", sbua: "1491" } },
      { type: "Type B", config: "2BHK + 2T", category: "Standard", image: "/gallery/Floorplans/Tower 2A  Type B~ 2BHK 2T.png", odd: { carpet: "596", balcony: "60", bua: "728", sbua: "971" } },
      { type: "Type C", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2A  Type C~ 3BHK 3T (Luxury).png", odd: { carpet: "826", balcony: "134", bua: "1048", sbua: "1398" }, even: { carpet: "826", balcony: "149", bua: "1064", sbua: "1418" } },
      { type: "Type D", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2A  Type D~ 3BHK 3T (Luxury).png", odd: { carpet: "829", balcony: "133", bua: "1049", sbua: "1399" }, even: { carpet: "829", balcony: "152", bua: "1068", sbua: "1424" } },
      { type: "Type E", config: "3BHK + 2T", category: "Smart", image: "/gallery/Floorplans/Tower 2A  Type E~ 3BHK 2T (Smart).png", odd: { carpet: "703", balcony: "82", bua: "854", sbua: "1138" }, even: { carpet: "703", balcony: "99", bua: "871", sbua: "1162" } },
      { type: "Type F", config: "3BHK + 2T", category: "Comfort", image: "/gallery/Floorplans/Tower 2A  Type F~ 3BHK 2T (Comfort).png", odd: { carpet: "774", balcony: "87", bua: "938", sbua: "1250" }, even: { carpet: "774", balcony: "101", bua: "951", sbua: "1268" } },
      { type: "Type G", config: "2BHK + 2T", category: "Standard", image: "/gallery/Floorplans/Tower 2A  Type G~ 2BHK 2T.png", odd: { carpet: "595", balcony: "60", bua: "728", sbua: "971" } },
      { type: "Type H", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2A  Type H~ 3BHK 3T (Luxury).png", odd: { carpet: "879", balcony: "147", bua: "1109", sbua: "1479" }, even: { carpet: "879", balcony: "157", bua: "1119", sbua: "1492" } },
    ],
  },
  "Tower 2B": {
    overview: "/gallery/Floorplans/Tower 2B ~ Typical Floor Plan.png",
    units: [
      { type: "Type A", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2B  Type A ~ 3BHK 3T (Luxury).png", odd: { carpet: "877", balcony: "146", bua: "1106", sbua: "1475" }, even: { carpet: "877", balcony: "157", bua: "1117", sbua: "1490" } },
      { type: "Type B", config: "2BHK + 2T", category: "Standard", image: "/gallery/Floorplans/Tower 2B  Type B ~ 2BHK 2T.png", odd: { carpet: "596", balcony: "60", bua: "728", sbua: "971" } },
      { type: "Type C", config: "3BHK + 2T", category: "Comfort", image: "/gallery/Floorplans/Tower 2B  Type C ~ 3BHK 2T (Comfort).png", odd: { carpet: "783", balcony: "82", bua: "940", sbua: "1253" }, even: { carpet: "783", balcony: "97", bua: "955", sbua: "1274" } },
      { type: "Type D", config: "3BHK + 2T", category: "Smart", image: "/gallery/Floorplans/Tower 2B  Type D ~ 3BHK 2T (Smart).png", odd: { carpet: "703", balcony: "82", bua: "852", sbua: "1136" }, even: { carpet: "703", balcony: "99", bua: "870", sbua: "1160" } },
      { type: "Type E", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2B  Type E ~ 3BHK 3T (Luxury).png", odd: { carpet: "826", balcony: "137", bua: "1047", sbua: "1397" }, even: { carpet: "826", balcony: "154", bua: "1065", sbua: "1420" } },
      { type: "Type F", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2B  Type F ~ 3BHK 3T (Luxury).png", odd: { carpet: "823", balcony: "138", bua: "1050", sbua: "1400" }, even: { carpet: "823", balcony: "159", bua: "1070", sbua: "1426" } },
      { type: "Type G", config: "2BHK + 2T", category: "Standard", image: "/gallery/Floorplans/Tower 2B  Type G ~ 2BHK 2T.png", odd: { carpet: "597", balcony: "60", bua: "728", sbua: "971" } },
      { type: "Type H", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2B  Type H ~ 3BHK 3T (Luxury).png", odd: { carpet: "874", balcony: "146", bua: "1108", sbua: "1477" }, even: { carpet: "874", balcony: "157", bua: "1119", sbua: "1492" } },
    ],
  },
  "Tower 2C": {
    overview: "/gallery/Floorplans/Tower 2C ~ Typical Floor Plan.png",
    units: [
      { type: "Type A", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2C  Type A ~ 3BHK 3T (Luxury).png", odd: { carpet: "942", balcony: "109", bua: "1133", sbua: "1511" }, even: { carpet: "942", balcony: "123", bua: "1148", sbua: "1531" } },
      { type: "Type B", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2C  Type B ~ 3BHK 3T (Luxury).png", odd: { carpet: "942", balcony: "108", bua: "1133", sbua: "1511" }, even: { carpet: "942", balcony: "110", bua: "1135", sbua: "1513" } },
      { type: "Type C", config: "3BHK + 2T", category: "Smart", image: "/gallery/Floorplans/Tower 2C  Type C ~ 3BHK 2T (Smart).png", odd: { carpet: "698", balcony: "82", bua: "847", sbua: "1130" }, even: { carpet: "698", balcony: "99", bua: "865", sbua: "1153" } },
      { type: "Type D", config: "3BHK + 3T", category: "Comfort", image: "/gallery/Floorplans/Tower 2C  Type D ~ 3BHK 3T (Comfort).png", odd: { carpet: "739", balcony: "105", bua: "916", sbua: "1221" }, even: { carpet: "739", balcony: "122", bua: "934", sbua: "1245" } },
      { type: "Type E", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2C  Type E ~ 3BHK 3T (Luxury).png", odd: { carpet: "943", balcony: "106", bua: "1129", sbua: "1505" }, even: { carpet: "943", balcony: "109", bua: "1132", sbua: "1510" } },
      { type: "Type F", config: "3BHK + 3T", category: "Luxury", image: "/gallery/Floorplans/Tower 2C  Type F ~ 3BHK 3T (Luxury).png", odd: { carpet: "942", balcony: "107", bua: "1131", sbua: "1507" }, even: { carpet: "942", balcony: "123", bua: "1147", sbua: "1530" } },
      { type: "Type G", config: "3BHK + 2T", category: "Comfort", image: "/gallery/Floorplans/Tower 2C  Type G ~ 3BHK 2T (Comfort).png", odd: { carpet: "736", balcony: "107", bua: "913", sbua: "1217" }, even: { carpet: "736", balcony: "122", bua: "928", sbua: "1237" } },
      { type: "Type H", config: "3BHK + 2T", category: "Smart", image: "/gallery/Floorplans/Tower 2C  Type H ~ 3BHK 2T (Smart).png", odd: { carpet: "698", balcony: "83", bua: "848", sbua: "1131" }, even: { carpet: "698", balcony: "98", bua: "863", sbua: "1151" } },
    ],
  },
};

/* ── CONTACT FORM ───────────────────────────────── */
function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // show success even on network error so user isn't left hanging
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-2xl mb-2">✓</div>
        <p style={{ color: RED }} className="font-semibold">Thank you!</p>
        <p className="text-sm text-gray-600 mt-1">Our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800"
      />
      <input
        required
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800"
      />
      <input
        required
        type="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-800"
      />
      <button
        type="submit"
        disabled={loading}
        style={{ background: RED }}
        className="text-white font-semibold py-2.5 rounded text-sm uppercase tracking-wide hover:opacity-90 transition-opacity mt-1 disabled:opacity-70"
      >
        {loading ? "Sending…" : "Call for Site Visit"}
      </button>
    </form>
  );
}

/* ── NAVBAR ─────────────────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["home", "overview", "amenities", "floorplans", "price", "gallery", "location"];
  const linkLabels: Record<string, string> = {
    home: "Home", overview: "Overview", amenities: "Amenities",
    floorplans: "Floor Plans", price: "Price", gallery: "Gallery", location: "Location",
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Image src="/logo.png" alt="Vinayak 21 Acres" width={140} height={48} className="object-contain h-12 w-auto" />
            <span className="hidden sm:block h-8 w-px bg-gray-200" />
            <Image src="/evernal.png" alt="Evernal Properties — Authorized Channel Partner" width={110} height={40} className="object-contain h-9 w-auto hidden sm:block" />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-widest uppercase">
            {navLinks.map(link => (
              <li key={link}>
                <a href={link === "home" ? "#hero" : `#${link}`} style={{ color: RED }} className="hover:opacity-70 transition-opacity">
                  {linkLabels[link]}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { download: true } }))}
                style={{ background: RED }}
                className="text-white px-3 py-1.5 rounded text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Download Brochure
              </button>
            </li>
          </ul>

          {/* Animated hamburger button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
            <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — always rendered, slides in/out */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div className={`absolute top-0 right-0 h-full w-[78%] max-w-[320px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: RED }}>Navigation</p>
              <p className="text-xs text-gray-400 mt-0.5">Vinayak 21 Acres</p>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={link === "home" ? "#hero" : `#${link}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b border-gray-50 group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold tabular-nums" style={{ color: PINK_BG, WebkitTextStroke: `1px ${RED}` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold text-gray-900 group-hover:opacity-70 transition-opacity">
                    {linkLabels[link]}
                  </span>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Drawer footer */}
          <div className="px-6 py-6 border-t border-gray-100 space-y-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { download: true } }));
              }}
              className="flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold text-sm w-full hover:opacity-90 transition-opacity"
              style={{ background: RED }}
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                <path d="M8 11a1 1 0 000 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2H8z"/>
              </svg>
              Download Brochure
            </button>
            <p className="text-center text-[10px] text-gray-400 tracking-wide">New Town · Kolkata · RERA Approved</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── HERO ───────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] flex items-end">
      <Image
        src="/gallery/ELEVATION_VIEW_2.jpg"
        alt="Vinayak 21 Acres"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <p className="text-white/80 text-sm tracking-widest uppercase mb-2">Off New Town Action Area III, Kolkata</p>
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 max-w-3xl">
          Vinayak 21 Acres
        </h1>
        <p className="text-white/90 text-sm sm:text-lg md:text-xl mb-6 max-w-xl">
          75% Open-to-Sky · 3-Acre Central Park · G+21 Towers · 750+ Homes
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#overview"
            style={{ background: RED }}
            className="text-white px-8 py-3 font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Explore Project
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup"))}
            className="text-white border border-white/70 px-8 py-3 font-semibold rounded hover:bg-white/10 transition-colors"
          >
            View Pricing
          </button>
        </div>
        {/* Key stats */}
        <div className="flex flex-wrap gap-5 sm:gap-8 mt-8">
          {[
            ["₹76L – 1.28Cr", "Starting Price"],
            ["2 & 3 BHK", "Configurations"],
            ["Mar 2032", "Possession"],
            ["G+21", "Floors"],
          ].map(([val, label]) => (
            <div key={label} className="text-white">
              <div className="text-xl font-bold">{val}</div>
              <div className="text-xs text-white/70 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OVERVIEW ───────────────────────────────────── */
function Overview() {
  return (
    <section id="overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Project Overview" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-14">
          Vinayak 21 Acres: Luxurious Township Living in New Town
        </h2>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded overflow-hidden shadow-lg">
            <Image
              src="/gallery/CENTRAL_LAWN.jpg"
              alt="Vinayak 21 Acres Central Lawn"
              fill
              className="object-cover"
            />
          </div>
          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Vinayak 21 Acres is a premium residential township in New Town, Kolkata, spread across 21 acres of
              thoughtfully planned development. Offering well-designed 2 and 3 BHK high-rise apartments, the project
              blends modern living with spacious comfort. With expansive green open spaces, premium amenities, and
              multiple lifestyle clubhouses, Vinayak 21 Acres delivers a well-rounded community living experience.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Phase I & II: 5 Sanctioned Towers of G+21 | 750+ Homes",
                "Proposed 5 Additional Towers | 900+ Homes & 80+ Villas",
                "75% Open-to-Sky | 3-Acre Central Park",
                "IGBC Precertified Platinum Green Building",
                "5 Dedicated Clubhouses – One per Phase",
                "Phase 1 RERA: WBRERA/P/SOU/2026/004147",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span style={{ color: RED }} className="mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { download: true } }))}
              style={{ background: RED }}
              className="inline-flex items-center gap-2 text-white px-8 py-3 font-semibold rounded hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
              Download Project Brochure
            </button>
          </div>
        </div>

        {/* Project stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            ["21 Acres", "Land Area"],
            ["10 Blocks", "No. of Blocks"],
            ["749+", "Total Units"],
            ["20%", "Units Sold"],
          ].map(([val, label]) => (
            <div key={label} className="text-center border rounded-lg p-6">
              <div style={{ color: RED }} className="text-2xl font-bold">{val}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── AMENITIES ──────────────────────────────────── */
function Amenities() {
  return (
    <section id="amenities" style={{ background: PINK_BG }} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Project Amenities" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-14">
          An Ensemble of Curated Comforts
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {amenities.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-4 text-center">
              <div className="amenity-icon">{icon}</div>
              <p className="text-sm font-medium text-gray-800 max-w-[120px]">{label}</p>
            </div>
          ))}
        </div>

        {/* Extra amenity highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "3-Acre Central Park",
              desc: "17,000 sq ft grand lawn, elevated cabanas, open-air amphitheatre, cascading waters, fun stream, maze garden, multiple kids' play areas, adventure challenge play area, pickleball court, mini basketball court, badminton court, skating rink and outdoor fitness zone.",
            },
            {
              title: "Dedicated Podium Clubs",
              desc: "Each phase has its own exclusive clubhouse with gym, yoga & meditation room, activity studio, indoor games, library cum co-working spaces, toddler's pool, infinity swimming pool, outdoor jacuzzi, pool cabana, banquet hall, guest rooms, kids play area & lounge.",
            },
            {
              title: "The Maidan & More",
              desc: "22,000 sq ft open-air futsal ground with 175m athletic track, 400m jogging track, 1km cycling track, cricket play arena, lawn tennis court, dedicated pet park and forest trail.",
            },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 style={{ color: RED }} className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICE – sticky right panel ─────────────────── */
function Price() {
  return (
    <section id="price" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Price" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-14">
          Typology and Pricing Details
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT – scrollable pricing info */}
          <div className="flex-1 min-w-0">
            {/* Unit types table */}
            <h3 style={{ color: RED }} className="font-bold text-xl mb-4">Unit Configurations</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
              <table className="w-full text-sm">
                <thead style={{ background: RED }} className="text-white">
                  <tr>
                    {["Configuration", "Category", "Super Built-up Area", "Starting Price"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unitTypes.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3 font-medium">{row.config}</td>
                      <td className="px-4 py-3">{row.category}</td>
                      <td className="px-4 py-3">{row.sba}</td>
                      <td className="px-4 py-3 font-bold" style={{ color: RED }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Parking */}
            <h3 style={{ color: RED }} className="font-bold text-xl mb-4">Parking Options</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
              <table className="w-full text-sm">
                <thead style={{ background: RED }} className="text-white">
                  <tr>
                    {["Type", "Price"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Podium Covered", "₹ 6 Lacs"],
                    ["Ground Cover Dependent", "₹ 6 Lacs"],
                    ["Ground Cover Independent", "₹ 7 Lacs"],
                    ["Covered Mechanical (Pair)", "₹ 10 Lacs"],
                    ["EV Charges (Optional)", "₹ 50 Thousand"],
                  ].map(([type, price], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3">{type}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: RED }}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Plan */}
            <h3 style={{ color: RED }} className="font-bold text-xl mb-4">Construction-Linked Payment Schedule</h3>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead style={{ background: RED }} className="text-white">
                  <tr>
                    {["Milestone", "Amount"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentMilestones.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3">{row.milestone}</td>
                      <td className="px-4 py-3 font-semibold">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              * Price includes unit charges. Extra charges: Electricity Connection & Transformer, Generator, Legal,
              Club / Amenities Development, Association Formation, Deposits, and Applicable GST.
              AC at extra cost: Daikin VRV @ ₹420/Sq.Ft. (Optional).
            </p>
          </div>

          {/* RIGHT – sticky contact panel */}
          <div className="lg:w-80 w-full sticky top-20 self-start">
            {/* Project quick info */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
              <div style={{ background: RED }} className="px-4 py-3 text-white font-semibold text-sm uppercase tracking-wide">
                Project Highlights
              </div>
              <div className="divide-y text-sm">
                {[
                  ["Price Range", "₹76L – 1.28Cr"],
                  ["Configuration", "2 BHK, 3 BHK"],
                  ["Possession", "March 2032"],
                  ["Land Area", "21 Acres"],
                  ["Towers", "10 Blocks (G+21)"],
                  ["RERA (Phase 1)", "WBRERA/P/SOU/2026/004147"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between px-4 py-2.5">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[160px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div style={{ background: RED }} className="px-4 py-3 text-white font-semibold text-sm uppercase tracking-wide">
                Get Expert Assistance
              </div>
              <div className="p-4">
                <ContactForm compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── GALLERY ────────────────────────────────────── */
function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" style={{ background: "#f9f9f9" }} className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Gallery" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-14">
          Life at Vinayak 21 Acres
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map(({ src, alt }) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium bg-black/40 px-2 py-1 rounded">
                  {alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <Image src={lightbox} alt="Gallery" fill className="object-contain" />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none hover:opacity-70"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

/* ── LOCATION ───────────────────────────────────── */
function Location() {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Location" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Prime Connectivity & Urban Access
        </h2>
        <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
          200 m from 6-lane highway · 400 m from Infosys · Shuttle bus service to the nearest metro for residents
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map embed */}
          <div className="rounded-xl overflow-hidden shadow-md h-56 sm:h-80 bg-gray-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.5!2d88.48!3d22.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzQ4LjAiTiA4OMKwMjgnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vinayak 21 Acres Location"
            />
          </div>

          {/* Nearby places */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.entries(nearbyPlaces) as [string, { place: string; time: string }[]][]).map(([category, places]) => (
              <div key={category} className="bg-gray-50 rounded-xl p-4">
                <h4 style={{ color: RED }} className="font-bold text-sm uppercase tracking-wide mb-3 capitalize">
                  {category === "work" ? "IT Hubs" : category === "colleges" ? "Colleges" : category}
                </h4>
                <ul className="space-y-1.5">
                  {places.map(({ place, time }) => (
                    <li key={place} className="flex justify-between text-xs text-gray-700">
                      <span>{place}</span>
                      <span className="font-semibold" style={{ color: RED }}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            <strong style={{ color: RED }}>Site Address:</strong>{" "}
            Vinayak 21 Acres, Hatishala, Off Newtown Action Area III, Kolkata
          </p>
          <p className="text-gray-500 text-sm mt-1">
            <strong style={{ color: RED }}>Corporate:</strong>{" "}
            Vinayak Corporate House, 122/1R Satyendranath Majumder Sarani, Kolkata 700 026
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── DEVELOPER ──────────────────────────────────── */
function Developer() {
  return (
    <section className="py-16" style={{ background: PINK_BG }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <SectionLabel text="About Developer" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              4 Decades of Transforming Kolkata's Skyline
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For nearly four decades, Vinayak Group has been changing Kolkata's residential landscape. Built on a
              consistent, customer-first approach, their projects reflect focus on thoughtful planning, reliable
              delivery and a standard of quality that has earned enduring trust over time.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
              {[["45+", "Projects Delivered"], ["5.7M sq ft", "Under Construction"], ["7000+", "Happy Residents"]].map(
                ([val, label]) => (
                  <div key={label}>
                    <div style={{ color: RED }} className="text-xl sm:text-2xl font-bold">{val}</div>
                    <div className="text-gray-500 text-[10px] sm:text-xs mt-1">{label}</div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-video rounded-xl overflow-hidden shadow-lg w-full">
            <Image src="/gallery/WATERBODY_EXPERIENCE_VIEW.jpg" alt="Vinayak Group" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────── */
function Footer() {
  const quickLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Amenities", href: "#amenities" },
    { label: "Floor Plans", href: "#floorplans" },
    { label: "Price", href: "#price" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <footer style={{ background: "#120202" }} className="text-white/60 relative overflow-hidden">
      {/* Red top accent */}
      <div style={{ background: RED }} className="h-[3px] w-full" />

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,19,19,0.18) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Vinayak 21 Acres"
              width={130}
              height={44}
              className="object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Premium residential township in New Town, Kolkata. Experience elevated living across 21 curated acres.
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 leading-tight">Marketed by</span>
              <span className="block h-6 w-px bg-white/15" />
              <Image src="/evernal.png" alt="Evernal Properties" width={110} height={36} className="object-contain h-8 w-auto brightness-0 invert opacity-90" />
            </div>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <p className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
              Contact Us
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <div>
                  <a href="tel:+919123361286" className="text-white/70 hover:text-white transition-colors block">+91 91233 61286</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-white/60 leading-relaxed">Off New Town Action Area III,<br />Kolkata – 700156</span>
              </div>
            </div>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <p className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
                >
                  <span className="block w-3 h-px transition-all duration-300 group-hover:w-5" style={{ background: RED }} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — RERA */}
          <div>
            <p className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
              RERA Registration
            </p>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-white/8 px-4 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1">Phase 1</p>
                <p className="text-white/70 font-mono text-xs">WBRERA/P/SOU/2026/004147</p>
              </div>
              <div className="rounded-lg border border-white/8 px-4 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1">Phase 2</p>
                <p className="text-white/70 font-mono text-xs">WBRERA/P/SOU/2026/004275</p>
              </div>
              <a
                href="https://rera.wb.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs hover:text-white transition-colors mt-1"
                style={{ color: "#e07070" }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                rera.wb.gov.in
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-7">
          <p className="text-white/30 text-[11px] leading-relaxed text-center max-w-4xl mx-auto mb-4">
            <span className="text-white/40 font-medium">Disclaimer:</span> This document does not constitute an offer, contract, agreement, or transaction of any nature. All layout plans are for illustrative purposes only. Project design, planning, amenities and phasing are subject to statutory approvals. Refer to WBRERA website for complete project information. T&amp;C Apply.
          </p>
          <p className="text-center text-white/25 text-[11px] tracking-wide">
            © 2026 Vinayak Group. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

/* ── FLOATING BUTTONS ───────────────────────────── */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/919123361286"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ background: "#25D366" }}
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      {/* Call */}
      <a
        href="tel:+919123361286"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-gray-900"
        aria-label="Call"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
    </div>
  );
}

/* ── VIDEO SECTION ──────────────────────────────── */
function VideoSection() {
  return (
    <section className="relative w-full max-h-[85vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover max-h-[85vh]"
        style={{ minHeight: "400px" }}
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 flex flex-col items-center justify-center text-white text-center px-6">
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-4">Vinayak 21 Acres · New Town, Kolkata</p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 max-w-3xl leading-tight">
          More Than You Imagine
        </h2>
        <p className="text-white/80 text-sm sm:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed">
          Where the outdoors and indoors come together, almost seamlessly. Life reinvents itself in spacious openness.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#overview"
            style={{ background: RED }}
            className="text-white px-8 py-3 font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Explore Project
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-popup", { detail: { download: true } }))}
            className="text-white border border-white/60 px-8 py-3 font-semibold rounded hover:bg-white/10 transition-colors"
          >
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FLOOR PLANS ─────────────────────────────────── */
function FloorPlans() {
  const towers = Object.keys(floorPlanData);
  const [activeTower, setActiveTower] = useState(towers[0]);
  const [lightbox, setLightbox] = useState<{ src: string; unit: FloorPlanUnit | null } | null>(null);
  const [gridKey, setGridKey] = useState(0);

  const tower = floorPlanData[activeTower];

  function switchTower(t: string) {
    setActiveTower(t);
    setGridKey(k => k + 1);
  }

  const categoryStyle: Record<string, { badge: string; bar: string }> = {
    Luxury:   { badge: "bg-amber-100 text-amber-800",   bar: "#F59E0B" },
    Comfort:  { badge: "bg-blue-100 text-blue-800",     bar: "#3B82F6" },
    Smart:    { badge: "bg-emerald-100 text-emerald-800", bar: "#10B981" },
    Standard: { badge: "bg-gray-100 text-gray-500",     bar: "#9CA3AF" },
  };

  return (
    <section id="floorplans" className="py-14 md:py-24 bg-[#F8F5F0]">
      <style>{`
        @keyframes fp-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fp-scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fp-card     { animation: fp-fade-up  0.45s ease both; }
        .fp-lightbox { animation: fp-scale-in 0.22s ease both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Floor Plans" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Typology &amp; Floor Plan Designs
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-sm leading-relaxed">
          Explore detailed floor plans for every unit type across all three towers. All areas in sq. ft.
        </p>

        {/* Tower tabs — pill style */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {towers.map(t => (
            <button
              key={t}
              onClick={() => switchTower(t)}
              className="relative px-5 py-2.5 sm:px-8 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
              style={
                activeTower === t
                  ? { background: RED, color: "#fff", boxShadow: "0 6px 20px rgba(123,19,19,0.35)", transform: "scale(1.06)" }
                  : { background: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

          {/* ── Left: Tower overview (sticky) ── */}
          <div className="w-full lg:w-[36%] lg:sticky lg:top-24">
            <button
              onClick={() => setLightbox({ src: tower.overview, unit: null })}
              className="w-full text-left rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md group transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Card header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Typical Floor Plan</p>
                  <p className="font-bold text-gray-900 text-base">{activeTower}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-gray-700 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                  Enlarge
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
                <Image
                  src={tower.overview}
                  alt={`${activeTower} Typical Floor Plan`}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{tower.units.length} unit configurations</span>
                <span className="text-xs font-semibold" style={{ color: RED }}>View full plan →</span>
              </div>
            </button>
          </div>

          {/* ── Right: Unit card grid ── */}
          <div className="w-full lg:w-[64%]">
            <div key={gridKey} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {tower.units.map((unit, i) => {
                const cs = categoryStyle[unit.category] ?? { badge: "bg-gray-100 text-gray-500", bar: "#9CA3AF" };
                return (
                  <button
                    key={unit.type}
                    onClick={() => setLightbox({ src: unit.image, unit })}
                    className="fp-card text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                    style={{ animationDelay: `${i * 0.055}s` }}
                  >
                    {/* Category colour bar */}
                    <div className="h-[3px] transition-all duration-300 group-hover:h-1" style={{ background: cs.bar }} />

                    {/* Floor plan image */}
                    <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                      <Image
                        src={unit.image}
                        alt={`${unit.type} floor plan`}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* "View Plan" hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                          View Plan
                        </span>
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-3.5">
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <div>
                          <p className="font-bold text-sm text-gray-900 leading-tight">{unit.type}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{unit.config}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-md flex-shrink-0 leading-tight ${cs.badge}`}>
                          {unit.category}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">SBUA</span>
                        <p className="text-sm font-bold" style={{ color: RED }}>
                          {unit.odd.sbua}{unit.even ? `–${unit.even.sbua}` : ""}
                          <span className="text-[10px] font-medium text-gray-400 ml-0.5">sq.ft.</span>
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="fp-lightbox bg-white rounded-3xl overflow-hidden w-full shadow-2xl flex flex-col lg:flex-row overflow-y-auto"
            style={{ maxWidth: lightbox.unit ? "880px" : "720px", maxHeight: "92vh" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image panel — full width when overview, split when unit */}
            <div className={`relative bg-[#F8F5F0] flex-shrink-0 overflow-hidden ${lightbox.unit ? "lg:w-[55%] aspect-[3/2] lg:aspect-auto" : "w-full aspect-[4/3] sm:aspect-[16/10]"}`}>
              <Image src={lightbox.src} alt="Floor Plan" fill className="object-contain p-6" />
            </div>

            {/* Info panel — only shown for unit views */}
            {lightbox.unit ? (
              <div className="lg:w-[45%] flex flex-col overflow-y-auto border-l border-gray-100">
                {/* Header */}
                <div className="p-6 pb-5 border-b border-gray-100">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">{activeTower}</p>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 leading-tight">{lightbox.unit.type}</h3>
                      <p className="text-gray-500 text-sm mt-0.5">{lightbox.unit.config}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0 ${categoryStyle[lightbox.unit.category]?.badge ?? "bg-gray-100 text-gray-500"}`}>
                      {lightbox.unit.category}
                    </span>
                  </div>
                </div>

                {/* Area table */}
                <div className="p-6 flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-4">Area Breakdown</p>
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-[320px]">
                      <thead>
                        <tr style={{ background: RED }}>
                          {["Floor", "Carpet", "Balcony", "BUA", "SBUA"].map(h => (
                            <th key={h} className="px-3 py-2.5 text-left text-white font-semibold text-[11px] whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <td className="px-3 py-3 font-semibold text-gray-700">{lightbox.unit.even ? "Odd" : "All"}</td>
                          <td className="px-3 py-3 text-gray-600">{lightbox.unit.odd.carpet}</td>
                          <td className="px-3 py-3 text-gray-600">{lightbox.unit.odd.balcony}</td>
                          <td className="px-3 py-3 text-gray-600">{lightbox.unit.odd.bua}</td>
                          <td className="px-3 py-3 font-bold" style={{ color: RED }}>{lightbox.unit.odd.sbua}</td>
                        </tr>
                        {lightbox.unit.even && (
                          <tr className="bg-white">
                            <td className="px-3 py-3 font-semibold text-gray-700">Even</td>
                            <td className="px-3 py-3 text-gray-600">{lightbox.unit.even.carpet}</td>
                            <td className="px-3 py-3 text-gray-600">{lightbox.unit.even.balcony}</td>
                            <td className="px-3 py-3 text-gray-600">{lightbox.unit.even.bua}</td>
                            <td className="px-3 py-3 font-bold" style={{ color: RED }}>{lightbox.unit.even.sbua}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">* All areas in sq.ft. &nbsp;SBUA = Super Built-Up Area</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Close button */}
          <button
            className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onClick={() => setLightbox(null)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

/* ── SITE VISIT POPUP ───────────────────────────── */
const BROCHURE_PATH = "/Vinayak 21 Acres_Prelaunch Overview-Cmp.pdf";

function SiteVisitPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadAfter, setDownloadAfter] = useState(false);
  const autoShownRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (autoShownRef.current) return;
      autoShownRef.current = true;
      window.removeEventListener("scroll", onScroll);
      setTimeout(() => setShow(true), 1500);
    }
    function onOpenEvent(e: Event) {
      const ev = e as CustomEvent<{ download?: boolean }>;
      setDownloadAfter(ev.detail?.download === true);
      setShow(true);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("open-lead-popup", onOpenEvent as EventListener);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-lead-popup", onOpenEvent as EventListener);
    };
  }, []);

  function handleClose() {
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col md:flex-row max-h-[95vh] overflow-y-auto">
        {/* Left: elevation image */}
        <div className="relative hidden sm:block md:w-5/12 min-h-[220px]">
          <Image
            src="/gallery/ELEVATION_VIEW_2.jpg"
            alt="Vinayak 21 Acres"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">New Town, Kolkata</p>
            <p className="text-white font-bold text-lg leading-tight">Vinayak 21 Acres</p>
            <p className="text-white/80 text-xs mt-1">75% Open-to-Sky · G+21</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["₹76L Onwards", "2 & 3 BHK", "RERA Approved"].map(tag => (
                <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="md:w-7/12 p-6 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4" style={{ color: RED }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: RED }}>
                  {downloadAfter ? "Instant Download" : "Exclusive Offer"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {downloadAfter ? "Download Project Brochure" : "Book A Site Visit"}
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">
                {downloadAfter ? "Fill in your details to download the brochure." : "Experience the project first-hand."}
              </p>
            </div>
            <button onClick={handleClose} className="text-gray-300 hover:text-gray-500 text-2xl leading-none ml-2 flex-shrink-0">×</button>
          </div>

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: PINK_BG }}>
                <svg className="w-6 h-6" style={{ color: RED }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <p className="font-bold text-gray-900">Thank you!</p>
              <p className="text-sm text-gray-500 mt-1">
                {downloadAfter
                  ? "Your brochure download has started. Our team will also reach out shortly."
                  : "Our team will contact you shortly to confirm your visit."}
              </p>
            </div>
          ) : (
            <form onSubmit={async e => {
              e.preventDefault();
              setLoading(true);
              try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/site-visit`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(form),
                });
              } catch {
                // show success even on network error
              } finally {
                setLoading(false);
                setSubmitted(true);
                if (downloadAfter) {
                  const link = document.createElement("a");
                  link.href = BROCHURE_PATH;
                  link.download = "Vinayak 21 Acres - Brochure.pdf";
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }
            }} className="flex flex-col gap-2.5">
              <input
                required
                placeholder="Enter Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-800 bg-gray-50"
              />
              <input
                required
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-800 bg-gray-50"
              />
              <div className="flex">
                <span className="border border-r-0 border-gray-200 rounded-l-lg px-3 py-2.5 text-sm bg-gray-100 text-gray-500 font-medium">+91</span>
                <input
                  required
                  type="tel"
                  placeholder="Enter Number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="border border-gray-200 rounded-r-lg flex-1 px-3 py-2.5 text-sm focus:outline-none focus:border-red-800 bg-gray-50"
                />
              </div>
              <textarea
                placeholder="Enter Message (optional)"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={2}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-800 bg-gray-50 resize-none"
              />
              <p className="text-[10px] text-gray-400 leading-snug">
                I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
              </p>
              <button
                type="submit"
                disabled={loading}
                style={{ background: RED }}
                className="text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {loading ? "Sending…" : downloadAfter ? "Download Brochure" : "Book A Site Visit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── APARTMENT HIGHLIGHTS ───────────────────────── */
function ApartmentHighlights() {
  const highlights = [
    {
      title: "90% Homes with 3-Side Open Views",
      desc: "Natural light and cross ventilation from multiple directions, improving airflow and indoor comfort throughout the day.",
    },
    {
      title: "Double-height Sky Terraces",
      desc: "Increased vertical volume improves daylight penetration and creates a more open, airy spatial feel.",
    },
    {
      title: "Efficient Floor Plans",
      desc: "Reduced unused circulation areas improve overall usable living space and functional flow.",
    },
    {
      title: "Vastu-compliant Layouts",
      desc: "Room orientation and placement aligned to support peace, prosperity and harmony.",
    },
    {
      title: "Natural Light & Ventilation",
      desc: "Windows placed thoughtfully so every room breathes with sunlight and cool breezes.",
    },
    {
      title: "Layouts Designed for Ease of Living",
      desc: "Every element positioned to ease life. Every corner thoroughly and practically planned.",
    },
  ];

  return (
    <section id="apartments" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Apartment Highlights" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Designed for Open, Balanced Living
        </h2>
        <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
          Open and well-ventilated homes where every square foot is usable. Double-height sky terraces add volume and bring the outdoors closer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map(({ title, desc }) => (
            <div key={title} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-8 h-0.5 mb-4" style={{ background: RED }} />
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── GREEN BUILDING ─────────────────────────────── */
function GreenBuilding() {
  const features = [
    "Water-efficient Fixtures",
    "Solar Power for Common Lighting",
    "Recycling for Waste Reduction & Management",
    "Grey Water Treatment Plant",
    "LED Lighting for Common Areas",
    "Rain-water Harvesting",
    "Provision for EV Charging",
    "Health-safe Low VOC Paints",
    "High Solar Reflective Index Roof Tiles",
  ];

  return (
    <section id="green" className="py-24" style={{ background: PINK_BG }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Green Building" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Carbon Conscious Homes
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm leading-relaxed">
          Sustainability at its core — reducing environmental impact while enhancing everyday comfort through smart systems and green infrastructure.
        </p>

        {/* IGBC Hero card */}
        <div className="rounded-2xl mb-8 overflow-hidden" style={{ background: RED }}>
          <div className="px-8 py-7 flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left flex-1">
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>Certified Achievement</p>
              <h3 className="text-white font-bold text-xl md:text-2xl leading-snug">IGBC Precertified Platinum Rated Green Building</h3>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Indian Green Building Council&apos;s highest pre-construction certification — recognising design excellence in sustainability.
              </p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-8 py-4 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
              <p className="font-bold text-2xl text-white">Platinum</p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>Highest IGBC Rating</p>
            </div>
          </div>
        </div>

        {/* 9-feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: PINK_BG }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill={RED}>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-800 leading-snug">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SPECIFICATIONS ─────────────────────────────── */
function Specifications() {
  const specs = [
    {
      category: "Structure",
      items: [
        "RCC framed structure with seismic-compliant design as per IS code",
        "Exterior walls: Concrete using Mivan technology",
        "Interior walls: AAC blocks",
      ],
    },
    {
      category: "Living / Dining / Lobby / Passage",
      items: [
        "Floor: Premium finish vitrified tiles",
        "Walls & ceiling: Wall putty finish",
      ],
    },
    {
      category: "Bedrooms",
      items: [
        "Floor: Premium quality vitrified tiles",
        "Walls: Wall putty finish",
      ],
    },
    {
      category: "Kitchen",
      items: [
        "Floor: Vitrified tiles",
        "Walls: Tiles up to 2 ft on counter wall",
        "Counter: Granite counter top",
        "Fitting: Stainless steel sink with reputed make fittings",
        "Adequate electrical points for kitchen appliances",
      ],
    },
    {
      category: "Toilet",
      items: [
        "Floor: Anti-skid tiles",
        "Walls: Tiles up to door height",
        "Sanitaryware and CP fittings of reputed make",
      ],
    },
    {
      category: "Balcony & Sky Terrace",
      items: [
        "Floor: Premium quality vitrified tiles",
        "Railing: MS railing",
      ],
    },
    {
      category: "Doors & Windows",
      items: [
        "Entrance door: Decorated flush door",
        "Internal doors: Flush doors",
        "Windows: Aluminium casement windows",
      ],
    },
    {
      category: "Electrical",
      items: [
        "Modular switches throughout",
        "Copper wiring",
      ],
    },
  ];

  return (
    <section id="specifications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel text="Specifications" />
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-14">
          Built to a Higher Standard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map(({ category, items }) => (
            <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
              <div style={{ background: RED }} className="px-4 py-3 text-white font-semibold text-sm">
                {category}
              </div>
              <ul className="px-4 py-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span style={{ color: RED }} className="mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <VideoSection />
        <Overview />
        <ApartmentHighlights />
        <Amenities />
        <GreenBuilding />
        <FloorPlans />
        <Price />
        <Specifications />
        <Gallery />
        <Location />
        <Developer />
      </main>
      <Footer />
      <FloatingButtons />
      <SiteVisitPopup />
    </>
  );
}
