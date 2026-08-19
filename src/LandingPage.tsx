import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import svgPaths from "../imports/svg-c03ftl1f6l";
import imgHeroSection from "@/imports/HirelyLandingPage/c33fe0ab48bee1d4d7eead2aa8c36afa4aece2a0.png";
import imgHeroSection1 from "@/imports/HirelyLandingPage/3c0ea0dbb731abb6fda4b367ecf5796f75db7782.png";

/* ─── Parallax hook ─────────────────────────────────────────── */
function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        setOffset((center - viewCenter) * speed);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { ref, offset };
}

/* ─── Fade-in-up on scroll ──────────────────────────────────── */
function useFadeUp(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Staggered fade-up card wrapper ────────────────────────── */
const FadeCard = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const { ref, visible } = useFadeUp(0.1);
  return (
    <div
      ref={ref}
      className="transition-all ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transitionDuration: "600ms",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};

/* ─── Logo ─────────────────────────────────────────────────── */
function Logo() {
  return (
    <div className="grid leading-[0] place-items-start relative shrink-0" style={{ width: "118px", height: "25px", gap: 0, gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}>
      <div className="col-1 row-1 relative" style={{ height: "25px", width: "40px" }}>
        <svg className="absolute inset-0" fill="none" width="40" height="25" viewBox="0 0 61.3993 40.9671" preserveAspectRatio="none">
          <path d={svgPaths.p15c82e51} fill="#29235C" />
          <path d={svgPaths.p507c280} fill="#009FE3" />
        </svg>
      </div>
      <div className="col-1 row-1 relative inline-grid place-items-start" style={{ marginLeft: "54px", gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}>
        <div className="relative" style={{ height: "25px", width: "65px" }}>
          <svg className="absolute inset-0" fill="none" width="65" height="25" viewBox="0 0 94.2609 40.9672" preserveAspectRatio="none">
            <path d={svgPaths.p1e62d00} fill="#29235C" />
            <path d={svgPaths.p23d73d40} fill="#009FE3" />
            <path d={svgPaths.p26847800} fill="#29235C" />
            <path d={svgPaths.p5163900} fill="#29235C" />
            <path d={svgPaths.p3f43a900} fill="#29235C" />
            <path d={svgPaths.p30d30b40} fill="#29235C" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm w-full">
      <div className="flex h-[72px] md:h-[88px] items-center justify-between px-5 md:px-10 lg:px-20">
        <Logo />
        <div className="hidden lg:flex gap-8 items-center font-['Raleway:SemiBold',sans-serif] font-semibold text-[#29235c] text-sm xl:text-base">
          {["For Employers", "Pricing", "Hirely Verify", "How It Works"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#009fe3] transition-colors">{l}</a>
          ))}
        </div>
        <div className="hidden lg:flex gap-4 items-center">
          <Link to="/login" className="font-['Raleway:SemiBold',sans-serif] font-semibold text-[#29235c] text-sm xl:text-[15px] hover:text-[#009fe3] transition-colors whitespace-nowrap">Sign in</Link>
          <Link to="/signup?role=EMPLOYEE" className="border border-[rgba(0,0,0,0.1)] bg-white px-5 py-2.5 xl:px-6 xl:py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm xl:text-[15px] hover:border-[#29235c] transition-colors whitespace-nowrap">
            {`I'm a Candidate`}
          </Link>
          <Link to="/signup?role=EMPLOYER" className="bg-[#009fe3] px-5 py-2.5 xl:px-6 xl:py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm xl:text-[15px] hover:bg-[#0090cc] transition-colors whitespace-nowrap">
            Hire Staff
          </Link>
        </div>
        <button className="lg:hidden p-2 text-[#29235c]" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen
            ? <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          }
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[rgba(0,0,0,0.06)] px-5 py-6 flex flex-col gap-5">
          {["For Employers", "Pricing", "Hirely Verify", "How It Works"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-['Raleway:SemiBold',sans-serif] font-semibold text-[#29235c] text-base hover:text-[#009fe3]"
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link to="/signup?role=EMPLOYEE" onClick={() => setMenuOpen(false)} className="border border-[rgba(0,0,0,0.1)] bg-white px-6 py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm sm:text-[15px] text-center">
              {`I'm a Candidate`}
            </Link>
            <Link to="/signup?role=EMPLOYER" onClick={() => setMenuOpen(false)} className="bg-[#009fe3] px-6 py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] text-center">
              Hire Staff
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function HeroSection() {
  const { ref, offset } = useParallax(0.35);
  const { ref: textRef, visible } = useFadeUp(0.1);

  return (
    <div ref={ref} className="relative w-full flex flex-col items-center pt-[48px] px-5 md:px-10 lg:px-20 pb-[372px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute w-full object-cover object-top will-change-transform"
          style={{ height: "120%", top: "-10%", transform: `translateY(${offset}px)` }}
          src={imgHeroSection} />
      </div>
      <div
        ref={textRef}
        className="relative z-10 flex flex-col gap-6 items-center text-center w-full max-w-4xl transition-all duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)" }}
      >
        <div className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#1e1656]">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight lg:leading-[64px] mb-1">Hire Great Staff Fast.</p>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight lg:leading-[64px]">No Commissions. No Stress.</p>
        </div>
        <p className="font-['Raleway:Medium',sans-serif] font-medium text-[#1e1656] opacity-90 text-base sm:text-lg md:text-[20px] leading-relaxed md:leading-[32px] max-w-xl md:max-w-2xl">
          We connect small businesses with honest, pre-checked workers in 24 to 72 hours. No hidden fees. Free replacements.
        </p>
      </div>
    </div>
  );
}

/* ─── Action Cards ──────────────────────────────────────────── */
function ActionCards() {
  const { ref, offset } = useParallax(0.25);
  const { ref: cardsRef, visible } = useFadeUp(0.1);

  return (
    <div id="for-employers" ref={ref} className="relative w-full flex flex-col items-center p-5 sm:p-10 md:p-16 lg:p-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute object-cover w-full will-change-transform"
          style={{ height: "120%", top: "-10%", transform: `translateY(${offset}px)` }}
          src={imgHeroSection1} />
        <div className="absolute inset-0 bg-[rgba(41,35,92,0.95)]" />
      </div>
      <div
        ref={cardsRef}
        className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-6xl transition-all duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
      >
        <div className="bg-white flex-1 flex flex-col gap-6 p-8 md:p-10 rounded-2xl shadow-[0px_8px_12px_rgba(0,0,0,0.1)] relative">
          <div className="absolute inset-0 border border-[rgba(0,0,0,0.06)] rounded-2xl pointer-events-none" />
          <div className="flex flex-col gap-2">
            <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1px] uppercase">For Employers</p>
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-xl sm:text-2xl md:text-[28px]">Need reliable staff for your business?</p>
          </div>
          <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-sm sm:text-base leading-[26px]">
            Get immediate access to verified, pre-screened video profiles of candidates ready to work. Only hire the best.
          </p>
          <Link to="/signup?role=EMPLOYER" className="bg-[#009fe3] w-full py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] hover:bg-[#0090cc] transition-colors block text-center mt-auto">
            Find Staff Today
          </Link>
        </div>
        <div className="bg-[#29235c] flex-1 flex flex-col gap-6 p-8 md:p-10 rounded-2xl shadow-[0px_8px_12px_rgba(0,0,0,0.1)] relative border border-white/20">
          <div className="flex flex-col gap-2">
            <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1px] uppercase">For Jobseekers</p>
            <p className="font-['Raleway:Bold',sans-serif] font-bold text-white text-xl sm:text-2xl md:text-[28px]">Looking for a good job?</p>
          </div>
          <p className="font-['Raleway:Regular',sans-serif] font-normal text-white/90 text-sm sm:text-base leading-[26px]">
            We never take money from your salary. Access fair-paying vacancies from vetted, high-quality employers.
          </p>
          <Link to="/signup?role=EMPLOYEE" className="w-full py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] border border-white hover:bg-white/10 transition-colors block text-center mt-auto">
            Get Hired Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Why Choose ────────────────────────────────────────────── */
function WhyChooseSection() {
  const benefits = [
    { icon: <path d={svgPaths.p663c780} stroke="#29235C" strokeLinecap="round" strokeWidth="2" />, label: "1. REAL PEOPLE", title: "Watch 1-Minute Video Intros", desc: "Don't just read dry CVs. Watch short 1-minute video intros from pre-screened candidates before you invite them to interview." },
    { icon: <path d={svgPaths.p3037780} stroke="#29235C" strokeLinecap="round" strokeWidth="2" />, label: "2. PRE-CHECKED", title: "Thorough Verification", desc: "Rest easy knowing we check governmental ID cards (NIN/BVN), verified school certificates, and perform physical address visits." },
    { icon: <path d={svgPaths.p20975800} stroke="#29235C" strokeLinecap="round" strokeWidth="2" />, label: "3. ZERO RISK", title: "100% Free Replacements", desc: "If any staff member leaves or underperforms within your plan's guarantee period, we supply a pre-screened replacement for FREE." },
  ];
  const { ref: headRef, visible: headVisible } = useFadeUp(0.2);

  return (
    <section className="bg-[#f3f3f3] w-full flex flex-col gap-12 md:gap-16 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24">
      <div ref={headRef} className="flex flex-col gap-4 items-center text-center max-w-3xl w-full transition-all duration-700 ease-out"
        style={{ opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(24px)" }}>
        <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1.5px] uppercase">The Hirely Difference</p>
        <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">Recruitment Built on Absolute Trust</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {benefits.map((b, i) => (
          <FadeCard key={i} delay={i * 120}>
            <div className="bg-white flex flex-col gap-6 p-8 md:p-10 rounded-2xl relative h-full">
              <div className="absolute inset-0 border border-[rgba(0,0,0,0.06)] rounded-2xl pointer-events-none" />
              <div className="bg-[rgba(41,35,92,0.07)] flex items-center justify-center rounded-xl w-14 h-14 shrink-0">
                <svg fill="none" width="28" height="28" viewBox="0 0 28 28">{b.icon}</svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1px]">{b.label}</p>
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg sm:text-xl">{b.title}</p>
                <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-sm sm:text-[15px] leading-6">{b.desc}</p>
              </div>
            </div>
          </FadeCard>
        ))}
      </div>
    </section>
  );
}

/* ─── Check icon ────────────────────────────────────────────── */
function CheckIcon({ white = false }: { white?: boolean }) {
  return (
    <div className="relative shrink-0 w-4 h-4">
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 16 16">
        <g clipPath="url(#chk)">
          <path d={svgPaths.p39f7ce80} stroke={white ? "rgba(255,255,255,0.7)" : "#009FE3"} strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs><clipPath id="chk"><rect fill="white" height="16" width="16" /></clipPath></defs>
      </svg>
    </div>
  );
}

function FeatureItem({ text, white = false }: { text: string; white?: boolean }) {
  return (
    <div className="flex gap-3 items-start">
      <CheckIcon white={white} />
      <p className={`font-['Raleway:Medium',sans-serif] font-medium text-xs sm:text-[14px] leading-snug ${white ? "text-white" : "text-[#29235c]"}`}>{text}</p>
    </div>
  );
}

/* ─── Pricing ───────────────────────────────────────────────── */
function PricingSection() {
  return (
    <section id="pricing" className="bg-white w-full flex flex-col gap-12 md:gap-16 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24">
      <FadeCard>
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl">
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1.5px] uppercase">Fair &amp; Transparent Pricing</p>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">Simple Plans with No Commission</p>
        </div>
      </FadeCard>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full max-w-6xl">
        <FadeCard delay={0}>
          <div className="bg-[#f3f3f3] flex flex-col gap-8 p-8 rounded-2xl relative border border-[rgba(0,0,0,0.06)]">
            <div>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base sm:text-lg">Pay-Per-Hire</p>
              <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-xs sm:text-[14px] mt-1">Best if hiring once in a while</p>
            </div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <p className="font-['Montserrat:Black',sans-serif] font-black text-[#29235c] text-3xl sm:text-4xl whitespace-nowrap">₦15,000</p>
              <p className="font-['Raleway:SemiBold',sans-serif] font-semibold text-[#1f1f1f] text-[12px] sm:text-[13px] whitespace-nowrap">/ hire</p>
            </div>
            <div className="flex flex-col gap-4">
              {["1 Placed Staff", "Tier 1 ID Checked", "1 Free Replacement (30 days)", "48-72 hr delivery"].map(f => <FeatureItem key={f} text={f} />)}
            </div>
            <button className="w-full py-3 rounded-full border border-[rgba(0,0,0,0.1)] bg-white font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm sm:text-[15px] hover:border-[#29235c] transition-colors cursor-pointer">Choose Plan</button>
          </div>
        </FadeCard>
        <FadeCard delay={120}>
          <div className="bg-[#29235c] flex flex-col gap-8 p-8 md:p-10 rounded-2xl shadow-[0px_16px_16px_rgba(41,35,92,0.25)] md:-mt-4">
            <div className="flex flex-col gap-2">
              <span className="self-start bg-[#009fe3] text-white text-[10px] sm:text-[11px] font-['Raleway:ExtraBold',sans-serif] font-extrabold uppercase px-3 py-1 rounded-full">Most Popular</span>
              <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-lg sm:text-xl mt-1">Starter Plan</p>
              <p className="font-['Raleway:Regular',sans-serif] font-normal text-white/80 text-xs sm:text-[14px]">Best for small businesses (Up to 4 hires/mo)</p>
            </div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <p className="font-['Montserrat:Black',sans-serif] font-black text-white text-[32px] sm:text-[40px] whitespace-nowrap">₦40,000</p>
              <p className="font-['Raleway:SemiBold',sans-serif] font-semibold text-white/80 text-sm whitespace-nowrap">/ month</p>
            </div>
            <div className="flex flex-col gap-4">
              {["Up to 4 Hires", "Pre-screened Video Profiles", "Tier 1 ID Checked", "1 Replacement per Hire", "Priority Support"].map(f => <FeatureItem key={f} text={f} white />)}
            </div>
            <button className="w-full py-3 rounded-full bg-[#009fe3] font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] hover:bg-[#0090cc] transition-colors cursor-pointer">Choose Plan</button>
          </div>
        </FadeCard>
        <FadeCard delay={240}>
          <div className="bg-[#f3f3f3] flex flex-col gap-8 p-8 rounded-2xl relative border border-[rgba(0,0,0,0.06)]">
            <div>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base sm:text-lg">Growth Plan</p>
              <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-xs sm:text-[14px] mt-1">Best for growing companies (Up to 10 hires/mo)</p>
            </div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <p className="font-['Montserrat:Black',sans-serif] font-black text-[#29235c] text-[28px] sm:text-[36px] whitespace-nowrap">₦100,000</p>
              <p className="font-['Raleway:SemiBold',sans-serif] font-semibold text-[#1f1f1f] text-[12px] sm:text-[13px] whitespace-nowrap">/ month</p>
            </div>
            <div className="flex flex-col gap-4">
              {["Up to 10 Hires", "Tier 1 & 2 Checks (ID + Academic)", "Shortlisting Support", "2 Free Replacements", "Dedicated Account Manager"].map(f => <FeatureItem key={f} text={f} />)}
            </div>
            <button className="w-full py-3 rounded-full border border-[rgba(0,0,0,0.1)] bg-white font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm sm:text-[15px] hover:border-[#29235c] transition-colors cursor-pointer">Choose Plan</button>
          </div>
        </FadeCard>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────── */
function HowItWorksSection() {
  const employer = [
    { title: "Tell us the job you need filled", desc: "List your vacancy for free. Define hours, location, expected salary, and simple job requirements." },
    { title: "Watch 1-minute video profiles", desc: "Instead of wasting hours on interviews, watch curated video intros of candidates already vetted." },
    { title: "Pick your candidate & start working", desc: "Select the perfect staff member, complete onboarding with immediate support, and start stress-free." },
  ];
  const jobseeker = [
    { title: "Sign up for free", desc: "Create your free digital profile in minutes. Tell us your skills, availability, and ideal working location." },
    { title: "Show your ID & record video", desc: "Confirm your identities securely and record a quick, guided 1-minute intro to introduce yourself to employers." },
    { title: "Get hired & keep 100% pay", desc: "We never take cuts from your hard-earned salary. Receive fair monthly payments directly from vetted business owners." },
  ];

  function StepColumn({ title, steps, color }: { title: string; steps: typeof employer; color: string }) {
    return (
      <div className="flex flex-col gap-8 flex-1">
        <div className="border-b-2 pb-4" style={{ borderColor: color }}>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-lg sm:text-xl md:text-2xl">{title}</p>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="flex gap-5 items-start">
            <div className="flex items-center justify-center rounded-full w-12 h-12 shrink-0 text-white font-['Montserrat:Black',sans-serif] font-black text-xl" style={{ backgroundColor: color }}>
              {i + 1}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm sm:text-[17px] leading-snug">{s.title}</p>
              <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-xs sm:text-[15px] leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="how-it-works" className="bg-[#f3f3f3] w-full flex flex-col gap-12 md:gap-16 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24">
      <FadeCard>
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl">
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1.5px] uppercase">Simple 3-Step Process</p>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">How Hirely Works</p>
        </div>
      </FadeCard>
      <div className="flex flex-col md:flex-row gap-10 md:gap-12 w-full max-w-6xl">
        <FadeCard delay={0}><StepColumn title="For Employers" steps={employer} color="#29235c" /></FadeCard>
        <div className="hidden md:block w-px bg-[rgba(0,0,0,0.08)]" />
        <FadeCard delay={150}><StepColumn title="For Jobseekers" steps={jobseeker} color="#009fe3" /></FadeCard>
      </div>
    </section>
  );
}

/* ─── Verify ────────────────────────────────────────────────── */
function VerifySection() {
  const cards = [
    { title: "Tier 1: Instant ID Check", sub: "(NIN/BVN)", price: "₦1,500", desc: "Direct connection with government identity databases for rapid authentication. Verified in real-time." },
    { title: "Tier 2: Academic Check", sub: "(NYSC/Degree)", price: "₦4,500", desc: "Authenticity verification of local universities, NYSC discharge papers, and vocational certificates." },
    { title: "Tier 3: Address Check", sub: "(Geotagged Visit)", price: "₦8,500", desc: "Our field agents physically visit the location, confirming home addresses with geotagged digital proof." },
  ];

  return (
    <section id="hirely-verify" className="bg-[#29235c] w-full flex flex-col gap-10 md:gap-14 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24">
      <FadeCard>
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl">
          <span className="self-center bg-[#009fe3] text-white text-[11px] sm:text-[13px] font-['Raleway:ExtraBold',sans-serif] font-extrabold uppercase tracking-[1px] px-4 py-1.5 rounded-full">Hirely Verify</span>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">Instant &amp; Physical Background Checks</p>
          <p className="font-['Raleway:Regular',sans-serif] font-normal text-white/80 text-sm sm:text-base md:text-lg max-w-lg">Verify your current or incoming staff with our swift, compliant check solutions.</p>
        </div>
      </FadeCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {cards.map((c, i) => (
          <FadeCard key={i} delay={i * 120}>
            <div className="bg-white flex flex-col gap-5 p-8 rounded-2xl">
              <div>
                <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-base sm:text-lg">{c.title}</p>
                <p className="font-['Raleway:SemiBold',sans-serif] font-semibold text-[#009fe3] text-xs sm:text-[14px] mt-0.5">{c.sub}</p>
              </div>
              <p className="font-['Montserrat:Black',sans-serif] font-black text-[#29235c] text-2xl sm:text-3xl">{c.price}</p>
              <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-xs sm:text-[14px] leading-[22px]">{c.desc}</p>
            </div>
          </FadeCard>
        ))}
      </div>
      <FadeCard>
        <div className="flex gap-3 items-center bg-white/10 border border-[#009fe3] px-6 py-3 rounded-full">
          <svg fill="none" width="18" height="18" viewBox="0 0 18 18">
            <path d={svgPaths.p10c45e80} stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
          </svg>
          <p className="font-['Raleway:Bold',sans-serif] font-bold text-white text-[14px] md:text-[15px] text-center">100% NDPA 2023 Data Privacy Compliant</p>
        </div>
      </FadeCard>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────── */
function FaqSection() {
  const faqs = [
    { q: "What if the worker leaves?", a: "We supply a pre-screened replacement worker for free within your plan's guarantee period. Your business continuity is our priority, and there are absolutely no additional charges." },
    { q: "Do candidates pay a cut of their salary?", a: "No. Candidates keep 100% of their earnings. We charge flat fees to employers only, promoting honest pay and protecting our community of jobseekers from unfair deductions." },
    { q: "How fast can I get staff?", a: "You will receive checked video profiles in 24 to 72 hours. Once you make your selection, the candidate can resume immediately depending on your onboarding timeline." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white w-full flex flex-col gap-12 md:gap-16 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24">
      <FadeCard>
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl">
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[11px] sm:text-[13px] tracking-[1.5px] uppercase">Common Inquiries</p>
          <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">Got Questions? We Have Answers.</p>
        </div>
      </FadeCard>
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {faqs.map((f, i) => (
          <FadeCard key={i} delay={i * 80}>
            <div onClick={() => setOpen(open === i ? null : i)}
              className="bg-[#f3f3f3] border border-[rgba(0,0,0,0.06)] rounded-xl overflow-hidden cursor-pointer">
              <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm sm:text-base md:text-lg">{f.q}</p>
                <svg className={`shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} fill="none" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
              {open === i && (
                <p className="font-['Raleway:Regular',sans-serif] font-normal text-[#1f1f1f] text-xs sm:text-[15px] leading-6 px-5 md:px-6 pb-5 md:pb-6">{f.a}</p>
              )}
            </div>
          </FadeCard>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function FooterSection() {
  const footerCols = [
    { heading: "For Employers", links: ["Hire Staff", "Pricing Plans", "Background Checks", "Success Stories"] },
    { heading: "For Candidates", links: ["Find Work", "How it Works", "Guidelines", "Safety & Privacy"] },
    { heading: "Information & Help", links: ["Terms of Service", "Privacy Policy (NDPA)", "Contact Support", "3steps Infrastructure"] },
  ];

  return (
    <footer className="bg-[#29235c] w-full">
      <div className="bg-[#1e1656] flex flex-col gap-8 items-center px-5 md:px-10 lg:px-20 py-16 md:py-20 text-center">
        <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl sm:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] max-w-2xl">
          Ready to Hire or Get Hired?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup?role=EMPLOYER" className="bg-[#009fe3] px-6 py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] hover:bg-[#0090cc] transition-colors">
            I Want to Hire Staff
          </Link>
          <Link to="/signup?role=EMPLOYEE" className="border border-white px-6 py-3 rounded-full font-['Raleway:Bold',sans-serif] font-bold text-white text-sm sm:text-[15px] hover:bg-white/10 transition-colors">
            I Want to Apply for Jobs
          </Link>
        </div>
      </div>
      <div className="px-5 md:px-10 lg:px-20 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <div className="flex gap-2 items-center">
            <div className="bg-[#009fe3] flex items-center justify-center rounded-md w-8 h-8 shrink-0">
              <p className="font-['Raleway:Black',sans-serif] font-black text-white text-lg leading-none">H</p>
            </div>
            <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-xl">hirely</p>
          </div>
          <p className="font-['Raleway:Regular',sans-serif] font-normal text-white/70 text-xs sm:text-[14px] leading-[22px] max-w-xs">
            Connecting small businesses with vetted, reliable, and verified staff across Nigeria. Build your business with confidence.
          </p>
          <p className="font-['Raleway:Regular',sans-serif] font-normal text-white/50 text-[13px]">© 2026 Hirely. All rights reserved.</p>
        </div>
        {footerCols.map(col => (
          <div key={col.heading} className="flex flex-col gap-4">
            <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#009fe3] text-[13px] tracking-[1px] uppercase">{col.heading}</p>
            {col.links.map(link => (
              <a key={link} href="#" className="font-['Raleway:Regular',sans-serif] font-normal text-white/80 text-sm sm:text-[15px] hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="bg-white flex flex-col w-full min-h-screen">
      <Navbar />
      <HeroSection />
      <ActionCards />
      <WhyChooseSection />
      <PricingSection />
      <HowItWorksSection />
      <VerifySection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
