import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData } from "@/context/AppDataContext";

const TIPS = [
  "Keep questions open-ended so candidates reveal communication skills, not just yes/no answers.",
  "Include at least one scenario question (“How would you handle…”) per role.",
  "Limit to 5 questions max — candidates record one video per question.",
  "Order from general to specific: start with experience, end with situational.",
];

export default function InterviewQuestions() {
  const { roles, setRoles } = useAppData();
  const [selectedId, setSelectedId] = useState<number>(roles[0]?.id ?? 1);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [newQ, setNewQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [saved, setSaved] = useState(false);

  const role = roles.find(r => r.id === selectedId);

  const updateQuestions = (id: number, questions: string[]) => {
    setRoles(roles.map(r => r.id === id ? { ...r, questions } : r));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startEdit = (idx: number, text: string) => {
    setEditingIdx(idx);
    setEditText(text);
    setAdding(false);
  };

  const saveEdit = () => {
    if (!role || editingIdx === null || !editText.trim()) return;
    const qs = role.questions.map((q, i) => i === editingIdx ? editText.trim() : q);
    updateQuestions(role.id, qs);
    setEditingIdx(null);
  };

  const deleteQ = (idx: number) => {
    if (!role) return;
    updateQuestions(role.id, role.questions.filter((_, i) => i !== idx));
  };

  const addQ = () => {
    if (!role || !newQ.trim()) return;
    updateQuestions(role.id, [...role.questions, newQ.trim()]);
    setNewQ("");
    setAdding(false);
  };

  const moveQ = (idx: number, dir: -1 | 1) => {
    if (!role) return;
    const qs = [...role.questions];
    const swap = idx + dir;
    if (swap < 0 || swap >= qs.length) return;
    [qs[idx], qs[swap]] = [qs[swap], qs[idx]];
    updateQuestions(role.id, qs);
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Interview Questions</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">Configure the video questions candidates answer when applying for each role</p>
          </div>
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2">
              ✓ Saved
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-r from-[#29235c] to-[#009fe3] rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl shrink-0">🎬</span>
          <div>
            <p className="font-bold text-white text-sm">How Video Interviews Work</p>
            <p className="text-white/80 text-xs mt-0.5 leading-relaxed">
              When a candidate signs up and selects a role, they record a short video answer for each question you set here. Those recordings appear in your Video Vault for review. Questions you add or edit take effect immediately for any new recordings.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Role list */}
          <div className="lg:w-64 shrink-0 flex flex-col gap-2">
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wide px-1">Roles ({roles.length})</p>
            {roles.map(r => (
              <button key={r.id} onClick={() => { setSelectedId(r.id); setEditingIdx(null); setAdding(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${selectedId === r.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.06)] bg-white hover:border-[#009fe3]/40"}`}>
                <p className={`text-sm font-semibold leading-snug ${selectedId === r.id ? "text-[#29235c]" : "text-[#374151]"}`}>{r.title}</p>
                <p className="text-[#9ca3af] text-xs mt-0.5">{r.questions.length} question{r.questions.length !== 1 ? "s" : ""}</p>
              </button>
            ))}
          </div>

          {/* Questions editor */}
          {role && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">{role.title}</h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${role.questions.length >= 5 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-[#f0f9ff] text-[#009fe3] border-[#bae6fd]"}`}>
                    {role.questions.length}/5 questions
                  </span>
                </div>

                {role.questions.length === 0 && (
                  <div className="text-center py-8 text-[#9ca3af]">
                    <p className="text-3xl mb-2">❓</p>
                    <p className="text-sm">No questions yet. Add your first question below.</p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {role.questions.map((q, i) => (
                    <div key={i} className="group border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden">
                      {editingIdx === i ? (
                        <div className="p-4 bg-[#f8f8fb] flex flex-col gap-3">
                          <textarea value={editText} onChange={e => setEditText(e.target.value)}
                            rows={2} autoFocus
                            className="w-full border border-[#009fe3] rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" />
                          <div className="flex gap-2">
                            <button onClick={saveEdit}
                              className="bg-[#29235c] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                              Save
                            </button>
                            <button onClick={() => setEditingIdx(null)}
                              className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] text-xs font-bold px-4 py-2 rounded-xl cursor-pointer hover:border-[#29235c] transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 p-4">
                          <div className="w-6 h-6 rounded-full bg-[#29235c]/10 flex items-center justify-center text-[10px] font-black text-[#29235c] shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="flex-1 text-sm text-[#374151] leading-relaxed">{q}</p>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button onClick={() => moveQ(i, -1)} disabled={i === 0}
                              className="w-7 h-7 rounded-lg border border-[rgba(0,0,0,0.1)] flex items-center justify-center text-[#6b7280] hover:border-[#29235c] hover:text-[#29235c] transition-colors cursor-pointer disabled:opacity-30">
                              <svg fill="none" width="10" height="10" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                            </button>
                            <button onClick={() => moveQ(i, 1)} disabled={i === role.questions.length - 1}
                              className="w-7 h-7 rounded-lg border border-[rgba(0,0,0,0.1)] flex items-center justify-center text-[#6b7280] hover:border-[#29235c] hover:text-[#29235c] transition-colors cursor-pointer disabled:opacity-30">
                              <svg fill="none" width="10" height="10" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                            </button>
                            <button onClick={() => startEdit(i, q)}
                              className="w-7 h-7 rounded-lg border border-[rgba(0,0,0,0.1)] flex items-center justify-center text-[#6b7280] hover:border-[#009fe3] hover:text-[#009fe3] transition-colors cursor-pointer">
                              <svg fill="none" width="10" height="10" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            </button>
                            <button onClick={() => deleteQ(i)}
                              className="w-7 h-7 rounded-lg border border-[rgba(0,0,0,0.1)] flex items-center justify-center text-[#6b7280] hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer">
                              <svg fill="none" width="10" height="10" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add question */}
                {adding ? (
                  <div className="mt-3 border-2 border-dashed border-[#009fe3] rounded-xl p-4 flex flex-col gap-3">
                    <textarea value={newQ} onChange={e => setNewQ(e.target.value)} rows={2} autoFocus
                      placeholder="Type your question here… e.g. 'How do you handle an angry customer?'"
                      className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] resize-none" />
                    <div className="flex gap-2">
                      <button onClick={addQ} disabled={!newQ.trim()}
                        className="bg-[#009fe3] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer disabled:opacity-40">
                        Add Question
                      </button>
                      <button onClick={() => { setAdding(false); setNewQ(""); }}
                        className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] text-xs font-bold px-4 py-2 rounded-xl cursor-pointer hover:border-[#29235c] transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  role.questions.length < 5 && (
                    <button onClick={() => { setAdding(true); setEditingIdx(null); }}
                      className="mt-3 w-full border-2 border-dashed border-[rgba(0,0,0,0.12)] text-[#9ca3af] text-sm font-semibold py-3 rounded-xl hover:border-[#009fe3] hover:text-[#009fe3] transition-colors cursor-pointer">
                      + Add Question
                    </button>
                  )
                )}
                {role.questions.length >= 5 && (
                  <p className="mt-3 text-amber-600 text-xs font-semibold text-center">Maximum 5 questions per role reached.</p>
                )}
              </div>

              {/* Tips */}
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5">
                <p className="font-bold text-[#29235c] text-sm mb-3">💡 Best Practices</p>
                <ul className="flex flex-col gap-2">
                  {TIPS.map((t, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-[#6b7280] leading-relaxed">
                      <span className="text-[#009fe3] font-bold shrink-0">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
