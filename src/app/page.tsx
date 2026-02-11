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
  Globe
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ───────── UI COMPONENTS ───────── */

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
    <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black text-white relative">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
      {/* Content */}
      <div className="h-full w-full overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
        {children}
      </div>
      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full"></div>
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

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 pointer-events-none"
      >
        <div className="pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold">D</div>
          <span className="font-syne font-bold text-lg hidden md:block">DietTailor</span>
        </div>

        <div className="pointer-events-auto flex gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
          >
             <Menu />
          </button>
          <a href="#download" className="hidden md:flex group bg-white text-black font-bold px-6 py-3 rounded-full items-center gap-2 hover:bg-primary transition-colors">
            <span>Get App</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.nav>

      {/* FREAKY MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center p-6"
           >
             <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
             <button 
               onClick={() => setIsOpen(false)}
               className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"
             >
               <X />
             </button>

             <div className="flex flex-col gap-8 text-center">
                {["Home", "Features", "Story", "Team", "Mission"].map((item, i) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-6xl font-syne font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 hover:to-primary active:skew-x-12 transition-transform"
                  >
                    {item}
                  </motion.a>
                ))}
             </div>
           </motion.div>
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
          <div className="inline-block border border-primary text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 hover:bg-primary hover:text-black transition-colors cursor-default animate-pulse">
            v2.0 Now Live
          </div>
          <h1 className="text-[15vw] lg:text-9xl font-syne font-bold leading-[0.8] mb-6 tracking-tighter hover-glitch select-none">
            EAT.<br />
            <span className="text-stroke text-white/10">TRACK.</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
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

        {/* MOBILE HERO VISUAL: Exploded App UI */}
        <div className="lg:hidden relative h-[400px] w-full mt-10 perspective-[1000px]">
           <motion.div 
             animate={{ rotateX: [10, 0, 10], rotateZ: [-5, 5, -5] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="relative z-10 mx-auto w-full max-w-xs"
           >
              {/* Daily Stats Card */}
              <div className="bg-primary text-black p-6 rounded-[2rem] mb-4 relative overflow-hidden shadow-[0_0_30px_rgba(204,255,0,0.3)] transform -rotate-3">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold opacity-60 text-xs uppercase">Calories</span>
                   <span className="font-black text-5xl">1,840</span>
                 </div>
                 <div className="w-full bg-black/10 h-3 rounded-full overflow-hidden">
                   <div className="bg-black w-[75%] h-full rounded-full" />
                 </div>
              </div>
              
              {/* Stacked Widgets */}
              <div className="space-y-2 transform rotate-2">
                <AppWidget title="Protein" value="145g / 180g" icon={Flame} color="bg-[#FF00FF]" delay={0.2} />
                <AppWidget title="Carbs" value="210g / 250g" icon={Zap} color="bg-[#00FFFF]" delay={0.4} />
              </div>
           </motion.div>
        </div>

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
                <h2 className="text-2xl font-bold font-syne">Hello, Vimal!</h2>
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
    image: "/images/onboard1.jpeg",
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
  }, [cycle]); // Re-bind with new cycle value

  const cycleCard = () => {
    setCards((current) => {
      const [top, ...rest] = current;
      // Create a "new" version of the top card with a unique key so it re-enters
      const newBottom = { ...top, uniqueId: `${top.id}-${cycle}` };
      return [...rest, newBottom];
    });
    setCycle(c => c + 1);
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="absolute top-10 left-0 right-0 text-center z-10 px-6">
         <motion.h2 
            key={cards[0].id} // Animate text change subtly or keep static? Keep static title.
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-syne font-bold uppercase text-white"
         >
            Services That <span className="text-transparent bg-clip-text bg-gradient-crazy">Slap.</span>
         </motion.h2>
      </div>

      {/* GIANT CARD STACK */}
      <div className="w-full h-[80vh] relative flex items-center justify-center perspective-[1200px] mt-10">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
              // Only render top 3 for performance and clean look, or all if needed. Render all for smoothness.
              if (index > 3) return null; 
              
              const isTop = index === 0;
              
              return (
                <motion.div
                  key={card.uniqueId} // Crucial: Unique key forces unmount/mount for the cycle effect
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
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, rotate: -5 }}
           whileInView={{ opacity: 1, rotate: -3 }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          {/* Polaroid Frame */}
          <div className="bg-white p-4 pb-16 rounded shadow-2xl transform hover:scale-105 transition-transform duration-500">
             <div className="relative aspect-square bg-gray-200 overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                <Image src="/images/onboard1.jpeg" alt="The First Bowl" fill className="object-cover" />
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
             </div>
             <div className="absolute bottom-4 left-0 right-0 text-center font-marker text-2xl text-black font-bold font-syne rotate-[-2deg]">
               The First Bowl (2020)
             </div>
          </div>
          {/* Tape Effect */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/50 rotate-3 backdrop-blur-sm" />
        </motion.div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
             <Clock className="w-4 h-4" />
             <span className="text-stroke">Origin Story</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-syne font-bold uppercase mb-6 leading-none">
            It Started in a <br />
            <span className="text-secondary">Dorm Room.</span>
          </h2>
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
    </section>
  );
}

function TeamSection() {
  const team = [
    { name: "Vimal", role: "Chief Feeder", icon: "👨‍🍳", color: "bg-primary" },
    { name: "Sarah", role: "Macro Wizard", icon: "🧪", color: "bg-secondary" },
    { name: "Davide", role: "Code Ninja", icon: "💻", color: "bg-accent" },
    { name: "Alex", role: "Hype Beast", icon: "🚀", color: "bg-orange-500" },
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

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
             {/* Coding Terminal Aesthetic */}
             <div className="flex gap-2 mb-8 justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>

             <Code className="w-12 h-12 text-primary mx-auto mb-6 opacity-50" />
             
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
  const { scrollY } = useScroll();
  // Speed up marquee on scroll
  const x = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <div className="py-12 bg-primary rotate-[-2deg] scale-110 border-y-4 border-black overflow-hidden relative z-20">
      <motion.div 
        style={{ x }}
        className="flex whitespace-nowrap text-black font-black text-6xl md:text-8xl font-syne"
      >
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex"
        >
          <span>NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •&nbsp;</span>
          <span>NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •&nbsp;</span>
          <span>NO BORING FOOD • REAL RESULTS • FRESH INGREDIENTS •&nbsp;</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center overflow-hidden relative">
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-8xl font-syne font-bold mb-8 uppercase leading-none">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-crazy">Level Up?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-outfit">
              Join 50,000+ users transforming their bodies with DietTailor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-black px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-transform"
              >
                <span className="text-2xl"></span> App Store
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <span className="text-2xl">▶</span> Play Store
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <>
      <div className="grain-overlay" />
      <TouchRipple />
      
      {/* Custom Cursor Follower (Desktop Only) */}
      <motion.div 
        className="fixed w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.1 }}
      />
      
      <Navbar />
      <Hero />
      <Marquee />
      <FeatureSection />
      <StorySection />
      <TeamSection />
      <MissionSection />
      <DownloadSection />

      <footer className="py-12 border-t border-white/5 bg-black text-center text-gray-500 font-syne text-sm uppercase tracking-widest px-6">
        <p>© {new Date().getFullYear()} DietTailor Inc. Stay Freaky.</p>
      </footer>
    </>
  );
}
