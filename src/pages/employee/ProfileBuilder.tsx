import { useState, useRef } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";

const SKILL_OPTIONS = [
  "Microsoft Office", "Customer Service", "Data Entry", "Communication",
  "Team Leadership", "Problem Solving", "Social Media Management", "QuickBooks",
  "Inventory Management", "Cash Handling / POS", "Driving (Class B)", "Forklift Operation",
  "Network Troubleshooting", "Hardware Repair", "Python", "Excel / Google Sheets",
  "Sales & Negotiation", "Cold Calling", "Report Writing", "Event Planning",
];

const WORK_TYPES = ["On-site", "Remote", "Hybrid"];
const AVAILABILITY_OPTIONS = ["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months"];

interface WorkEntry { id: number; company: string; role: string; startYear: string; endYear: string; current: boolean; duties: string; }
interface EduEntry { id: number; institution: string; degree: string; field: string; year: string; }

export default function ProfileBuilder() {
  const { user, updateUser } = useAuth();
  const { roles } = useAppData();

  const [tab, setTab] = useState<"personal" | "experience" | "education" | "skills" | "preferences">("personal");
  const [saved, setSaved] = useState(false);

  // Personal
  const [bio, setBio] = useState("Hardworking and reliable professional with a passion for customer service and team collaboration.");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  // Work experience
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([
    { id: 1, company: "QuickMart Superstore", role: "Customer Service Representative", startYear: "2022", endYear: "2024", current: false, duties: "Handled customer inquiries, managed product returns, and operated POS systems." },
  ]);
  const [addingWork, setAddingWork] = useState(false);
  const [newWork, setNewWork] = useState<Omit<WorkEntry, "id">>({ company: "", role: "", startYear: "", endYear: "", current: false, duties: "" });

  // Education
  const [eduEntries, setEduEntries] = useState<EduEntry[]>([
    { id: 1, institution: "University of Lagos", degree: "B.Sc", field: "Business Administration", year: "2021" },
  ]);
  const [addingEdu, setAddingEdu] = useState(false);
  const [newEdu, setNewEdu] = useState<Omit<EduEntry, "id">>({ institution: "", degree: "", field: "", year: "" });

  // Skills
  const [skills, setSkills] = useState<string[]>(["Customer Service", "Cash Handling / POS", "Microsoft Office"]);
  const [customSkill, setCustomSkill] = useState("");

  // Preferences
  const [targetRole, setTargetRole] = useState(roles[0]?.title ?? "");
  const [salaryMin, setSalaryMin] = useState("60000");
  const [salaryMax, setSalaryMax] = useState("100000");
  const [location, setLocation] = useState("Lagos");
  const [workType, setWorkType] = useState("On-site");
  const [availability, setAvailability] = useState("Immediately");
  const [openToRelocation, setOpenToRelocation] = useState(false);

  const toggleSkill = (s: string) =>
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const addCustomSkill = () => {
    const s = customSkill.trim();
    if (s && !skills.includes(s)) setSkills(prev => [...prev, s]);
    setCustomSkill("");
  };

  const saveWork = () => {
    if (!newWork.company || !newWork.role) return;
    setWorkEntries(prev => [...prev, { ...newWork, id: Date.now() }]);
    setNewWork({ company: "", role: "", startYear: "", endYear: "", current: false, duties: "" });
    setAddingWork(false);
  };

  const saveEdu = () => {
    if (!newEdu.institution || !newEdu.degree) return;
    setEduEntries(prev => [...prev, { ...newEdu, id: Date.now() }]);
    setNewEdu({ institution: "", degree: "", field: "", year: "" });
    setAddingEdu(false);
  };

  const handleSave = () => {
    updateUser({ fullName: user?.fullName ?? "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const TABS = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "preferences", label: "Preferences" },
  ] as const;

  const completedSections = [
    bio.trim().length > 0,
    workEntries.length > 0,
    eduEntries.length > 0,
    skills.length > 0,
    !!targetRole && !!salaryMin,
  ].filter(Boolean).length;

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">My Profile</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">Build your professional profile — this is what employers see alongside your video</p>
          </div>
          <button onClick={handleSave}
            className="bg-[#009fe3] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
            {saved ? "Saved ✓" : "Save Profile"}
          </button>
        </div>

        {/* Completeness bar */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <p className="text-xs font-semibold text-[#29235c]">Profile completeness</p>
              <p className="text-xs font-bold text-[#009fe3]">{completedSections * 20}%</p>
            </div>
            <div className="h-2 rounded-full bg-[#f3f3f3] overflow-hidden">
              <div className="h-full rounded-full bg-[#009fe3] transition-all duration-500" style={{ width: `${completedSections * 20}%` }} />
            </div>
          </div>
          <p className="text-xs text-[#6b7280] whitespace-nowrap">{completedSections}/5 sections complete</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f3f3f3] rounded-xl p-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${tab === t.id ? "bg-white text-[#29235c] shadow-sm" : "text-[#6b7280] hover:text-[#29235c]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Personal ── */}
        {tab === "personal" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div
                onClick={() => photoRef.current?.click()}
                className="w-20 h-20 rounded-full bg-[#29235c]/10 flex items-center justify-center cursor-pointer overflow-hidden hover:opacity-80 transition-opacity shrink-0 border-2 border-dashed border-[rgba(0,0,0,0.1)] hover:border-[#009fe3]">
                {photoPreview
                  ? <img src={photoPreview} alt="photo" className="w-full h-full object-cover" />
                  : <span className="font-black text-[#29235c] text-2xl">{user?.fullName?.charAt(0) ?? "?"}</span>}
              </div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) setPhotoPreview(URL.createObjectURL(f)); }} />
              <div className="flex-1">
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">{user?.fullName}</p>
                <p className="text-[#6b7280] text-sm">{user?.email}</p>
                <button onClick={() => photoRef.current?.click()} className="text-[#009fe3] text-xs font-semibold mt-1 cursor-pointer hover:underline">
                  {photoPreview ? "Change photo" : "Upload photo"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Full name</label>
                <input defaultValue={user?.fullName} className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Phone number</label>
                <input defaultValue={user?.phone} className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Professional summary</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4}
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20 resize-none"
                placeholder="Write 2–3 sentences about your experience, strengths, and what you're looking for…" />
              <p className="text-[#9ca3af] text-xs mt-1 text-right">{bio.length} / 400</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">CV / Resume upload</label>
              <div className="border-2 border-dashed border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#009fe3]/50 transition-colors bg-[#fafafa]">
                <span className="text-2xl">📄</span>
                <p className="text-[#9ca3af] text-xs">Click to upload PDF or Word CV</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Experience ── */}
        {tab === "experience" && (
          <div className="flex flex-col gap-4">
            {workEntries.map(w => (
              <div key={w.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm">{w.role}</p>
                    <p className="text-[#009fe3] text-xs font-semibold mt-0.5">{w.company}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">{w.startYear} — {w.current ? "Present" : w.endYear}</p>
                  </div>
                  <button onClick={() => setWorkEntries(prev => prev.filter(e => e.id !== w.id))}
                    className="text-red-400 hover:text-red-600 text-xs font-semibold cursor-pointer">Remove</button>
                </div>
                {w.duties && <p className="text-[#6b7280] text-xs mt-3 leading-relaxed">{w.duties}</p>}
              </div>
            ))}

            {addingWork ? (
              <div className="bg-white rounded-2xl border border-[#009fe3]/30 p-5 flex flex-col gap-4">
                <p className="font-bold text-[#29235c] text-sm">Add Work Experience</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Company / Employer", val: newWork.company, key: "company" },
                    { label: "Job Title / Role", val: newWork.role, key: "role" },
                    { label: "Start Year", val: newWork.startYear, key: "startYear" },
                    { label: "End Year", val: newWork.endYear, key: "endYear" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">{f.label}</label>
                      <input value={f.val}
                        onChange={e => setNewWork(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3]"
                        placeholder={f.key.includes("Year") ? "e.g. 2022" : ""} />
                    </div>
                  ))}
                </div>
                <label className="flex gap-2 items-center text-xs text-[#374151] cursor-pointer">
                  <input type="checkbox" checked={newWork.current} onChange={e => setNewWork(p => ({ ...p, current: e.target.checked }))} className="accent-[#009fe3]" />
                  I currently work here
                </label>
                <div>
                  <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">Key duties / achievements</label>
                  <textarea value={newWork.duties} onChange={e => setNewWork(p => ({ ...p, duties: e.target.value }))} rows={2}
                    className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] resize-none"
                    placeholder="Briefly describe what you did in this role…" />
                </div>
                <div className="flex gap-3">
                  <button onClick={saveWork} className="bg-[#29235c] text-white font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">Save</button>
                  <button onClick={() => setAddingWork(false)} className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingWork(true)}
                className="border-2 border-dashed border-[rgba(0,0,0,0.1)] rounded-2xl py-5 text-[#009fe3] font-bold text-sm hover:border-[#009fe3] transition-colors cursor-pointer">
                + Add Work Experience
              </button>
            )}
          </div>
        )}

        {/* ── Education ── */}
        {tab === "education" && (
          <div className="flex flex-col gap-4">
            {eduEntries.map(e => (
              <div key={e.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm">{e.degree} {e.field}</p>
                  <p className="text-[#009fe3] text-xs font-semibold mt-0.5">{e.institution}</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">Graduated {e.year}</p>
                </div>
                <button onClick={() => setEduEntries(prev => prev.filter(x => x.id !== e.id))}
                  className="text-red-400 hover:text-red-600 text-xs font-semibold cursor-pointer">Remove</button>
              </div>
            ))}

            {addingEdu ? (
              <div className="bg-white rounded-2xl border border-[#009fe3]/30 p-5 flex flex-col gap-4">
                <p className="font-bold text-[#29235c] text-sm">Add Education</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Institution", val: newEdu.institution, key: "institution", placeholder: "e.g. University of Lagos" },
                    { label: "Degree / Certificate", val: newEdu.degree, key: "degree", placeholder: "e.g. B.Sc, HND, OND, WAEC" },
                    { label: "Field of Study", val: newEdu.field, key: "field", placeholder: "e.g. Business Administration" },
                    { label: "Graduation Year", val: newEdu.year, key: "year", placeholder: "e.g. 2021" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-semibold text-[#29235c] mb-1.5 block">{f.label}</label>
                      <input value={f.val} onChange={e => setNewEdu(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3]"
                        placeholder={f.placeholder} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={saveEdu} className="bg-[#29235c] text-white font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">Save</button>
                  <button onClick={() => setAddingEdu(false)} className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingEdu(true)}
                className="border-2 border-dashed border-[rgba(0,0,0,0.1)] rounded-2xl py-5 text-[#009fe3] font-bold text-sm hover:border-[#009fe3] transition-colors cursor-pointer">
                + Add Education
              </button>
            )}
          </div>
        )}

        {/* ── Skills ── */}
        {tab === "skills" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            <div>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-sm mb-1">Your selected skills</p>
              <p className="text-[#9ca3af] text-xs">These appear on your profile card and help employers filter searches</p>
            </div>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="flex items-center gap-1.5 bg-[#29235c] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {s}
                    <button onClick={() => toggleSkill(s)} className="text-white/70 hover:text-white cursor-pointer leading-none">✕</button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#9ca3af] text-sm italic">No skills selected yet.</p>
            )}

            <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
              <p className="text-xs font-semibold text-[#29235c] mb-3">Tap to add from common skills:</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.filter(s => !skills.includes(s)).map(s => (
                  <button key={s} onClick={() => toggleSkill(s)}
                    className="bg-[#f3f3f3] text-[#374151] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#29235c] hover:text-white transition-colors cursor-pointer border border-[rgba(0,0,0,0.08)]">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input value={customSkill} onChange={e => setCustomSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCustomSkill()}
                className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3]"
                placeholder="Type a custom skill and press Enter…" />
              <button onClick={addCustomSkill} className="bg-[#009fe3] text-white font-bold text-sm px-4 py-2.5 rounded-xl cursor-pointer">Add</button>
            </div>
          </div>
        )}

        {/* ── Preferences ── */}
        {tab === "preferences" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            <p className="text-[#9ca3af] text-xs bg-[#f0f9ff] border border-[#bae6fd] rounded-xl px-4 py-3 text-[#0369a1]">
              💡 These preferences guide the Matching Concierge and help employers understand what you are looking for.
            </p>

            <div>
              <label className="text-xs font-semibold text-[#29235c] mb-2 block">Target job role</label>
              <select value={targetRole} onChange={e => setTargetRole(e.target.value)}
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                {roles.map(r => <option key={r.id}>{r.title}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#29235c] mb-2 block">Expected monthly salary (₦)</label>
              <div className="flex items-center gap-3">
                <input type="number" value={salaryMin} onChange={e => setSalaryMin(e.target.value)} min={0}
                  className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                  placeholder="Min e.g. 60000" />
                <span className="text-[#9ca3af] text-sm">to</span>
                <input type="number" value={salaryMax} onChange={e => setSalaryMax(e.target.value)} min={0}
                  className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                  placeholder="Max e.g. 100000" />
              </div>
              {salaryMin && salaryMax && <p className="text-[#009fe3] text-xs mt-1.5 font-semibold">₦{parseInt(salaryMin).toLocaleString()} – ₦{parseInt(salaryMax).toLocaleString()} / month</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-2 block">Preferred location</label>
                <input value={location} onChange={e => setLocation(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3]"
                  placeholder="e.g. Lagos, Abuja, Port Harcourt" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#29235c] mb-2 block">Availability to start</label>
                <select value={availability} onChange={e => setAvailability(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                  {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#29235c] mb-2 block">Preferred work type</label>
              <div className="flex gap-2">
                {WORK_TYPES.map(t => (
                  <button key={t} onClick={() => setWorkType(t)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${workType === t ? "bg-[#29235c] text-white border-[#29235c]" : "border-[rgba(0,0,0,0.1)] text-[#6b7280] hover:border-[#29235c]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex gap-3 items-center cursor-pointer bg-[#f8f8fb] rounded-xl p-4">
              <input type="checkbox" checked={openToRelocation} onChange={e => setOpenToRelocation(e.target.checked)} className="accent-[#009fe3] w-4 h-4" />
              <span className="text-sm font-semibold text-[#29235c]">Open to relocation within Nigeria</span>
            </label>
          </div>
        )}

        <button onClick={handleSave}
          className="bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
          {saved ? "Profile Saved ✓" : "Save Profile"}
        </button>
      </div>
    </DashboardShell>
  );
}
