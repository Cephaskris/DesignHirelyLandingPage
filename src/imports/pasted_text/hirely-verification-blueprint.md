## **Implementation Blueprint for Hirely Verification Engine**

---

### **1. Technical Implementation Workflow in the Web Application**

The verification document workflow is divided into three execution vectors based on how the system verifies the data:

```
                      ┌─────────────────────────────────┐
                      │ EMPLOYER REQUESTS VERIFICATION  │
                      │   (Selects Tier 1, 2, or 3)     │
                      └────────────────┬────────────────┘
                                       │
                                       ▼
                      ┌─────────────────────────────────┐
                      │    CANDIDATE DATA INTAKE UI     │
                      │   (Fills Inputs & Uploads Docs) │
                      └────────────────┬────────────────┘
                                       │
                                       ▼
                      ┌─────────────────────────────────┐
                      │ MANDATORY NDPA 2023 CONSENT GATE │
                      │  (Timestamped Log Saved to DB)  │
                      └────────────────┬────────────────┘
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌──────────────┐               ┌──────────────┐               ┌──────────────┐
│    TIER 1    │               │    TIER 2    │               │    TIER 3    │
│ Instant API  │               │ Third-Party  │               │ Physical &   │
│ Lookups      │               │ Verification │               │ Manual Verification
└──────┬───────┘               └──────┬───────┘               └──────┬───────┘
       │                               │                               │
 (QoreID / Dojah)             (Portal API / Agent)           (Geotag Mobile App)
       │                               │                               │
       └───────────────────────────────┼───────────────────────────────┘
                                       ▼
                      ┌─────────────────────────────────┐
                      │ AUDIT LOG & PDF REPORT ENGINE   │
                      │  (Appends Legal Non-Advisory    │
                      │   Disclaimer & Generates PDF)   │
                      └─────────────────────────────────┘

```

#### **A. Automated Real-Time Verification (Tier 1)**

1. **Candidate Data Capture:** The frontend presents input fields for **NIN** and **BVN**, and a file upload button for government IDs.
2. **Instant API Execution:** When submitted, Next.js Server Actions securely proxy requests to identity provider APIs (e.g., **QoreID** or **Dojah**).
3. **Automated Name Matching:** The server compares the first name, last name, and date of birth returned by NIMC/NIBSS against the candidate's Hirely profile.
4. **Instant Database Status:** If matched, `status` updates automatically to `'VERIFIED'`.

#### **B. Asynchronous Third-Party Verification (Tier 2)**

1. **Document Upload:** Candidates upload PDF/JPEG copies of their **Degree Certificate**, **NYSC Certificate**, and **Professional License**.
2. **Secure Bucket Storage:** Files route directly to a secure, private bucket on **Supabase Storage** or **AWS S3** (`/verifications/{candidate_id}/{doc_type}.pdf`).
3. **Verification Queue:** The system creates a pending verification ticket on the **Super Admin Desk**. The admin verifies the credentials via institutional portals or authorized clearing agents.

#### **C. Field & Manual Verification (Tier 3)**

1. **Field Agent Dispatch:** Submitting proof of address triggers a task in the field agent module or external dispatch partner API (e.g., QoreID Digital Addressing / VeriFind).
2. **Geotagged Verification:** Field agents visit the residential address, take a live photo with embedded GPS coordinates (Latitude/Longitude), and upload it via the agent portal.
3. **Guarantor Automated Ping:** The system sends an automated SMS/WhatsApp verification link (via Termii API) to the listed Guarantor with a digital sign-off form.

---

### **2. Master Instruction Block for the AI Web Builder**

Copy and paste this instruction block into **Cursor**, **Bolt.new**, **v0**, or **Lovable** to build the document verification pipeline:

```text
Act as a Senior Full-Stack Engineer. Implement the complete "Hirely Verify Document & Compliance Module" inside our Next.js + PostgreSQL/Supabase stack according to the instructions below:

1. DATABASE SCHEMA EXTENSIONS:
Create the following dynamic table for document uploads:
CREATE TABLE verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES verification_cases(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'NIN_CARD', 'GOVT_ID', 'DEGREE_CERT', 'NYSC_CERT', 'UTILITY_BILL', 'GUARANTOR_FORM'
    file_url TEXT NOT NULL,
    verification_status TEXT DEFAULT 'PENDING', -- 'PENDING', 'VERIFIED', 'REJECTED'
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

2. FRONTEND INTAKE UI (Candidate Dashboard):
- Create a dynamic tabbed modal or multi-step wizard for candidate document submission based on the tier requested by the employer:
  * Tier 1 Step: NIN Input field, BVN Input field, File Dropzone for Passport/Driver's License.
  * Tier 2 Step: File Dropzones for Degree Certificate, NYSC Certificate/Exemption Letter, and Professional Certifications.
  * Tier 3 Step: Address input with GPS Location Pinning, Utility Bill Dropzone, and Guarantor Details form (Full Name, Phone Number, Relationship, ID Upload).

- MANDATORY CONSENT CHECKBOX (NDPA 2023):
  * Render a non-negotiable checkbox before submission:
    "I hereby grant explicit consent to Hirely and its verification partners to process my personal data, identity numbers, and uploaded documents strictly for verification purposes under the Nigeria Data Protection Act (NDPA 2023)."
  * Save `ndpa_consent = true` and `consent_timestamp = NOW()` to `verification_cases`.

3. BACKEND API INTEGRATION (Next.js Server Actions):
- Create route handlers `/api/verify/identity`:
  * Integrate QoreID / Dojah API for NIN lookup (`POST https://api.qoreid.com/v1/ng/identities/nin`) and BVN name validation.
  * Store JSON responses securely in `verification_cases.documents_uploaded`.
- File Storage Setup: Upload binary files to Supabase Storage Bucket (`/verifications`) with signed private URLs accessible only to Super Admin and the requesting Employer.

4. COMPLIANCE & LEGAL PDF REPORT GENERATOR:
- Use `@react-pdf/renderer` to build a professional downloadable verification report PDF.
- PDF Layout MUST include:
  * Hirely Watermark & Header.
  * Candidate Profile Summary & Verification Outcome Table (Tier 1, Tier 2, Tier 3 results).
  * Geotagged Address Details & Map snippet (if Tier 3).
  * HARDCODED FOOTER DISCLAIMER:
    "STATEMENT OF NON-ADVISORY ROLE: Hirely Verification Services provides factual data verification only and does not make employment or hiring decisions on behalf of the client."

5. AUDIT LOGGING ENGINE (Section 84 Evidence Act Compliance):
- Every time a document is uploaded, viewed, or verified, insert an audit log record:
  INSERT INTO audit_logs (case_id, operator_id, action_performed, ip_address)
  VALUES (case_id, user_id, 'DOCUMENT_UPLOADED_NIN', user_ip);

Execute and build clean, production-ready React components, API actions, and database migrations.

```

---

### **3. Document Requirements Checklist by Verification Tier**

| Verification Tier | Required Candidate Submissions | Verification Engine Action |
| --- | --- | --- |
| **Tier 1 (Identity)** | • NIN & BVN Numbers<br>

<br>• Passport / Driver's License | Automated API query against NIMC/NIBSS + instant name match |
| **Tier 2 (Academic)** | • Degree / HND Certificate<br>

<br>• NYSC Certificate or Exemption | Document routing to Super Admin Queue & Tertiary Portal check |
| **Tier 3 (Field & Guarantors)** | • Utility Bill / Lease Agreement<br>

<br>• Guarantor Form & Guarantor ID | Field Agent Geotagged GPS Visit + Automated SMS/WhatsApp Guarantor link |
| **Mandatory for ALL Tiers** | • NDPA Digital Consent Checkbox | Timestamped digital consent record created in audit logs |