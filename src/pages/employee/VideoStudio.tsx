import { useState, useRef, useEffect, useCallback } from "react";
import DashboardShell from "@/components/ui/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";

type Stage = "pass" | "guidelines" | "recording" | "complete";

export default function VideoStudio() {
  const { user, activatePass } = useAuth();
  const { passes, roles } = useAppData();

  const [stage, setStage] = useState<Stage>("pass");
  const [selectedPassId, setSelectedPassId] = useState(passes[1]?.id ?? passes[0]?.id);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [recordedBlobs, setRecordedBlobs] = useState<(Blob | null)[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState("");
  const [paying, setPaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const selectedRole = roles.find(r => r.id === selectedRoleId);
  const questions = selectedRole?.questions ?? [];

  useEffect(() => {
    if (!selectedRoleId && roles.length > 0) setSelectedRoleId(roles[0].id);
  }, [roles, selectedRoleId]);

  useEffect(() => {
    if (recordedBlobs.length === 0 && questions.length > 0) {
      setRecordedBlobs(new Array(questions.length).fill(null));
    }
  }, [questions.length, recordedBlobs.length]);

  const startCamera = useCallback(async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }
    } catch {
      setCameraError("Camera access denied. Please allow camera and microphone permissions in your browser, then try again.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (stage === "recording") startCamera();
    return () => { if (stage === "recording") stopCamera(); };
  }, [stage, startCamera, stopCamera]);

  const startRecording = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const mr = new MediaRecorder(streamRef.current, { mimeType: "video/webm;codecs=vp8,opus" });
    mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlobs(prev => { const n = [...prev]; n[questionIdx] = blob; return n; });
    };
    mr.start(200);
    mediaRecorderRef.current = mr;
    setIsRecording(true);
    setTimer(0);
    timerRef.current = window.setInterval(() => {
      setTimer(t => {
        if (t >= 59) { stopRecording(); return 60; }
        return t + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsRecording(false);
  };

  const nextQuestion = () => {
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(q => q + 1);
    } else {
      stopCamera();
      setStage("complete");
    }
  };

  const handlePayAndContinue = () => {
    setPaying(true);
    setTimeout(() => {
      const pass = passes.find(p => p.id === selectedPassId);
      if (pass) activatePass(pass.days);
      setPaying(false);
      setStage("guidelines");
    }, 1500);
  };

  const passActive = user?.passExpiresAt && user.passExpiresAt > new Date();

  return (
    <DashboardShell>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Video Interview Studio</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">Record your intro and become visible to employers</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2">
          {["Pass", "Guidelines", "Record", "Done"].map((s, i) => {
            const stageIdx = ["pass","guidelines","recording","complete"].indexOf(stage);
            const done = i < stageIdx;
            const active = i === stageIdx;
            return (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? "bg-green-500 text-white" : active ? "bg-[#29235c] text-white" : "bg-[#e5e7eb] text-[#9ca3af]"}`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${active ? "text-[#29235c] font-semibold" : "text-[#9ca3af]"}`}>{s}</span>
                {i < 3 && <div className="w-6 h-px bg-[#e5e7eb] mx-1" />}
              </div>
            );
          })}
        </div>

        {/* ── Stage: Pass ── */}
        {stage === "pass" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            {passActive ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold text-green-800 text-sm">You already have an active pass</p>
                  <p className="text-green-700 text-xs mt-0.5">Expires {user?.passExpiresAt?.toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg mb-1">Activate a Visibility Pass</h2>
                  <p className="text-[#6b7280] text-sm">Pay to unlock the video studio and appear in employer searches.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {passes.map(p => (
                    <label key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedPassId === p.id ? "border-[#009fe3] bg-[#f0f9ff]" : "border-[rgba(0,0,0,0.1)] hover:border-[#009fe3]/50"}`}>
                      <input type="radio" name="pass" value={p.id} checked={selectedPassId === p.id} onChange={() => setSelectedPassId(p.id)} className="accent-[#009fe3]" />
                      <div className="flex-1">
                        <span className="font-bold text-[#29235c] text-sm">{p.label}</span>
                        <p className="text-[#6b7280] text-xs mt-0.5">{p.days} days of visibility</p>
                      </div>
                      <span className="font-['Montserrat:Black',sans-serif] font-black text-[#29235c] text-lg whitespace-nowrap">₦{p.price.toLocaleString()}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Role selection */}
            <div>
              <label className="text-sm font-semibold text-[#29235c] block mb-2">Which role are you recording for?</label>
              <select value={selectedRoleId ?? ""} onChange={e => setSelectedRoleId(Number(e.target.value))}
                className="w-full border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#009fe3] bg-white">
                {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </div>

            <button onClick={passActive ? () => setStage("guidelines") : handlePayAndContinue} disabled={paying}
              className="bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2">
              {paying ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing Paystack…</> : passActive ? "Continue to Studio →" : "Pay & Activate →"}
            </button>
            <p className="text-center text-xs text-[#9ca3af]">Secured by Paystack · NGN payments</p>
          </div>
        )}

        {/* ── Stage: Guidelines ── */}
        {stage === "guidelines" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            <h2 className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg">Before you record</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "💡", tip: "Good lighting", desc: "Sit facing a window or bright light. Avoid dark backgrounds." },
                { icon: "👔", tip: "Dress neatly", desc: "Smart casual is perfect. Wear a clean, solid-colour top." },
                { icon: "🔇", tip: "Quiet space", desc: "Find a quiet room. Close doors and silence your phone." },
                { icon: "📱", tip: "Camera at eye level", desc: "Position your screen so the camera is at eye level." },
              ].map(g => (
                <div key={g.tip} className="bg-[#f8f8fb] rounded-xl p-4 flex gap-3">
                  <span className="text-2xl shrink-0">{g.icon}</span>
                  <div>
                    <p className="font-semibold text-[#29235c] text-sm">{g.tip}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6b7280] bg-[#f3f3f3] rounded-xl p-3">
              You will answer <strong>{questions.length} questions</strong> for <strong>{selectedRole?.title}</strong>. Each answer is up to 60 seconds. You can re-record any answer before submitting.
            </p>
            <button onClick={() => setStage("recording")}
              className="bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
              {"I'm ready — Open Camera →"}
            </button>
          </div>
        )}

        {/* ── Stage: Recording ── */}
        {stage === "recording" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-5">
            {/* Progress bars */}
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < questionIdx ? "bg-green-500" : i === questionIdx ? "bg-[#009fe3]" : "bg-[#e5e7eb]"}`} />
              ))}
            </div>

            <div>
              <p className="text-[#009fe3] text-xs font-bold uppercase tracking-wide">Question {questionIdx + 1} of {questions.length}</p>
              <p className="font-['Raleway:Bold',sans-serif] font-bold text-[#29235c] text-lg mt-1">{questions[questionIdx]}</p>
            </div>

            {cameraError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{cameraError}</div>
            ) : (
              <div className="relative bg-[#1a1a2e] rounded-2xl overflow-hidden aspect-video">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {isRecording && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />{timer}s / 60s
                  </div>
                )}
                {recordedBlobs[questionIdx] && !isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white text-4xl">✅</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {!isRecording
                ? <button onClick={startRecording} disabled={!!cameraError}
                    className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white" />
                    {recordedBlobs[questionIdx] ? "Re-record" : "Record"}
                  </button>
                : <button onClick={stopRecording}
                    className="flex-1 bg-[#29235c] text-white font-bold py-3 rounded-xl hover:bg-[#1e1656] transition-colors cursor-pointer">
                    Stop ■
                  </button>
              }
              {recordedBlobs[questionIdx] && !isRecording && (
                <button onClick={nextQuestion}
                  className="flex-1 bg-[#009fe3] text-white font-bold py-3 rounded-xl hover:bg-[#0090cc] transition-colors cursor-pointer">
                  {questionIdx < questions.length - 1 ? "Next →" : "Submit All →"}
                </button>
              )}
            </div>

            {/* Playback of recorded clip */}
            {recordedBlobs[questionIdx] && !isRecording && (
              <div>
                <p className="text-xs text-[#9ca3af] mb-1">Preview your recording:</p>
                <video
                  src={URL.createObjectURL(recordedBlobs[questionIdx]!)}
                  controls
                  className="w-full rounded-xl bg-black"
                  style={{ maxHeight: "160px" }}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Stage: Complete ── */}
        {stage === "complete" && (
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 flex flex-col items-center gap-4 text-center">
            <span className="text-6xl">🎉</span>
            <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#29235c] text-2xl">Profile submitted!</h2>
            <p className="text-[#6b7280] text-sm max-w-sm">Your {questions.length} video responses for <strong>{selectedRole?.title}</strong> are live. Employers can now find and watch your profile.</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => { setStage("pass"); setQuestionIdx(0); setRecordedBlobs([]); }}
                className="border border-[rgba(0,0,0,0.1)] text-[#29235c] font-bold text-sm px-5 py-2.5 rounded-xl hover:border-[#29235c] transition-colors cursor-pointer">
                Record Another Role
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
