"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  QrCode,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginMethod = "phone" | "qr";

export default function LoginPage() {
  const { setIsLoggedIn, setUserName } = useAppStore();
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  const handlePhoneLogin = async () => {
    if (step === 1 && phone) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setLoading(false);
      setStep(2);
    } else if (step === 2 && code) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setLoading(false);
      setUserName("David Johnson");
      setIsLoggedIn(true);
    }
  };

  const handleQrLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    setQrScanned(true);
    setLoading(false);
    await new Promise((r) => setTimeout(r, 1000));
    setUserName("David Johnson");
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen landing-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#4F7CFF] flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-white text-xl">
            Telegram Drive
          </span>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Sign in with your Telegram account to access your cloud storage
          </p>

          {/* Method Toggle */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl mb-6">
            <button
              onClick={() => {
                setMethod("phone");
                setStep(1);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                method === "phone"
                  ? "bg-[#4F7CFF] text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone
            </button>
            <button
              onClick={() => {
                setMethod("qr");
                setStep(1);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                method === "qr"
                  ? "bg-[#4F7CFF] text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </button>
          </div>

          {/* Phone Login */}
          {method === "phone" && (
            <div className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Input
                        type={showPhone ? "text" : "password"}
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-11 pr-10"
                      />
                      <button
                        onClick={() => setShowPhone(!showPhone)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showPhone ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={handlePhoneLogin}
                    disabled={!phone || loading}
                    className="w-full bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white h-11"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <MessageSquare className="w-4 h-4 mr-2" />
                    )}
                    Send Verification Code
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">
                      Verification Code
                    </label>
                    <Input
                      placeholder="Enter the code from Telegram"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-11"
                      autoFocus
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      A login code was sent to your Telegram app
                    </p>
                  </div>
                  <Button
                    onClick={handlePhoneLogin}
                    disabled={!code || loading}
                    className="w-full bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white h-11"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Sign In
                  </Button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-xs text-gray-500 hover:text-gray-300"
                  >
                    Use a different phone number
                  </button>
                </>
              )}
            </div>
          )}

          {/* QR Code Login */}
          {method === "qr" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-xl p-3 mb-3 relative">
                  {qrScanned ? (
                    <div className="w-full h-full rounded-lg bg-green-500/10 flex flex-col items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-400 mb-2" />
                      <p className="text-sm text-green-400 font-medium">
                        Verified!
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* QR Code Pattern */}
                      <div className="w-full h-full rounded-lg bg-gray-900 p-2 grid grid-cols-8 grid-rows-8 gap-[2px]">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-[1px] ${
                              Math.random() > 0.4
                                ? "bg-white"
                                : "bg-gray-900"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                          <Send className="w-6 h-6 text-[#4F7CFF]" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center max-w-[260px]">
                  Open Telegram on your phone → Settings → Devices → Link
                  Desktop Device → Scan this code
                </p>
              </div>
              <Button
                onClick={handleQrLogin}
                disabled={loading || qrScanned}
                className="w-full bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white h-11"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {qrScanned ? "Connecting..." : "Simulate QR Scan"}
              </Button>
            </div>
          )}

          {/* Security Note */}
          <div className="flex items-center gap-2 mt-5 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
            <Lock className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <p className="text-[11px] text-green-400/80">
              End-to-end encrypted. Your session data is never stored on our
              servers.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Secure
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Fast
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Private
          </div>
        </div>
      </motion.div>
    </div>
  );
}
