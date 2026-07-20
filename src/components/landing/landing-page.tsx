"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/app-store";
import {
  Send,
  Shield,
  Infinity,
  Zap,
  Users,
  RefreshCw,
  Search,
  ArrowRight,
  Play,
  Check,
  Star,
  Folder,
  Cloud,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const featuresList = [
  {
    title: "Unlimited Storage",
    description:
      "Store as much as you want using Telegram's powerful infrastructure. No limits, no restrictions.",
    icon: Infinity,
    color: "#8B5CF6",
  },
  {
    title: "100% Secure",
    description:
      "End-to-end encryption ensures your files remain private and protected at all times.",
    icon: Shield,
    color: "#14B8A6",
  },
  {
    title: "Lightning Fast",
    description:
      "Upload and download at blazing speeds powered by Telegram's global server network.",
    icon: Zap,
    color: "#8B5CF6",
  },
  {
    title: "Easy Sharing",
    description:
      "Share files instantly with public or private links, passwords, and expiry dates.",
    icon: Users,
    color: "#4F7CFF",
  },
  {
    title: "Auto Sync",
    description:
      "Your files stay synchronized across all your devices automatically and seamlessly.",
    icon: RefreshCw,
    color: "#14B8A6",
  },
  {
    title: "Smart Search",
    description:
      "Find any file instantly with AI-powered search, filters, and command palette.",
    icon: Search,
    color: "#4F7CFF",
  },
];

const stats = [
  { label: "Happy Users", value: "50K+", icon: Users, color: "#8B5CF6" },
  { label: "Files Stored", value: "10M+", icon: Folder, color: "#4F7CFF" },
  { label: "TB Uploaded", value: "1M+", icon: Cloud, color: "#00C2FF" },
  { label: "Uptime", value: "99.9%", icon: Shield, color: "#8B5CF6" },
];

export default function LandingPage() {
  const { setIsLoggedIn, setShowLogin } = useAppStore();

  return (
    <div className="landing-bg min-h-screen overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4F7CFF] flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-[15px]">
                Telegram Drive
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {["Features", "Security", "Pricing", "Enterprise", "Resources", "Docs"].map(
                (item) => (
                  <button
                    key={item}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-0.5"
                  >
                    {item}
                    {(item === "Features" || item === "Resources") && (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                )
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowLogin(true)}
              className="text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Sign in
            </Button>
            <Button
              onClick={() => setIsLoggedIn(true)}
              className="bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white text-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#4F7CFF]/30 bg-[#4F7CFF]/5 mb-6">
              <Shield className="w-3.5 h-3.5 text-[#4F7CFF]" />
              <span className="text-xs font-medium text-[#4F7CFF]">
                Powered by Telegram. Secured for You.
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-6">
              <span className="text-white">Your world. Your files.</span>
              <br />
              <span className="bg-gradient-to-r from-[#4F7CFF] to-[#00C2FF] bg-clip-text text-transparent">
                Limitless freedom.
              </span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Store, organize, stream and share any file with the speed and
              security of Telegram&apos;s infrastructure. Private. Fast. Powerful.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <Button
                onClick={() => setIsLoggedIn(true)}
                size="lg"
                className="bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white h-12 px-6 text-base"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/5 h-12 px-6 text-base"
              >
                <Play className="w-4 h-4 mr-1.5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-5 text-sm text-gray-400">
              {[
                "No credit card required",
                "Setup in 30 seconds",
                "Access anywhere",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            {/* Dashboard Preview */}
            <div className="glow-blue rounded-2xl overflow-hidden border border-[#4F7CFF]/20">
              <div className="bg-[#0B1220] p-4">
                {/* Mini dashboard preview */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-2">
                    <Search className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] text-gray-500 ml-1.5">
                      Search files...
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {/* Mini sidebar */}
                  <div className="w-36 space-y-1.5 shrink-0">
                    {[
                      "My Drive",
                      "Recent",
                      "Starred",
                      "Shared",
                      "Trash",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] ${
                          i === 0
                            ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                            : "text-gray-500"
                        }`}
                      >
                        <Folder className="w-3 h-3" />
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* Mini content */}
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Design System.fig", color: "#8B5CF6" },
                        { name: "Project Plan.pdf", color: "#4F7CFF" },
                        { name: "Vacation Photos", color: "#22C55E" },
                        { name: "My Song.mp3", color: "#EC4899" },
                      ].map((f) => (
                        <div
                          key={f.name}
                          className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5"
                        >
                          <div
                            className="w-full aspect-[4/3] rounded-md mb-1.5 flex items-center justify-center"
                            style={{ backgroundColor: f.color + "15" }}
                          >
                            <Folder
                              className="w-6 h-6"
                              style={{ color: f.color }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-300 truncate">
                            {f.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[#4F7CFF] to-[#00C2FF] bg-clip-text text-transparent">
              Everything you need
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-md mx-auto"
          >
            Powerful features to manage your files like never before
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuresList.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: feature.color + "20" }}
              >
                <feature.icon
                  className="w-5 h-5"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-white font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            Trusted by{" "}
            <span className="text-white font-semibold">50,000+</span> users
            worldwide
          </p>

          {/* Avatars */}
          <div className="flex items-center justify-center -space-x-2 mb-6">
            {["AK", "SM", "RJ", "PK", "NV", "DG"].map((initials, i) => (
              <div
                key={initials}
                className="w-10 h-10 rounded-full border-2 border-[#0a0e1a] flex items-center justify-center text-xs font-bold text-white"
                style={{
                  backgroundColor: [
                    "#4F7CFF",
                    "#8B5CF6",
                    "#14B8A6",
                    "#F59E0B",
                    "#EC4899",
                    "#F97316",
                  ][i],
                }}
              >
                {initials}
              </div>
            ))}
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="text-white font-semibold ml-2">4.9</span>
            <span className="text-gray-500 text-sm">/5</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-5 text-center"
              >
                <stat.icon
                  className="w-6 h-6 mx-auto mb-2"
                  style={{ color: stat.color }}
                />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to take control of your files?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Join thousands of users who trust Telegram Drive for their cloud
            storage needs.
          </p>
          <Button
            onClick={() => setIsLoggedIn(true)}
            size="lg"
            className="bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white h-12 px-8 text-base"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#4F7CFF] flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-white text-sm">
                  Telegram Drive
                </span>
              </div>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Security", "Pricing", "Enterprise"],
              },
              {
                title: "Resources",
                links: ["Docs", "API", "Blog", "Community"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookie Policy", "GDPR"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-medium text-white mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6">
            <p className="text-xs text-gray-600">
              © 2024 Telegram Drive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
