# **Hirely & Hirely Verify: Master Business & Software Engineering Blueprint**

**Document Version:** 3.0 (Production Launch Master Specification)

**Target Audience:** AI Builders (Cursor, Bolt.new, v0, Lovable), Full-Stack Engineers, Product Managers, and Executive Stakeholders

**Jurisdiction:** Federal Republic of Nigeria

**Governing Regulations:** Nigeria Data Protection Act (NDPA 2023), CAMA 2020, Evidence Act 2011 (Section 84)

---

## **1. Executive Summary & Business Vision**

**Hirely** is an end-to-end workforce technology ecosystem that merges three high-profit business lines into a unified platform tailored for the Nigerian market:

1. **Hirely Launch ("3 Steps to My Website"):** A top-of-funnel business setup engine that handles CAC business registration, domain/email provisioning, and instant web presence for SMEs.
2. **Hirely Talent (Video-First Recruitment & Staffing):** An asynchronous, video-based hiring platform using a dual-sided credit model (*Connection Credits*) to connect job seekers with employers.
3. **Hirely Verify (Background Verification & Compliance):** An automated and field-level verification suite running real-time identity, academic, work history, address mapping, and guarantor checks under NDPA 2023 standards.

---

## **2. Monetization & Pricing Architecture**

The platform operates on a **Hybrid Monetization Framework** combining unit-based credits, recurring monthly markups, and setup fees.

### **2.1 Connection Credit Engine (Staffing & Discovery)**

```
+---------------------------------------------------------------------------------+
|                         HIRELY MONETIZATION SUMMARY                             |
+---------------------------------------------------------------------------------+
| CANDIDATE VISIBILITY PASSES (Paid in NGN to record video & be discoverable)     |
|   - 3-Day Express Pass       --> ₦2,500                                         |
|   - 7-Day Active Pass        --> ₦5,000                                         |
|   - 30-Day Pro Pass          --> ₦15,000                                        |
|                                                                                 |
| EMPLOYER CONNECTION CREDITS (Top-up wallet for search, outreach & offers)       |
|   - Starter Credit Bundle    --> ₦25,000  (Unlocks video profiles & 3 offers)   |
|   - Growth Credit Bundle     --> ₦75,000  (Unlocks 10 offers + matching)      |
|   - Enterprise Credit Bundle --> ₦250,000 (Bulk hiring + concierge matching)    |
|                                                                                 |
| PERMANENT RECRUITMENT FEES (One-Time Success Fee)                               |
|   - Mid-Level Roles          --> 10% - 12.5% of Annual Gross Salary             |
|   - Executive Roles          --> 15% - 20% of Annual Gross Salary               |
|                                                                                 |
| MANAGED CONTRACT STAFFING (Monthly Recurring Margin)                            |
|   - White-Collar / Tech      --> 15% - 20% Monthly markup over candidate salary  |
|   - Blue-Collar / Gig        --> 20% - 25% Monthly markup over candidate salary  |
|                                                                                 |
| BLUE-COLLAR FLAT PLACEMENT                                                      |
|   - Drivers, Logistics, Help --> Flat Fee: ₦25,000 - ₦40,000 / placement        |
+---------------------------------------------------------------------------------+

```

### **2.2 Hirely Verify Rate Card (Screening Unit Costs)**

| Verification Check Tier | Scope of Included Checks | Turnaround SLA | Retail Price (NGN) | Enterprise Price (NGN) |
| --- | --- | --- | --- | --- |
| **Tier 1: Identity & Civil** | NIN Validation, BVN Name Match, Driver's License, Passport | Instant – 24 Hrs | ₦500 – ₦1,500 | ₦300 – ₦750 |
| **Tier 2: Academic & Statutory** | Tertiary Institution Audit, NYSC Certificate, CAC Search | 3 – 5 Days | ₦15,000 – ₦25,000 | ₦10,000 – ₦18,000 |
| **Tier 3: Field & Comprehensive** | Address Visit (Geotagged GPS), Work History, Guarantors | 5 – 7 Days | ₦25,000 – ₦45,000 | ₦18,000 – ₦30,000 |

### **2.3 Digital Business Setup ("3 Steps to My Website")**

* **Basic Package:** CAC Business Registration + Domain/Email + Landing Page = **₦65,000 – ₦85,000**.
* **Full Suite Package:** CAC + Complete Custom Website + Payment Gateway Integration = **₦150,000 – ₦250,000**.
* **Cross-Sell Hook:** Every website launch automatically credits the employer's wallet with **₦10,000 in free Hirely Verify credits**.

---

## **3. Three-Role Application Workflows**

```
                      ┌─────────────────────────┐
                      │    HIRELY LANDING PAGE  │
                      └────────────┬────────────┘
                                   │
                           [ "Get Started" ]
                                   │
                   ┌───────────────┴───────────────┐
                   ▼                               ▼
       ┌──────────────────────┐        ┌──────────────────────┐
       │   EMPLOYEE ONBOARD   │        │   EMPLOYER ONBOARD   │
       └───────────┬──────────┘        └───────────┬──────────┘
                   │                               │
        [ Connection Credits ]          [ Connection Credits ]
                   │                               │
                   ▼                               ▼
       ┌──────────────────────┐        ┌──────────────────────┐
       │ Video Intake & Offers│        │ Candidate Discovery, │
       │                      │        │ Screening & Verification
       └───────────┬──────────┘        └───────────┬──────────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   ▼
                      ┌─────────────────────────┐
                      │    SUPER ADMIN PORTAL   │
                      │  (Monetization, Audit,  │
                      │   Matching & Workflows) │
                      └────────────┬────────────┘
                                   │
                                   ▼
                      ┌─────────────────────────┐
                      │ SYSTEM ENGINE & APIS    │
                      │ (NIMC, NIBSS, Paystack, │
                      │ Storage, PDF Generator) │
                      └─────────────────────────┘

```

### **3.1 Role 1: Employee (Candidate) Flow**

1. **Registration:** Sign up via email/password, full name, and phone number. Select interested job roles from the dynamic admin-configured list.
2. **Connection Credit Gate:** Pay a NGN subscription (3, 7, or 30-day pass) via Paystack to unlock the video studio and appear in employer search results.
3. **Guided In-App Video Interview:**
* Review dressing and lighting guidelines on screen.
* Camera and microphone initialize automatically.
* Questions set by the Super Admin appear sequentially.
* Candidate clicks **Record**, answers the question, and clicks **Done** to automatically upload the response and load the next question.


4. **Candidate Dashboard:** View active pass countdown timer, profile views, and incoming job offers.
5. **Offers & Scheduling:** Review job offers (including salary, role details, and office location). Click **Accept Offer** to confirm a virtual or physical interview.

### **3.2 Role 2: Employer Flow**

1. **Registration & Credit Wallet:** Register company details and fund the workspace wallet with Connection Credits.
2. **Candidate Search & Video Screening:** Filter candidates by role, location, and experience. Watch candidates' pre-recorded interview video responses.
3. **Direct Offer Dispatch:** Spend credits to issue a formal offer containing role description, offered salary, physical location/remote terms, and interview schedule.
4. **Hirely Verify Hub:** Upload candidate documents (PDFs, NIN, BVN, Certificates) to request Tier 1, Tier 2, or Tier 3 background checks.
5. **Digital Launch Hub ("3 Steps to My Website"):** Select a web template, submit CAC registration details, and deploy a company website (unlocking bonus verification credits).

### **3.3 Role 3: Super Admin Portal**

1. **Role & Prompt Manager:** Add/edit job roles and configure sequential video interview questions per role.
2. **Monetization Engine:** Dynamically adjust credit prices for candidates and employers, as well as pass expiration durations.
3. **Assisted Matching Concierge:** Receive custom candidate requests from employers, curate candidate video portfolios, and push recommendations directly to employer dashboards.
4. **Compliance & Audit Desk:** Audit background verification reports, manage manual escalations, and review NDPA consent logs.

---

## **4. Mandatory Compliance & Legal Red Lines**

The AI Builder must strictly enforce the following statutory boundaries across all schemas, APIs, and UI outputs:

1. **Statutory Non-Advisory Legal Disclaimer:** Every background report PDF or screen output MUST include this text:
> *"STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client."*


2. **Absolute Zero Health/Medical Screening Exclusion:**
* **HARD-CODED RULE:** Health status, medical records, or HIV/AIDS status fields are strictly forbidden across all database tables, API payloads, and UI forms.


3. **NDPA 2023 Explicit Consent Engine:**
* No verification API call or candidate data capture may execute without a logged, timestamped digital consent check (*"I agree to background verification under NDPA 2023"*).


4. **BVN Data Isolation:**
* BVN inputs are restricted solely to automated API name-matching and date-of-birth validation. Passwords, PINs, OTPs, or financial transaction histories must never be requested or stored.


5. **Evidence Act Audit Logging (Section 84):**
* Maintain tamper-evident audit logs capturing `operator_id`, `candidate_id`, `action_type`, `ip_address`, and `timestamp` for every verification update or document access.



---

## **5. Complete System Architecture & Tech Stack**

### **5.1 Recommended Production Tech Stack**

* **Frontend Framework:** Next.js (App Router), React, Tailwind CSS, Shadcn/UI components, Framer Motion.
* **Backend & Database:** Node.js / Next.js Server Actions, PostgreSQL via Supabase (Row Level Security enforced).
* **Media & Video Processing:** MediaRecorder API (Browser), AWS S3 / Supabase Storage (Private Buckets), AWS Elastic Transcoder or FFmpeg (HLS/MP4 optimization).
* **Payment Processing:** Paystack Inline SDK (NGN card payments, bank transfers, auto-reconciliation).
* **Identity & Verification APIs:** QoreID (VerifyMe), Dojah, or Prembly (Smile ID) for NIMC/NIBSS checks.
* **Notifications:** Resend API (Transactional Email), Termii or Twilio WhatsApp Business API (Link dispatches).
* **PDF Report Generator:** `@react-pdf/renderer` or `puppeteer-core`.

---

### **5.2 Complete Database Schema (PostgreSQL / Supabase)**

```sql
-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & ROLES
CREATE TYPE user_role AS ENUM ('EMPLOYEE', 'EMPLOYER', 'SUPER_ADMIN');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EMPLOYEE PROFILES & VISIBILITY
CREATE TABLE employee_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_roles TEXT[] NOT NULL,
    visibility_status TEXT DEFAULT 'INACTIVE_VISIBILITY', -- 'ACTIVE', 'INACTIVE_VISIBILITY'
    pass_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INTERVIEW QUESTIONS & VIDEO RESPONSES
CREATE TABLE job_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_title TEXT UNIQUE NOT NULL,
    questions JSONB NOT NULL, -- Array of questions: ["Tell us about yourself", "..."]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE candidate_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employee_profiles(id) ON DELETE CASCADE,
    role_id UUID REFERENCES job_roles(id),
    video_urls JSONB NOT NULL, -- {"q1": "s3_url_1", "q2": "s3_url_2"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EMPLOYER WORKSPACES & WALLET
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    rc_number TEXT,
    credit_balance INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. OFFERS & MATCHING
CREATE TABLE job_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES employer_profiles(id),
    employee_id UUID REFERENCES employee_profiles(id),
    job_title TEXT NOT NULL,
    job_description TEXT NOT NULL,
    salary_offered NUMERIC(12,2) NOT NULL,
    work_location TEXT NOT NULL,
    meeting_type TEXT NOT NULL, -- 'VIRTUAL', 'PHYSICAL'
    status TEXT DEFAULT 'PENDING', -- 'PENDING', 'ACCEPTED', 'DECLINED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. HIRELY VERIFY CASES
CREATE TABLE verification_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES employer_profiles(id),
    candidate_name TEXT NOT NULL,
    tier TEXT NOT NULL, -- 'TIER_1', 'TIER_2', 'TIER_3'
    status TEXT DEFAULT 'PENDING_CONSENT', -- 'PENDING_CONSENT', 'IN_PROGRESS', 'VERIFIED', 'FLAGGED'
    ndpa_consent BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMP WITH TIME ZONE,
    documents_uploaded JSONB DEFAULT '{}'::jsonb,
    report_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TAMPER-EVIDENT AUDIT LOGS (Section 84 Evidence Act)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES verification_cases(id),
    operator_id UUID REFERENCES users(id),
    action_performed TEXT NOT NULL,
    ip_address TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

```

---

## **6. Direct Master Prompt for AI Builder**

Copy and paste this exact prompt block into **Cursor**, **Bolt.new**, **v0.dev**, or **Lovable**:

```text
Act as a Principal Full-Stack Engineer and Software Architect. Build the production-ready web application for "Hirely & Hirely Verify"—an automated workforce, video-first recruitment, and background verification ecosystem for Nigeria.

1. ROLE-BASED ARCHITECTURE (3 Portals):
- EMPLOYEE PORTAL:
  * Sign-up with Role Selection (populated dynamically from DB).
  * Connection Credit Paywall (Paystack integration for 3-Day, 7-Day, 30-Day visibility passes).
  * Guided In-App Asynchronous Video Interview Studio: Camera/Mic preview, sequential video prompts, "Record" -> "Done" workflow using MediaRecorder API, auto-upload to private storage.
  * Offers Hub: Review incoming offers with salary, scope, and physical address details; accept/decline buttons.

- EMPLOYER PORTAL:
  * Workspace Wallet: Credit top-up via Paystack.
  * Candidate Video Search: Filter candidates by role, view video response clips, and send direct job offers.
  * Hirely Verify Desk: Submit document files for Tier 1 (Identity), Tier 2 (Academic/NYSC), or Tier 3 (Geotagged Address) screening. Download PDF reports.
  * Digital Business Launch ("3 Steps to My Website"): Select web templates, input CAC details, and trigger a ₦10,000 bonus credit top-up.

- SUPER ADMIN PORTAL:
  * Manage job roles and sequential interview questions.
  * Set NGN credit pricing and pass expiration durations.
  * Managed Matching: Curate candidate video packages and push recommendations to employer dashboards.
  * Audit Desk: Review verification files and export NDPA compliance logs.

2. COMPLIANCE & LEGAL GUARDRAILS (Hard-Coded Constraints):
- STATUTORY DISCLAIMER: Append "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client." to all report UI screens and PDF exports.
- HEALTH DATA EXCLUSION: Health status or HIV check fields are strictly forbidden across all database schemas, forms, and API payloads.
- NDPA CONSENT: Require timestamped digital consent checkboxes before unlocking candidate data intake or verification APIs.

3. TECH STACK & COMPONENTS:
- Framework: Next.js (App Router), Tailwind CSS, Shadcn UI components, Lucide Icons.
- Database: PostgreSQL / Supabase with RLS policies.
- Payments: Paystack Inline Checkout.
- PDF Generation: @react-pdf/renderer.

Generate the full frontend UI components, database schemas, mock API handlers, and interactive state management for this complete system.

```