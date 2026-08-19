import { useState } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAppData, type JobRole } from "@/context/AppDataContext";

export default function RoleManager() {
  const { roles, setRoles } = useAppData();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [addingRole, setAddingRole] = useState(false);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState<Record<number, string>>({});
  const [editingQuestion, setEditingQuestion] = useState<{ roleId: number; idx: number; val: string } | null>(null);

  const addRole = () => {
    if (!newRoleTitle.trim()) return;
    const newRole: JobRole = { id: Date.now(), title: newRoleTitle.trim(), questions: [] };
    setRoles([...roles, newRole]);
    setNewRoleTitle("");
    setAddingRole(false);
    setExpandedId(newRole.id);
  };

  const deleteRole = (id: number) => {
    setRoles(roles.filter(r => r.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const addQuestion = (roleId: number) => {
    const q = newQuestion[roleId]?.trim();
    if (!q) return;
    setRoles(roles.map(r => r.id === roleId ? { ...r, questions: [...r.questions, q] } : r));
    setNewQuestion(prev => ({ ...prev, [roleId]: "" }));
  };

  const saveQuestion = () => {
    if (!editingQuestion) return;
    setRoles(roles.map(r => r.id === editingQuestion.roleId
      ? { ...r, questions: r.questions.map((q, i) => i === editingQuestion.idx ? editingQuestion.val : q) }
      : r
    ));
    setEditingQuestion(null);
  };

  const deleteQuestion = (roleId: number, idx: number) =>
    setRoles(roles.map(r => r.id === roleId ? { ...r, questions: r.questions.filter((_, i) => i !== idx) } : r));

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Role & Question Manager</h1>
            <p className="text-[#6b7280] text-sm mt-0.5">Configure job roles and sequential video interview questions — candidates see these during signup and recording</p>
          </div>
          <button onClick={() => setAddingRole(true)}
            className="bg-[#009fe3] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer whitespace-nowrap">
            + Add Role
          </button>
        </div>

        {addingRole && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-5 flex gap-3">
            <input value={newRoleTitle} onChange={e => setNewRoleTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addRole()}
              className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
              placeholder="e.g. Digital Marketing Specialist" autoFocus />
            <button onClick={addRole} className="bg-[#29235c] text-white font-bold text-sm px-4 py-2.5 rounded-xl cursor-pointer">Save</button>
            <button onClick={() => setAddingRole(false)} className="border border-[rgba(0,0,0,0.1)] text-[#6b7280] font-bold text-sm px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {roles.map(role => (
            <div key={role.id} className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
              <div
                onClick={() => setExpandedId(expandedId === role.id ? null : role.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-[#f8f8fb] transition-colors select-none">
                <div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-base">{role.title}</p>
                  <p className="text-[#9ca3af] text-xs mt-0.5">{role.questions.length} question{role.questions.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={e => { e.stopPropagation(); deleteRole(role.id); }}
                    className="text-red-400 hover:text-red-600 text-xs font-semibold cursor-pointer transition-colors">Delete</button>
                  <svg className={`transition-transform duration-200 ${expandedId === role.id ? "rotate-180" : ""}`} fill="none" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {expandedId === role.id && (
                <div className="border-t border-[rgba(0,0,0,0.06)] px-6 py-4 flex flex-col gap-3 bg-[#fafafa]">
                  {role.questions.length === 0 && (
                    <p className="text-[#9ca3af] text-xs italic">No questions yet. Add one below.</p>
                  )}
                  {role.questions.map((q, qi) => (
                    <div key={qi} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                      <span className="w-6 h-6 rounded-full bg-[#29235c] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{qi + 1}</span>
                      {editingQuestion?.roleId === role.id && editingQuestion.idx === qi
                        ? <div className="flex-1 flex gap-2">
                            <input value={editingQuestion.val}
                              onChange={e => setEditingQuestion(prev => prev ? { ...prev, val: e.target.value } : null)}
                              onKeyDown={e => e.key === "Enter" && saveQuestion()}
                              className="flex-1 border border-[#009fe3] rounded-lg px-3 py-1.5 text-sm focus:outline-none" autoFocus />
                            <button onClick={saveQuestion} className="text-[#009fe3] text-xs font-bold cursor-pointer whitespace-nowrap">Save</button>
                            <button onClick={() => setEditingQuestion(null)} className="text-[#9ca3af] text-xs font-bold cursor-pointer">✕</button>
                          </div>
                        : <div className="flex-1 flex items-start justify-between gap-2">
                            <p className="text-[#374151] text-sm leading-snug">{q}</p>
                            <div className="flex gap-2 shrink-0">
                              <button onClick={() => setEditingQuestion({ roleId: role.id, idx: qi, val: q })} className="text-[#009fe3] text-xs font-semibold cursor-pointer hover:underline">Edit</button>
                              <button onClick={() => deleteQuestion(role.id, qi)} className="text-red-400 text-xs font-semibold cursor-pointer hover:text-red-600">✕</button>
                            </div>
                          </div>
                      }
                    </div>
                  ))}

                  <div className="flex gap-2 mt-1">
                    <input
                      value={newQuestion[role.id] ?? ""}
                      onChange={e => setNewQuestion(prev => ({ ...prev, [role.id]: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && addQuestion(role.id)}
                      className="flex-1 border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#009fe3] focus:ring-2 focus:ring-[#009fe3]/20"
                      placeholder="Add a new interview question…" />
                    <button onClick={() => addQuestion(role.id)}
                      className="bg-[#29235c] text-white text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer hover:bg-[#1e1656] transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9ca3af] text-center">
          {roles.length} roles configured · changes are live immediately across candidate signup and the Video Studio
        </p>
      </div>
    </DashboardShell>
  );
}
