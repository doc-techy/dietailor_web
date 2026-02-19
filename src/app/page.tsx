"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Flame, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  User, 
  BarChart3,
  Smartphone,
  ScanBarcode,
  Sparkles,
  MessageCircle,
  Calendar,
  Menu,
  X,
  Clock,
  Code,
  Rocket,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Star,
  Quote,
  Facebook,
  MapPin,
  Phone
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ───────── UI COMPONENTS ───────── */

/* Removed old PhoneMockup & AppWidget components */

const TouchRipple = () => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newRipple = { x: touch.clientX, y: touch.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1000);
    };
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full border-2 border-primary bg-primary/20"
            style={{
              left: r.x - 50,
              top: r.y - 50,
              width: 100,
              height: 100,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const PhoneMockup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden", className)}>
    <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />
      <div className="h-full w-full overflow-y-auto no-scrollbar pt-8 pb-4 px-4">{children}</div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
    </div>
  </div>
);

const AppWidget = ({ title, value, icon: Icon, color = "bg-primary", delay = 0 }: any) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, type: "spring" }}
    whileTap={{ scale: 0.95, rotate: Math.random() * 4 - 2 }}
    className="bg-surface-highlight p-4 rounded-2xl flex items-center justify-between border border-white/5 mb-3 select-none touch-manipulation active:border-primary/50"
  >
    <div className="flex items-center gap-3">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-black", color)}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  </motion.div>
);

/* ───────── SECTIONS ───────── */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Story", href: "#story" },
    { label: "Team", href: "#team" },
    { label: "Mission", href: "#mission" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/40 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-bold text-sm font-syne transition-transform group-hover:scale-110 group-hover:rotate-3">
              D
            </div>
            <span className="font-syne font-bold text-lg text-white">
              Die<span className="text-primary">Tailor</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-outfit font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="hidden md:flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary transition-colors duration-300 group"
            >
              <span className="font-outfit">Get App</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-16 left-0 right-0 z-40 overflow-hidden md:hidden"
          >
            <div className="bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]">
              <div className="px-5 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <span className="font-outfit font-medium text-[15px]">{link.label}</span>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}

                <div className="pt-3 pb-1">
                  <a
                    href="#download"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-white text-black font-bold text-sm py-3 rounded-full hover:bg-primary transition-colors duration-300 font-outfit"
                  >
                    Get the App
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <section id="home" className="relative min-h-[110vh] flex flex-col justify-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left pt-20 lg:pt-0"
        >
          <h1 className="text-[15vw] lg:text-9xl font-syne font-bold leading-[0.8] mb-6 tracking-tighter select-none">
            EAT.<br />
            <span className="text-stroke text-white/10">TRACK.</span><br />
            <span className="hover-glitch inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              REPEAT.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-lg mx-auto lg:mx-0 mb-10 font-outfit px-4 lg:px-0">
            The only nutrition app that isn't boring. Custom bowls, macro tracking, and expert chats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-6 lg:px-0">
            <button className="bg-white text-black h-16 px-8 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Smartphone size={24} />
              App Store
            </button>
            <button className="bg-transparent border border-white/20 h-16 px-8 rounded-full font-bold text-xl hover:bg-white/10 active:scale-95 transition-all">
              Google Play
            </button>
          </div>
        </motion.div>

        {/* MOBILE HERO VISUAL: Floating Phone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:hidden relative flex justify-center mt-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-30 blur-[80px] rounded-full pointer-events-none" />
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-3, -1, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <PhoneMockup className="scale-[0.8]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-syne">Dashboard</h2>
                  <p className="text-xs text-gray-400">Let&apos;s hit those macros.</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
              </div>

              <div className="bg-primary text-black p-5 rounded-[2rem] mb-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold opacity-60 text-xs uppercase">Calories</span>
                    <span className="font-black text-4xl">1,840</span>
                  </div>
                  <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-black w-[75%] h-full rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs font-bold mt-2 opacity-60">
                    <span>Target: 2,400</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-400">Today&apos;s Macros</h3>
              <AppWidget title="Protein" value="145g / 180g" icon={Flame} color="bg-[#FF00FF]" />
              <AppWidget title="Carbs" value="210g / 250g" icon={Zap} color="bg-[#00FFFF]" />
              <AppWidget title="Fats" value="55g / 70g" icon={Heart} color="bg-[#CCFF00]" />

              <div className="mt-4 bg-surface-highlight rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500/20 p-2 rounded-lg text-green-500"><Sparkles size={16} /></div>
                  <span className="font-bold text-sm">AI Suggestion</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  You&apos;re low on protein. Try our <span className="text-white font-bold">Grilled Chicken Bowl</span> for dinner!
                </p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-xs font-bold py-2 rounded-lg mt-3 transition-colors">
                  Order Now
                </button>
              </div>
            </PhoneMockup>
          </motion.div>
        </motion.div>

        {/* DESKTOP HERO VISUAL: Floating Phone */}
        <motion.div 
          style={{ y, rotate }}
          className="hidden lg:block relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20 blur-[80px] rounded-full" />
          <PhoneMockup className="rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
            {/* Fake App UI - Dashboard */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold font-syne">Dashboard</h2>
                <p className="text-xs text-gray-400">Let's hit those macros.</p>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
            </div>

            {/* Daily Stats */}
            <div className="bg-primary text-black p-5 rounded-[2rem] mb-6 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
               <div className="relative z-10">
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold opacity-60 text-xs uppercase">Calories</span>
                   <span className="font-black text-4xl">1,840</span>
                 </div>
                 <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                   <div className="bg-black w-[75%] h-full rounded-full" />
                 </div>
                 <div className="flex justify-between text-xs font-bold mt-2 opacity-60">
                    <span>Target: 2,400</span>
                    <span>75%</span>
                 </div>
               </div>
            </div>

            <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-400">Today's Macros</h3>
            <AppWidget title="Protein" value="145g / 180g" icon={Flame} color="bg-[#FF00FF]" />
            <AppWidget title="Carbs" value="210g / 250g" icon={Zap} color="bg-[#00FFFF]" />
            <AppWidget title="Fats" value="55g / 70g" icon={Heart} color="bg-[#CCFF00]" />
            
            <div className="mt-4 bg-surface-highlight rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-500/20 p-2 rounded-lg text-green-500"><Sparkles size={16} /></div>
                    <span className="font-bold text-sm">AI Suggestion</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                    You're low on protein today. Try our <span className="text-white font-bold">Grilled Chicken Bowl</span> for dinner to hit your goal!
                </p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-xs font-bold py-2 rounded-lg mt-3 transition-colors">
                    Order Now
                </button>
            </div>
          </PhoneMockup>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── CARD STACK SECTION ───────── */

const servicesData = [
  {
    id: 1,
    title: "CUSTOM BOWL",
    desc: "Your macros, your choice. Pick a base, proteins, and sides. We handle the cooking and math.",
    image: "/images/onboard1.jpeg",
    color: "#CCFF00",
    text: "text-black",
    accent: "bg-black text-white"
  },
  {
    id: 2,
    title: "CHEF'S SPECIALS",
    desc: "Limited-time drops that sell out fast. Exotic flavors, zero guilt, and maximum hype.",
    image: "/images/onboard2.jpeg",
    color: "#FF00FF",
    text: "text-white",
    accent: "bg-white text-black"
  },
  {
    id: 3,
    title: "MEAL SUBS",
    desc: "Put your nutrition on autopilot. Fresh meals delivered daily to your door. Cancel anytime.",
    image: "/images/onboard3.jpeg",
    color: "#00FFFF",
    text: "text-black",
    accent: "bg-black text-white"
  },
  {
    id: 4,
    title: "EXPERT CHAT",
    desc: "Real RDs in your pocket 24/7. Get meal audits, motivation, and science-backed advice.",
    image: "/images/onboard4.jpeg",
    color: "#FFFFFF",
    text: "text-black",
    accent: "bg-black text-white"
  }
];

function FeatureSection() {
  const [cards, setCards] = useState(servicesData.map((c, i) => ({ ...c, uniqueId: `${c.id}-0` })));
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleCard();
    }, 4000); 
    return () => clearInterval(interval);
  }, [cycle]);

  const cycleCard = () => {
    setCards((current) => {
      const [top, ...rest] = current;
      const newBottom = { ...top, uniqueId: `${top.id}-${cycle}` };
      return [...rest, newBottom];
    });
    setCycle(c => c + 1);
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="absolute top-10 left-0 right-0 text-center z-10 px-6">
         <motion.h2 
            key={cards[0].id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-syne font-bold uppercase text-white"
         >
            Services That <span className="text-primary">Slap.</span>
         </motion.h2>
      </div>

      {/* GIANT CARD STACK */}
      <div className="w-full h-[80vh] relative flex items-center justify-center perspective-[1200px] mt-10">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
              if (index > 3) return null; 
              
              const isTop = index === 0;
              
              return (
                <motion.div
                  key={card.uniqueId}
                  layout
                  initial={{ scale: 0.8, y: 100, opacity: 0 }}
                  animate={{ 
                    scale: 1 - index * 0.05,
                    y: index * 40,
                    opacity: 1 - index * 0.2,
                    zIndex: cards.length - index,
                    rotateX: index * 5,
                    filter: isTop ? "blur(0px)" : "blur(4px) brightness(0.5)",
                  }}
                  exit={{ 
                    y: 200, 
                    opacity: 0, 
                    scale: 1.1, 
                    rotateX: -10,
                    zIndex: 0 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25,
                    opacity: { duration: 0.4 }
                  }}
                  onClick={() => cycleCard()}
                  className={cn(
                    "absolute w-[85%] md:w-[80%] h-[65vh] md:h-[70vh] rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-black",
                    card.text
                  )}
                  style={{ 
                    backgroundColor: card.color,
                    top: "5%",
                  }}
                >
                  {/* Grid Texture */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.2)_2px,transparent_2px)] bg-[size:40px_40px] pointer-events-none" />

                  {/* Content Container */}
                  <div className="relative z-20 h-full p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12">
                     
                     {/* Text Content */}
                     <div className="flex-1 flex flex-col justify-center relative">
                        {/* Index Number */}
                        <div className="absolute top-0 left-0">
                           <div className={cn("px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase inline-block", card.accent)}>
                              0{card.id} / SERVICE
                           </div>
                        </div>

                        <div className="mt-12 md:mt-0">
                          <h3 className="text-5xl md:text-8xl font-syne font-black uppercase leading-[0.85] mb-6 tracking-tighter break-words">
                            {card.title}
                          </h3>
                          
                          <p className="font-outfit text-lg md:text-2xl font-medium opacity-80 leading-relaxed max-w-lg">
                            {card.desc}
                          </p>
                        </div>
                        
                        <div className="mt-8 md:mt-12">
                           <button className={cn("px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl", card.accent)}>
                              Start Now <ArrowRight size={20} />
                           </button>
                        </div>
                     </div>

                     {/* Image Section */}
                     <div className="flex-1 relative h-[200px] md:h-auto rounded-[2rem] overflow-hidden rotate-2 border-4 border-black/10 shadow-inner group">
                        <Image 
                           src={card.image} 
                           alt={card.title} 
                           fill 
                           className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                           V2.0
                        </div>
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="py-20 md:py-32 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title — visible on mobile above image */}
        <div className="md:hidden mb-10">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-stroke">Origin Story</span>
          </div>
          <h2 className="text-5xl font-syne font-bold uppercase leading-none">
            It Started in a <br />
            <span className="text-secondary">Dorm Room.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, rotate: -5 }}
             whileInView={{ opacity: 1, rotate: -3 }}
             transition={{ duration: 0.8 }}
             className="relative max-w-[440px] mx-auto"
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-14 rounded shadow-2xl transform hover:scale-105 transition-transform duration-500">
               <div className="relative aspect-auto bg-gray-200 overflow-hidden hover:grayscale-0 transition-all duration-500">
                  <Image src="/images/first_bowl.jpeg" alt="The First Bowl" width={440} height={440} className="w-full h-auto" />
                  <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
               </div>
               <div className="absolute bottom-4 left-0 right-0 text-center font-marker text-2xl text-black font-bold font-syne rotate-[-2deg]">
                 The First Bowl (2024)
               </div>
            </div>
            {/* Tape Effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/50 rotate-3 backdrop-blur-sm" />
          </motion.div>

          <div className="relative z-10">
            {/* Title — desktop only (hidden on mobile since it's shown above) */}
            <div className="hidden md:block">
              <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                 <Clock className="w-4 h-4" />
                 <span className="text-stroke">Origin Story</span>
              </div>
              <h2 className="text-7xl font-syne font-bold uppercase mb-6 leading-none">
                It Started in a <br />
                <span className="text-secondary">Dorm Room.</span>
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-400 font-outfit leading-relaxed">
               <p>
                 No fancy kitchen. No venture capital. Just me, a blender, and a mission to stop eating instant noodles every night.
               </p>
               <p>
                 I hacked together a spreadsheet to calculate macros, bought ingredients in bulk, and made this exact bowl you see here. It wasn't pretty, but it hit the macros perfectly.
               </p>
               <div className="pl-4 border-l-2 border-primary">
                 <p className="text-primary font-bold italic">
                   "If I can automate my code, why can't I automate my nutrition?"
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    { name: "Yajnesh Shetty", role: "CEO", icon: "🚀", color: "bg-primary" },
    { name: "Vimal Shetty", role: "CTO", icon: "💻", color: "bg-accent" },
  ];

  return (
    <section id="team" className="py-20 md:py-32 bg-surface-highlight border-y border-white/5 relative overflow-hidden">
       {/* Scrolling Background Text */}
       <div className="absolute top-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none">
          <div className="text-[20vw] font-black font-syne text-white whitespace-nowrap animate-marquee">
             SQUAD GOALS SQUAD GOALS SQUAD GOALS
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-syne font-bold uppercase mb-4">
               The <span className="text-primary">Squad</span>
            </h2>
            <p className="text-gray-400">Built by humans (and a lot of caffeine).</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
            {team.map((member, i) => (
               <motion.div
                 key={i}
                 whileHover={{ y: -10 }}
                 className="group relative bg-black border border-white/10 rounded-3xl p-6 text-center hover:border-primary/50 transition-colors"
               >
                  <div className={cn("w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform", member.color)}>
                     {member.icon}
                  </div>
                  <h3 className="text-xl font-bold font-syne uppercase">{member.name}</h3>
                  <p className="text-sm text-gray-500 font-mono mt-1">{member.role}</p>
                  
                  {/* Stats Bar (RPG Style) */}
                  <div className="mt-4 bg-white/5 rounded-full h-1.5 overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: "80%" }}
                       transition={{ delay: i * 0.2, duration: 1 }}
                       className={cn("h-full", member.color.replace("bg-", "bg-"))} 
                     />
                  </div>
               </motion.div>
            ))}
         </div>
       </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="mission" className="py-32 px-6 bg-black relative">
       <div className="max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="border border-white/20 p-8 md:p-16 rounded-[3rem] bg-gradient-to-b from-surface-highlight to-black relative overflow-hidden"
          >
             
             <h2 className="text-4xl md:text-6xl font-syne font-bold uppercase mb-8 leading-tight">
                Our Mission is to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-pulse">
                   Delete "Dieting"
                </span>
             </h2>
             
             <p className="text-xl md:text-2xl text-gray-300 font-outfit leading-relaxed max-w-2xl mx-auto">
                We believe healthy food shouldn't feel like a punishment. It should be automated, personalized, and honestly? It should <span className="text-primary font-bold">taste illegal.</span>
             </p>

             <div className="mt-12 flex justify-center gap-8 text-white/30">
                <Globe className="w-8 h-8 hover:text-white transition-colors" />
                <Rocket className="w-8 h-8 hover:text-white transition-colors" />
                <Heart className="w-8 h-8 hover:text-white transition-colors" />
             </div>
          </motion.div>
       </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="py-8 md:py-10 bg-primary rotate-[-2deg] scale-110 border-y-2 border-black overflow-hidden relative z-20">
      <div className="flex whitespace-nowrap text-black font-black text-3xl md:text-5xl font-syne animate-marquee-infinite">
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
        <span className="mx-4">NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •</span>
      </div>
    </div>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="py-20 md:py-36 relative overflow-hidden bg-black">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.05] rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Main CTA */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-px rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 blur-sm" />

          <div className="relative bg-[#0A0A0A] rounded-3xl md:rounded-[2.5rem] border border-white/[0.08] overflow-hidden">
            {/* Inner ambient glows */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/[0.08] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-accent/[0.06] blur-[100px] rounded-full pointer-events-none" />

            {/* Mobile Layout */}
            <div className="relative z-10 md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center px-6 pt-10 pb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest font-outfit mb-5">
                  <Smartphone size={12} /> Available Now
                </div>

                <h2 className="text-4xl sm:text-5xl font-syne font-black uppercase leading-[0.9] tracking-tighter mb-4">
                  Ready to{" "}
                  <span className="text-primary">Level Up?</span>
                </h2>

                <p className="text-gray-400 font-outfit text-sm leading-relaxed mb-4 max-w-sm">
                  Join 50,000+ people who&apos;ve already transformed their nutrition. Custom bowls, smart tracking, and expert guidance — all in one app.
                </p>

                {/* Phone Mockup — mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="relative mb-4 -my-[75px] sm:-my-[60px]"
                >
                  <div className="absolute -inset-8 bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 rounded-full blur-[50px] pointer-events-none" />
                  <PhoneMockup className="scale-75 sm:scale-[0.8]">
                    <div className="flex flex-col items-center justify-center h-full -mt-4">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-black font-bold text-lg font-syne">D</div>
                        <span className="font-syne font-bold text-xl text-white">Die<span className="text-primary">Tailor</span></span>
                      </div>
                      <div className="relative">
                        <div className="relative bg-white p-5 rounded-2xl w-[220px] h-[220px] shadow-[0_0_40px_rgba(204,255,0,0.08)]">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <rect x="10" y="10" width="60" height="60" fill="black" rx="4" />
                            <rect x="18" y="18" width="44" height="44" fill="white" rx="2" />
                            <rect x="26" y="26" width="28" height="28" fill="black" rx="2" />
                            <rect x="130" y="10" width="60" height="60" fill="black" rx="4" />
                            <rect x="138" y="18" width="44" height="44" fill="white" rx="2" />
                            <rect x="146" y="26" width="28" height="28" fill="black" rx="2" />
                            <rect x="10" y="130" width="60" height="60" fill="black" rx="4" />
                            <rect x="18" y="138" width="44" height="44" fill="white" rx="2" />
                            <rect x="26" y="146" width="28" height="28" fill="black" rx="2" />
                            <rect x="80" y="10" width="12" height="12" fill="black" />
                            <rect x="100" y="10" width="12" height="12" fill="black" />
                            <rect x="80" y="30" width="12" height="12" fill="black" />
                            <rect x="100" y="40" width="12" height="12" fill="black" />
                            <rect x="80" y="56" width="12" height="12" fill="black" />
                            <rect x="10" y="80" width="12" height="12" fill="black" />
                            <rect x="30" y="80" width="12" height="12" fill="black" />
                            <rect x="56" y="80" width="12" height="12" fill="black" />
                            <rect x="80" y="80" width="12" height="12" fill="black" />
                            <rect x="100" y="80" width="12" height="12" fill="black" />
                            <rect x="130" y="80" width="12" height="12" fill="black" />
                            <rect x="160" y="80" width="12" height="12" fill="black" />
                            <rect x="178" y="80" width="12" height="12" fill="black" />
                            <rect x="80" y="130" width="12" height="12" fill="black" />
                            <rect x="100" y="130" width="12" height="12" fill="black" />
                            <rect x="130" y="130" width="12" height="12" fill="black" />
                            <rect x="160" y="130" width="12" height="12" fill="black" />
                            <rect x="80" y="150" width="12" height="12" fill="black" />
                            <rect x="110" y="150" width="12" height="12" fill="black" />
                            <rect x="140" y="150" width="12" height="12" fill="black" />
                            <rect x="178" y="150" width="12" height="12" fill="black" />
                            <rect x="80" y="178" width="12" height="12" fill="black" />
                            <rect x="130" y="178" width="12" height="12" fill="black" />
                            <rect x="160" y="178" width="12" height="12" fill="black" />
                          </svg>
                          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            <div className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_8px_rgba(204,255,0,0.5)] animate-scan-line" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs font-outfit mt-5 tracking-wider uppercase">Scan to Download</p>
                      <div className="flex items-center gap-3 mt-5">
                        <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold font-outfit uppercase tracking-wider">iOS</div>
                        <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-outfit uppercase tracking-wider">Android</div>
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>

                {/* Store Buttons — mobile */}
                <div className="flex flex-row gap-3 w-full max-w-sm px-2">
                  <motion.a
                    href="#"
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center gap-3 bg-white text-black py-3 px-4 rounded-2xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left min-w-0">
                      <span className="text-[9px] block leading-none opacity-50 font-semibold uppercase tracking-wider font-outfit">Download on the</span>
                      <span className="text-sm font-black font-syne leading-tight">App Store</span>
                    </div>
                  </motion.a>

                  <motion.a
                    href="#"
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center gap-3 bg-white text-black py-3 px-4 rounded-2xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                      <path d="M3.18 23.73c.44.21.96.18 1.37-.07l0 0L22.4 12.87c.46-.27.74-.76.74-1.3s-.28-1.03-.74-1.3L4.55.32C4.14.07 3.62.04 3.18.26 2.74.47 2.47.93 2.47 1.43V22.14c0 .5.27.96.71 1.18z" />
                    </svg>
                    <div className="text-left min-w-0">
                      <span className="text-[9px] block leading-none opacity-50 font-semibold uppercase tracking-wider font-outfit">Get it on</span>
                      <span className="text-sm font-black font-syne leading-tight">Google Play</span>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="relative z-10 hidden md:grid md:grid-cols-2">

              {/* Left: Content */}
              <div className="p-12 lg:p-16 flex flex-col justify-center overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest font-outfit mb-6">
                    <Smartphone size={12} /> Available Now
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-syne font-black uppercase leading-[0.9] tracking-tighter mb-5">
                    Ready to{" "}
                    <span className="text-primary">Level Up?</span>
                  </h2>

                  <p className="text-gray-400 font-outfit text-base leading-relaxed mb-8 max-w-md">
                    Join 50,000+ people who&apos;ve already transformed their nutrition. Custom bowls, smart tracking, and expert guidance — all in one app.
                  </p>

                  {/* Store Buttons — desktop */}
                  <div className="flex flex-row gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex items-center gap-3 bg-white text-black py-3 px-5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(204,255,0,0.2)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex items-center gap-3">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <div className="text-left">
                          <span className="text-[10px] block leading-none opacity-50 font-semibold uppercase tracking-wider font-outfit">Download on the</span>
                          <span className="text-sm font-black font-syne leading-tight">App Store</span>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex items-center gap-3 bg-white text-black py-3 px-5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(204,255,0,0.2)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex items-center gap-3">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                          <path d="M3.18 23.73c.44.21.96.18 1.37-.07l0 0L22.4 12.87c.46-.27.74-.76.74-1.3s-.28-1.03-.74-1.3L4.55.32C4.14.07 3.62.04 3.18.26 2.74.47 2.47.93 2.47 1.43V22.14c0 .5.27.96.71 1.18z" />
                        </svg>
                        <div className="text-left">
                          <span className="text-[10px] block leading-none opacity-50 font-semibold uppercase tracking-wider font-outfit">Get it on</span>
                          <span className="text-sm font-black font-syne leading-tight">Google Play</span>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Right: Phone Mockup — desktop */}
              <div className="relative flex items-center justify-center p-10">
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 6 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-full blur-[60px] pointer-events-none" />
                  <PhoneMockup className="scale-90 lg:scale-100">
                    <div className="flex flex-col items-center justify-center h-full -mt-4">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-black font-bold text-lg font-syne">D</div>
                        <span className="font-syne font-bold text-xl text-white">Die<span className="text-primary">Tailor</span></span>
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-5 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-white p-5 rounded-2xl w-[220px] h-[220px] shadow-[0_0_40px_rgba(204,255,0,0.08)]">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <rect x="10" y="10" width="60" height="60" fill="black" rx="4" />
                            <rect x="18" y="18" width="44" height="44" fill="white" rx="2" />
                            <rect x="26" y="26" width="28" height="28" fill="black" rx="2" />
                            <rect x="130" y="10" width="60" height="60" fill="black" rx="4" />
                            <rect x="138" y="18" width="44" height="44" fill="white" rx="2" />
                            <rect x="146" y="26" width="28" height="28" fill="black" rx="2" />
                            <rect x="10" y="130" width="60" height="60" fill="black" rx="4" />
                            <rect x="18" y="138" width="44" height="44" fill="white" rx="2" />
                            <rect x="26" y="146" width="28" height="28" fill="black" rx="2" />
                            <rect x="80" y="10" width="12" height="12" fill="black" />
                            <rect x="100" y="10" width="12" height="12" fill="black" />
                            <rect x="80" y="30" width="12" height="12" fill="black" />
                            <rect x="100" y="40" width="12" height="12" fill="black" />
                            <rect x="80" y="56" width="12" height="12" fill="black" />
                            <rect x="10" y="80" width="12" height="12" fill="black" />
                            <rect x="30" y="80" width="12" height="12" fill="black" />
                            <rect x="56" y="80" width="12" height="12" fill="black" />
                            <rect x="80" y="80" width="12" height="12" fill="black" />
                            <rect x="100" y="80" width="12" height="12" fill="black" />
                            <rect x="130" y="80" width="12" height="12" fill="black" />
                            <rect x="160" y="80" width="12" height="12" fill="black" />
                            <rect x="178" y="80" width="12" height="12" fill="black" />
                            <rect x="80" y="130" width="12" height="12" fill="black" />
                            <rect x="100" y="130" width="12" height="12" fill="black" />
                            <rect x="130" y="130" width="12" height="12" fill="black" />
                            <rect x="160" y="130" width="12" height="12" fill="black" />
                            <rect x="80" y="150" width="12" height="12" fill="black" />
                            <rect x="110" y="150" width="12" height="12" fill="black" />
                            <rect x="140" y="150" width="12" height="12" fill="black" />
                            <rect x="178" y="150" width="12" height="12" fill="black" />
                            <rect x="80" y="178" width="12" height="12" fill="black" />
                            <rect x="130" y="178" width="12" height="12" fill="black" />
                            <rect x="160" y="178" width="12" height="12" fill="black" />
                          </svg>
                          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            <div className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_8px_rgba(204,255,0,0.5)] animate-scan-line" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs font-outfit mt-5 tracking-wider uppercase">Scan to Download</p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold font-outfit uppercase tracking-wider">iOS</div>
                        <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-outfit uppercase tracking-wider">Android</div>
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ───────── REVIEWS SECTION ───────── */

const reviews = [
  {
    name: "Aarav K.",
    handle: "@aarav_fitlife",
    avatar: "🔥",
    rating: 5,
    text: "Bro this app literally changed how I eat. Custom bowls are insane and the macro tracking is so clean. 10/10 no cap.",
    tag: "Custom Bowls",
    color: "from-[#CCFF00]/20 to-transparent",
    border: "border-[#CCFF00]/20",
  },
  {
    name: "Priya S.",
    handle: "@priya.eats",
    avatar: "✨",
    rating: 5,
    text: "The AI suggestions are scarily accurate. It knew I was low on protein before I did. Also the UI is gorgeous??",
    tag: "AI Powered",
    color: "from-[#FF00FF]/20 to-transparent",
    border: "border-[#FF00FF]/20",
  },
  {
    name: "Rohan M.",
    handle: "@rohan_gains",
    avatar: "💪",
    rating: 5,
    text: "Deleted MyFitnessPal after one week with DieTailor. The meal subscriptions are a game changer for my prep.",
    tag: "Meal Subs",
    color: "from-[#00FFFF]/20 to-transparent",
    border: "border-[#00FFFF]/20",
  },
  {
    name: "Sneha R.",
    handle: "@sneha.wellness",
    avatar: "🌱",
    rating: 5,
    text: "Finally an app that doesn't feel like a chore. The expert chat helped me fix my diet in literally 2 weeks.",
    tag: "Expert Chat",
    color: "from-[#CCFF00]/20 to-transparent",
    border: "border-[#CCFF00]/20",
  },
  {
    name: "Dev P.",
    handle: "@dev.codes.eats",
    avatar: "🚀",
    rating: 4,
    text: "As a developer who forgets to eat — this app is a lifesaver. Auto-scheduling meals + reminders = chef's kiss.",
    tag: "Scheduling",
    color: "from-[#FF00FF]/20 to-transparent",
    border: "border-[#FF00FF]/20",
  },
  {
    name: "Ananya T.",
    handle: "@ananya.fit",
    avatar: "💜",
    rating: 5,
    text: "The chef's specials are UNREAL. Limited drops that actually taste amazing AND hit my macros? Obsessed.",
    tag: "Chef Specials",
    color: "from-[#00FFFF]/20 to-transparent",
    border: "border-[#00FFFF]/20",
  },
];

function ReviewsSection() {
  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-syne font-bold uppercase text-white mb-4">
              Don't Take <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CCFF00 0%, #00FFFF 50%, #FF00FF 100%)" }}>Our Word</span>
            </h2>
            <p className="font-outfit text-lg md:text-xl max-w-3xl mx-auto whitespace-nowrap text-primary font-bold">
              Real people. Real results. Here's what the community can't stop talking about.
            </p>
          </motion.div>
        </div>

        {/* Infinite scrolling reviews row — full viewport width */}
        <div className="w-screen overflow-hidden">
          <div className="flex animate-reviews-scroll hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={i}
                className={cn(
                  "group relative bg-gradient-to-b rounded-2xl p-5 border backdrop-blur-sm cursor-default shrink-0 w-[340px] mx-3",
                  review.color,
                  review.border
                )}
              >
                {/* Quote icon */}
                <Quote size={28} className="absolute top-4 right-4 text-white/[0.04] group-hover:text-white/[0.08] transition-colors" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-syne font-bold text-white text-sm truncate">{review.name}</p>
                    <p className="text-xs text-gray-500 font-outfit">{review.handle}</p>
                  </div>
                  <div className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-outfit">
                    {review.tag}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={13}
                      className={s < review.rating ? "text-[#CCFF00] fill-[#CCFF00]" : "text-white/10"}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-300 font-outfit text-sm leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function Home() {
  return (
    <>
      <div className="grain-overlay" />
      <TouchRipple />
      
      <Navbar />

      {/* Sticky Social Bar — Left side, liquid glass */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 p-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {[
          { icon: Instagram, label: "Instagram", href: "#", color: "text-pink-500", glow: "shadow-[0_0_18px_rgba(236,72,153,0.3)]" },
          { icon: Twitter, label: "Twitter", href: "#", color: "text-sky-400", glow: "shadow-[0_0_18px_rgba(56,189,248,0.3)]" },
          { icon: Linkedin, label: "LinkedIn", href: "#", color: "text-blue-500", glow: "shadow-[0_0_18px_rgba(59,130,246,0.3)]" },
          { icon: Facebook, label: "Facebook", href: "#", color: "text-blue-600", glow: "shadow-[0_0_18px_rgba(37,99,235,0.3)]" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            className={cn("w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110", s.color, s.glow)}
          >
            <s.icon size={20} />
          </a>
        ))}
      </div>

      <Hero />
      <Marquee />
      <FeatureSection />
      <StorySection />
      <MissionSection />
      <TeamSection />
      <DownloadSection />
      <ReviewsSection />

      <footer className="bg-surface border-t border-white/5">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-10">

          {/* Mobile: 2-column grid layout */}
          <div className="md:hidden">
            {/* Brand + Socials — full width */}
            <div className="mb-10">
              <h3 className="text-2xl font-syne font-black uppercase tracking-tight text-white mb-3">
                Die<span className="text-primary">Tailor</span>
              </h3>
              <p className="text-gray-400 font-outfit text-sm leading-relaxed mb-5 max-w-xs">
                Custom nutrition, zero compromise. Eat smarter, feel better, look freaky good.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links — 2 columns */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {["Home", "Services", "Our Story", "The Squad", "Mission"].map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(/\s+/g, "")}`} className="text-gray-400 hover:text-white text-sm font-outfit transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-4">Services</h4>
                <ul className="space-y-3">
                  {["Custom Bowls", "Chef's Specials", "Meal Subs", "Expert Chat", "Macro Tracking"].map((item) => (
                    <li key={item}>
                      <span className="text-gray-400 text-sm font-outfit">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact — full width */}
            <div>
              <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">hello@dietailor.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">Mangalore, Karnataka, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop: 4-column layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-syne font-black uppercase tracking-tight text-white mb-4">
                Die<span className="text-primary">Tailor</span>
              </h3>
              <p className="text-gray-400 font-outfit text-sm leading-relaxed mb-6 max-w-xs">
                Custom nutrition, zero compromise. Eat smarter, feel better, look freaky good.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Services", "Our Story", "The Squad", "Mission"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, "")}`} className="text-gray-400 hover:text-white text-sm font-outfit transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-5">Services</h4>
              <ul className="space-y-3">
                {["Custom Bowls", "Chef's Specials", "Meal Subscriptions", "Expert Chat", "Macro Tracking"].map((item) => (
                  <li key={item}>
                    <span className="text-gray-400 text-sm font-outfit">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-syne font-bold uppercase tracking-widest text-white mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">hello@dietailor.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm font-outfit">Mangalore, Karnataka, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs font-outfit tracking-wide">
              © {new Date().getFullYear()} DieTailor Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-white text-xs font-outfit transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
