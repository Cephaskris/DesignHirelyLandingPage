import svgPaths from "./svg-c03ftl1f6l";
import imgHeroSection from "./c33fe0ab48bee1d4d7eead2aa8c36afa4aece2a0.png";
import imgHeroSection1 from "./3c0ea0dbb731abb6fda4b367ecf5796f75db7782.png";

function Group() {
  return (
    <div className="col-1 h-[40.967px] ml-0 mt-0 relative row-1 w-[61.399px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="40.9671" preserveAspectRatio="none" viewBox="0 0 61.3993 40.9671" width="61.3993">
        <g id="Group">
          <path d={svgPaths.p15c82e51} fill="#29235C" id="Vector" />
          <path d={svgPaths.p507c280} fill="#009FE3" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 h-[40.967px] ml-0 mt-0 relative row-1 w-[94.261px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="40.9672" preserveAspectRatio="none" viewBox="0 0 94.2609 40.9672" width="94.2609">
        <g id="Group">
          <path d={svgPaths.p1e62d00} fill="#29235C" id="Vector" />
          <path d={svgPaths.p23d73d40} fill="#009FE3" id="Vector_2" />
          <path d={svgPaths.p26847800} fill="#29235C" id="Vector_3" />
          <path d={svgPaths.p5163900} fill="#29235C" id="Vector_4" />
          <path d={svgPaths.p3f43a900} fill="#29235C" id="Vector_5" />
          <path d={svgPaths.p30d30b40} fill="#29235C" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 h-[6.429px] ml-[97.46px] mt-0 relative row-1 w-[10.496px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="6.42929" preserveAspectRatio="none" viewBox="0 0 10.4963 6.42929" width="10.4963">
        <g id="Group">
          <path d={svgPaths.p377ec200} fill="#29235C" id="Vector" />
          <path d={svgPaths.pdd55000} fill="#29235C" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[72.04px] mt-0 place-items-start relative row-1">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Layer() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Layer 2">
      <Group />
      <Group3 />
    </div>
  );
}

function NavLinks() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Raleway:SemiBold',sans-serif] font-semibold gap-[32px] items-center leading-[normal] relative shrink-0 text-[#29235c] text-[16px] whitespace-nowrap" data-name="Nav-Links">
      <p className="relative shrink-0">For Employers</p>
      <p className="relative shrink-0">Pricing</p>
      <p className="relative shrink-0">Hirely Verify</p>
      <p className="relative shrink-0">How It Works</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[15px] whitespace-nowrap">{`I'm a Candidate`}</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Hire Staff</p>
    </div>
  );
}

function NavActions() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Nav-Actions">
      <Button />
      <Button1 />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-white content-stretch flex h-[88px] items-center justify-between px-[80px] relative shrink-0 w-full" data-name="Navbar">
      <Layer />
      <NavLinks />
      <NavActions />
    </div>
  );
}

function HeroTexts() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-[#1e1656] text-center w-[900px]" data-name="Hero-Texts">
      <div className="font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[0] min-w-full relative shrink-0 text-[56px] w-[min-content]">
        <p className="leading-[64px] mb-0">Hire Great Staff Fast.</p>
        <p className="leading-[64px]">No Commissions. No Stress.</p>
      </div>
      <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[32px] opacity-90 relative shrink-0 text-[20px] w-[720px]">We connect small businesses with honest, pre-checked workers in 24 to 72 hours. No hidden fees. Free replacements.</p>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[588px] pt-[80px] px-[80px] relative shrink-0 w-full" data-name="Hero-Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[106.13%] left-0 max-w-none top-[-6.11%] w-full" src={imgHeroSection} />
      </div>
      <HeroTexts />
    </div>
  );
}

function CardHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-full" data-name="Card-Header">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] uppercase whitespace-nowrap">For Employers</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold min-w-full relative shrink-0 text-[#29235c] text-[28px] w-[min-content]">Need reliable staff for your business?</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Find Staff Today</p>
    </div>
  );
}

function EmployerCard() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_8px_12px_rgba(0,0,0,0.1)] flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Employer-Card">
      <CardHeader />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[26px] relative shrink-0 text-[#1f1f1f] text-[16px] w-full">Get immediate access to verified, pre-screened video profiles of candidates ready to work. Only hire the best.</p>
      <Button2 />
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-full" data-name="Card-Header">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] uppercase whitespace-nowrap">For Jobseekers</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold min-w-full relative shrink-0 text-[28px] text-white w-[min-content]">Looking for a good job?</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Get Hired Now</p>
    </div>
  );
}

function JobseekerCard() {
  return (
    <div className="bg-[#29235c] content-stretch drop-shadow-[0px_8px_12px_rgba(0,0,0,0.1)] flex flex-[1_0_82px] flex-col gap-[24px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Jobseeker-Card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <CardHeader1 />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[26px] opacity-90 relative shrink-0 text-[16px] text-white w-full">We never take money from your salary. Access fair-paying vacancies from vetted, high-quality employers.</p>
      <Button3 />
    </div>
  );
}

function ActionCards() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Action-Cards">
      <EmployerCard />
      <JobseekerCard />
    </div>
  );
}

function HeroSection1() {
  return (
    <div className="content-stretch flex flex-col items-center p-[80px] relative shrink-0 w-full" data-name="Hero-Section">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeroSection1} />
        <div className="absolute bg-[rgba(41,35,92,0.95)] inset-0" />
      </div>
      <ActionCards />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:ExtraBold',sans-serif] font-extrabold gap-[16px] items-center leading-[normal] relative shrink-0 w-[800px]" data-name="Section-Header">
      <p className="relative shrink-0 text-[#009fe3] text-[14px] tracking-[1.5px] uppercase whitespace-nowrap">The Hirely Difference</p>
      <p className="min-w-full relative shrink-0 text-[#29235c] text-[40px] text-center w-[min-content]">Recruitment Built on Absolute Trust</p>
    </div>
  );
}

function Video() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="video">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="video">
          <path d={svgPaths.p663c780} id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[28px]" data-name="Icon">
      <Video />
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[rgba(41,35,92,0.07)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="Icon-Container">
      <Icon />
    </div>
  );
}

function Texts() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Texts">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] w-full">1. REAL PEOPLE</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[22px] w-full">Watch 1-Minute Video Intros</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">{`Don't just read dry CVs. Watch short 1-minute video intros from pre-screened candidates before you invite them to interview.`}</p>
    </div>
  );
}

function BenefitCard() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_82px] flex-col gap-[24px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Benefit-Card">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <IconContainer />
      <Texts />
    </div>
  );
}

function ShieldCheck() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="shield-check">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="shield-check">
          <path d={svgPaths.p3037780} id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[28px]" data-name="Icon">
      <ShieldCheck />
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[rgba(41,35,92,0.07)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="Icon-Container">
      <Icon1 />
    </div>
  );
}

function Texts1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Texts">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] w-full">2. PRE-CHECKED</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[22px] w-full">Thorough Verification</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">Rest easy knowing we check governmental ID cards (NIN/BVN), verified school certificates, and perform physical address visits.</p>
    </div>
  );
}

function BenefitCard1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_82px] flex-col gap-[24px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Benefit-Card">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <IconContainer1 />
      <Texts1 />
    </div>
  );
}

function RefreshCw() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="refresh-cw">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="refresh-cw">
          <path d={svgPaths.p20975800} id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[28px]" data-name="Icon">
      <RefreshCw />
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="bg-[rgba(41,35,92,0.07)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="Icon-Container">
      <Icon2 />
    </div>
  );
}

function Texts2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Texts">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] w-full">3. ZERO RISK</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[22px] w-full">100% Free Replacements</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">{`If any staff member leaves or underperforms within your plan's guarantee period, we supply a pre-screened replacement for FREE.`}</p>
    </div>
  );
}

function BenefitCard2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_82px] flex-col gap-[24px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Benefit-Card">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <IconContainer2 />
      <Texts2 />
    </div>
  );
}

function BenefitCards() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Benefit-Cards">
      <BenefitCard />
      <BenefitCard1 />
      <BenefitCard2 />
    </div>
  );
}

function WhyChooseSection() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col gap-[64px] items-center px-[80px] py-[100px] relative shrink-0 w-full" data-name="Why-Choose-Section">
      <SectionHeader />
      <BenefitCards />
    </div>
  );
}

function SectionHeader1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:ExtraBold',sans-serif] font-extrabold gap-[16px] items-center leading-[normal] relative shrink-0 w-[800px]" data-name="Section-Header">
      <p className="relative shrink-0 text-[#009fe3] text-[14px] tracking-[1.5px] uppercase whitespace-nowrap">{`Fair & Transparent Pricing`}</p>
      <p className="min-w-full relative shrink-0 text-[#29235c] text-[40px] text-center w-[min-content]">Simple Plans with No Commission</p>
    </div>
  );
}

function TierHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-full" data-name="Tier-Header">
      <p className="font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[#29235c] text-[18px] w-full">Pay-Per-Hire</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal relative shrink-0 text-[#1f1f1f] text-[14px] w-full">Best if hiring once in a while</p>
    </div>
  );
}

function PriceSection() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Section">
      <p className="font-['Montserrat:Black',sans-serif] font-black relative shrink-0 text-[#29235c] text-[36px]">₦15,000</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#1f1f1f] text-[14px]">/ hire</p>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon3 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">1 Placed Staff</p>
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon4 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">Tier 1 ID Checked</p>
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon5 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">1 Free Replacement (30 days)</p>
    </div>
  );
}

function CheckCircle3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle3 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon6 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">48-72 hr delivery</p>
    </div>
  );
}

function Features() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Features">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[15px] whitespace-nowrap">Choose Plan</p>
    </div>
  );
}

function Tier() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-[1_0_66px] flex-col gap-[32px] items-start min-w-px p-[32px] relative rounded-[16px]" data-name="Tier-1">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <TierHeader />
      <PriceSection />
      <Features />
      <Button4 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-start px-[12px] py-[4px] relative rounded-[50px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[11px] text-white uppercase whitespace-nowrap">Most Popular</p>
    </div>
  );
}

function TierHeader1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Tier-Header">
      <Frame4 />
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] min-w-full relative shrink-0 text-[22px] text-white w-[min-content]">Starter Plan</p>
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[normal] min-w-full opacity-80 relative shrink-0 text-[14px] text-white w-[min-content]">Best for small businesses (Up to 4 hires/mo)</p>
    </div>
  );
}

function PriceSection1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] items-baseline leading-[normal] relative shrink-0 text-white whitespace-nowrap" data-name="Price-Section">
      <p className="font-['Montserrat:Black',sans-serif] font-black relative shrink-0 text-[44px]">₦40,000</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold opacity-80 relative shrink-0 text-[16px]">/ month</p>
    </div>
  );
}

function CheckCircle4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon7 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] min-w-px relative text-[14px] text-white">Up to 4 Hires</p>
    </div>
  );
}

function CheckCircle5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon8 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] min-w-px relative text-[14px] text-white">Pre-screened Video Profiles</p>
    </div>
  );
}

function CheckCircle6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon9 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] min-w-px relative text-[14px] text-white">Tier 1 ID Checked</p>
    </div>
  );
}

function CheckCircle7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon10 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] min-w-px relative text-[14px] text-white">1 Replacement per Hire</p>
    </div>
  );
}

function CheckCircle8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon11 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] min-w-px relative text-[14px] text-white">Priority Support</p>
    </div>
  );
}

function Features1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Features">
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Choose Plan</p>
    </div>
  );
}

function Tier1() {
  return (
    <div className="bg-[#29235c] content-stretch drop-shadow-[0px_16px_16px_rgba(41,35,92,0.25)] flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px p-[40px] relative rounded-[16px]" data-name="Tier-2">
      <TierHeader1 />
      <PriceSection1 />
      <Features1 />
      <Button5 />
    </div>
  );
}

function TierHeader2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-full" data-name="Tier-Header">
      <p className="font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[#29235c] text-[18px] w-full">Growth Plan</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal relative shrink-0 text-[#1f1f1f] text-[14px] w-full">Best for growing companies (Up to 10 hires/mo)</p>
    </div>
  );
}

function PriceSection2() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[4px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Section">
      <p className="font-['Montserrat:Black',sans-serif] font-black relative shrink-0 text-[#29235c] text-[36px]">₦100,000</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#1f1f1f] text-[14px]">/ month</p>
    </div>
  );
}

function CheckCircle9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon12 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">Up to 10 Hires</p>
    </div>
  );
}

function CheckCircle10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon13 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">{`Tier 1 & 2 Checks (ID + Academic)`}</p>
    </div>
  );
}

function CheckCircle11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon14 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">Shortlisting Support</p>
    </div>
  );
}

function CheckCircle12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon15 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">2 Free Replacements</p>
    </div>
  );
}

function CheckCircle13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_8)" id="check-circle">
          <path d={svgPaths.p39f7ce80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_8">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <CheckCircle13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
      <Icon16 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[normal] min-w-px relative text-[#29235c] text-[14px]">Dedicated Account Manager</p>
    </div>
  );
}

function Features2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Features">
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[15px] whitespace-nowrap">Choose Plan</p>
    </div>
  );
}

function Tier2() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-[1_0_66px] flex-col gap-[32px] items-start min-w-px p-[32px] relative rounded-[16px]" data-name="Tier-3">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <TierHeader2 />
      <PriceSection2 />
      <Features2 />
      <Button6 />
    </div>
  );
}

function PricingGrid() {
  return (
    <div className="content-stretch flex gap-[24px] items-baseline relative shrink-0 w-full" data-name="Pricing-Grid">
      <Tier />
      <Tier1 />
      <Tier2 />
    </div>
  );
}

function PricingSection() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[64px] items-center px-[80px] py-[100px] relative shrink-0 w-full" data-name="Pricing-Section">
      <SectionHeader1 />
      <PricingGrid />
    </div>
  );
}

function SectionHeader2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:ExtraBold',sans-serif] font-extrabold gap-[16px] items-center leading-[normal] relative shrink-0 w-[800px]" data-name="Section-Header">
      <p className="relative shrink-0 text-[#009fe3] text-[14px] tracking-[1.5px] uppercase whitespace-nowrap">Simple 3-Step Process</p>
      <p className="min-w-full relative shrink-0 text-[#29235c] text-[40px] text-center w-[min-content]">How Hirely Works</p>
    </div>
  );
}

function ColTitleWrapper() {
  return (
    <div className="content-stretch flex items-start pb-[16px] relative shrink-0 w-full" data-name="Col-Title-Wrapper">
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#29235c] text-[24px] whitespace-nowrap">For Employers</p>
    </div>
  );
}

function StepNum() {
  return (
    <div className="bg-[#29235c] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">1</p>
    </div>
  );
}

function StepTexts() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">Tell us the job you need filled</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">List your vacancy for free. Define hours, location, expected salary, and simple job requirements.</p>
    </div>
  );
}

function StepRow() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum />
      <StepTexts />
    </div>
  );
}

function StepNum1() {
  return (
    <div className="bg-[#29235c] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">2</p>
    </div>
  );
}

function StepTexts1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">Watch 1-minute video profiles</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">Instead of wasting hours on interviews, watch curated video intros of candidates already vetted.</p>
    </div>
  );
}

function StepRow1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum1 />
      <StepTexts1 />
    </div>
  );
}

function StepNum2() {
  return (
    <div className="bg-[#29235c] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">3</p>
    </div>
  );
}

function StepTexts2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">{`Pick your candidate & start working`}</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">Select the perfect staff member, complete onboarding with immediate support, and start stress-free.</p>
    </div>
  );
}

function StepRow2() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum2 />
      <StepTexts2 />
    </div>
  );
}

function ColumnEmployers() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Column-Employers">
      <ColTitleWrapper />
      <StepRow />
      <StepRow1 />
      <StepRow2 />
    </div>
  );
}

function ColTitleWrapper1() {
  return (
    <div className="content-stretch flex items-start pb-[16px] relative shrink-0 w-full" data-name="Col-Title-Wrapper">
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#29235c] text-[24px] whitespace-nowrap">For Jobseekers</p>
    </div>
  );
}

function StepNum3() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">1</p>
    </div>
  );
}

function StepTexts3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">Sign up for free</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">Create your free digital profile in minutes. Tell us your skills, availability, and ideal working location.</p>
    </div>
  );
}

function StepRow3() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum3 />
      <StepTexts3 />
    </div>
  );
}

function StepNum4() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">2</p>
    </div>
  );
}

function StepTexts4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">{`Show your ID & record video`}</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">Confirm your identities securely and record a quick, guided 1-minute intro to introduce yourself to employers.</p>
    </div>
  );
}

function StepRow4() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum4 />
      <StepTexts4 />
    </div>
  );
}

function StepNum5() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Step-Num">
      <p className="[word-break:break-word] font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">3</p>
    </div>
  );
}

function StepTexts5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Step-Texts">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#29235c] text-[18px] w-full">{`Get hired & keep 100% pay`}</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">We never take cuts from your hard-earned salary. Receive fair monthly payments directly from vetted business owners.</p>
    </div>
  );
}

function StepRow5() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Step-Row">
      <StepNum5 />
      <StepTexts5 />
    </div>
  );
}

function ColumnJobseekers() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Column-Jobseekers">
      <ColTitleWrapper1 />
      <StepRow3 />
      <StepRow4 />
      <StepRow5 />
    </div>
  );
}

function DualColumns() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Dual-Columns">
      <ColumnEmployers />
      <ColumnJobseekers />
    </div>
  );
}

function HowItWorksSection() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col gap-[64px] items-center px-[80px] py-[100px] relative shrink-0 w-full" data-name="How-It-Works-Section">
      <SectionHeader2 />
      <DualColumns />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-start px-[16px] py-[6px] relative rounded-[50px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[13px] text-white tracking-[1px] uppercase whitespace-nowrap">Hirely Verify</p>
    </div>
  );
}

function SectionHeader3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[800px]" data-name="Section-Header">
      <Frame15 />
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] min-w-full relative shrink-0 text-[40px] text-center text-white w-[min-content]">{`Instant & Physical Background Checks`}</p>
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[normal] opacity-80 relative shrink-0 text-[18px] text-center text-white w-[600px]">Verify your current or incoming staff with our swift, compliant check solutions.</p>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Card-Header">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#29235c] text-[18px] w-full">Tier 1: Instant ID Check</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#009fe3] text-[14px] w-full">(NIN/BVN)</p>
    </div>
  );
}

function VerifyCard() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px p-[32px] relative rounded-[16px]" data-name="Verify-Card">
      <CardHeader2 />
      <p className="font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#29235c] text-[32px] w-full">₦1,500</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[14px] w-full">Direct connection with government identity databases for rapid authentication. Verified in real-time.</p>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Card-Header">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#29235c] text-[18px] w-full">Tier 2: Academic Check</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#009fe3] text-[14px] w-full">(NYSC/Degree)</p>
    </div>
  );
}

function VerifyCard1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px p-[32px] relative rounded-[16px]" data-name="Verify-Card">
      <CardHeader3 />
      <p className="font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#29235c] text-[32px] w-full">₦4,500</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[14px] w-full">Authenticity verification of local universities, NYSC discharge papers, and vocational certificates.</p>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Card-Header">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#29235c] text-[18px] w-full">Tier 3: Address Check</p>
      <p className="font-['Raleway:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#009fe3] text-[14px] w-full">(Geotagged Visit)</p>
    </div>
  );
}

function VerifyCard2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px p-[32px] relative rounded-[16px]" data-name="Verify-Card">
      <CardHeader4 />
      <p className="font-['Montserrat:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#29235c] text-[32px] w-full">₦8,500</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#1f1f1f] text-[14px] w-full">Our field agents physically visit the location, confirming home addresses with geotagged digital proof.</p>
    </div>
  );
}

function VerifyCards() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Verify-Cards">
      <VerifyCard />
      <VerifyCard1 />
      <VerifyCard2 />
    </div>
  );
}

function Database() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="database">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="database">
          <path d={svgPaths.p10c45e80} id="Vector" stroke="#009FE3" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon17() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[18px]" data-name="Icon">
      <Database />
    </div>
  );
}

function PrivacyBadge() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative rounded-[50px] shrink-0" data-name="Privacy-Badge">
      <div aria-hidden className="absolute border border-[#009fe3] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <Icon17 />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">100% NDPA 2023 Data Privacy Compliant</p>
    </div>
  );
}

function VerifySection() {
  return (
    <div className="bg-[#29235c] content-stretch flex flex-col gap-[56px] items-center px-[80px] py-[100px] relative shrink-0 w-full" data-name="Verify-Section">
      <SectionHeader3 />
      <VerifyCards />
      <PrivacyBadge />
    </div>
  );
}

function SectionHeader4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:ExtraBold',sans-serif] font-extrabold gap-[16px] items-center leading-[normal] relative shrink-0 w-[800px]" data-name="Section-Header">
      <p className="relative shrink-0 text-[#009fe3] text-[14px] tracking-[1.5px] uppercase whitespace-nowrap">Common Inquiries</p>
      <p className="min-w-full relative shrink-0 text-[#29235c] text-[40px] text-center w-[min-content]">Got Questions? We Have Answers.</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon18() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
      <ChevronDown />
    </div>
  );
}

function QuestionRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Question-Row">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] min-w-px relative text-[#29235c] text-[18px]">What if the worker leaves?</p>
      <Icon18 />
    </div>
  );
}

function FaqItem() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-name="FAQ-Item">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <QuestionRow />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">{`We supply a pre-screened replacement worker for free within your plan's guarantee period. Your business continuity is our priority, and there are absolutely no additional charges.`}</p>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon19() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
      <ChevronDown1 />
    </div>
  );
}

function QuestionRow1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Question-Row">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] min-w-px relative text-[#29235c] text-[18px]">Do candidates pay a cut of their salary?</p>
      <Icon19 />
    </div>
  );
}

function FaqItem1() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-name="FAQ-Item">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <QuestionRow1 />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">No. Candidates keep 100% of their earnings. We charge flat fees to employers only, promoting honest pay and protecting our community of jobseekers from unfair deductions.</p>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#29235C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
      <ChevronDown2 />
    </div>
  );
}

function QuestionRow2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Question-Row">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] min-w-px relative text-[#29235c] text-[18px]">How fast can I get staff?</p>
      <Icon20 />
    </div>
  );
}

function FaqItem2() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px] shrink-0 w-full" data-name="FAQ-Item">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <QuestionRow2 />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#1f1f1f] text-[15px] w-full">You will receive checked video profiles in 24 to 72 hours. Once you make your selection, the candidate can resume immediately depending on your onboarding timeline.</p>
    </div>
  );
}

function FaQs() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[900px]" data-name="FAQs">
      <FaqItem />
      <FaqItem1 />
      <FaqItem2 />
    </div>
  );
}

function FaqSection() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[64px] items-center px-[80px] py-[100px] relative shrink-0 w-full" data-name="FAQ-Section">
      <SectionHeader4 />
      <FaQs />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">I Want to Hire Staff</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[50px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
      <p className="[word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">I Want to Apply for Jobs</p>
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0" data-name="CTA-Buttons">
      <Button7 />
      <Button8 />
    </div>
  );
}

function CtaBanner() {
  return (
    <div className="bg-[#1e1656] content-stretch flex flex-col gap-[32px] items-center p-[80px] relative shrink-0 w-full" data-name="CTA-Banner">
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] min-w-full relative shrink-0 text-[40px] text-center text-white w-[min-content]">Ready to Hire or Get Hired?</p>
      <CtaButtons />
    </div>
  );
}

function LogoGraphic() {
  return (
    <div className="bg-[#009fe3] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Logo-Graphic">
      <p className="[word-break:break-word] font-['Raleway:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">H</p>
    </div>
  );
}

function LogoGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Logo-Group">
      <LogoGraphic />
      <p className="[word-break:break-word] font-['Raleway:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">hirely</p>
    </div>
  );
}

function BrandInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[320px]" data-name="Brand-Info">
      <LogoGroup />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[22px] min-w-full opacity-70 relative shrink-0 text-[14px] text-white w-[min-content]">Connecting small businesses with vetted, reliable, and verified staff across Nigeria. Build your business with confidence.</p>
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[normal] opacity-50 relative shrink-0 text-[13px] text-white whitespace-nowrap">© 2026 Hirely. All rights reserved.</p>
    </div>
  );
}

function LinksEmployer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Links-Employer">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] uppercase">For Employers</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Hire Staff</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Pricing Plans</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Background Checks</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Success Stories</p>
    </div>
  );
}

function LinksCandidates() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Links-Candidates">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] uppercase">For Candidates</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Find Work</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">How it Works</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Guidelines</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">{`Safety & Privacy`}</p>
    </div>
  );
}

function LinksLegal() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Links-Legal">
      <p className="font-['Raleway:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#009fe3] text-[14px] tracking-[1px] uppercase">{`Information & Help`}</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Terms of Service</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Privacy Policy (NDPA)</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">Contact Support</p>
      <p className="font-['Raleway:Regular',sans-serif] font-normal opacity-80 relative shrink-0 text-[15px] text-white">3steps Infrastructure</p>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="content-stretch flex items-start justify-between px-[80px] py-[64px] relative shrink-0 w-full" data-name="Footer-Bottom">
      <BrandInfo />
      <LinksEmployer />
      <LinksCandidates />
      <LinksLegal />
    </div>
  );
}

function FooterSection() {
  return (
    <div className="bg-[#29235c] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer-Section">
      <CtaBanner />
      <FooterBottom />
    </div>
  );
}

export default function HirelyLandingPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="hirely-landing-page">
      <Navbar />
      <HeroSection />
      <HeroSection1 />
      <WhyChooseSection />
      <PricingSection />
      <HowItWorksSection />
      <VerifySection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}