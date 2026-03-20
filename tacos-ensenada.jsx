import { useState, useEffect } from "react";

// ─── FORMSPREE ──────────────────────────────────────────────────
// Replace "YOUR_FORM_ID" with your actual Formspree form ID
// from https://formspree.io
const FORMSPREE_ID = "YOUR_FORM_ID";

const PHOTOS = {
  hero:   "https://images.unsplash.com/photo-1627308595229-7830a5c18e5e?w=1600&q=80",
  about:  "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80",
  gallery:[
    { src:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", label:"Fish Tacos", tag:"🏆 Fan Fave" },
    { src:"https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=80", label:"Shrimp Taco", tag:null },
    { src:"https://images.unsplash.com/photo-1576107232684-1279f8e5e309?w=600&q=80", label:"Seafood Burrito", tag:"🐙 Loaded" },
    { src:"https://images.unsplash.com/photo-1611250188496-e966043a0629?w=600&q=80", label:"Ceviche", tag:"🌶 Fresh" },
    { src:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80", label:"Aguas Frescas", tag:null },
    { src:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&q=80", label:"Watch the Game", tag:"📺 3 TVs" },
  ],
};

const MENU_CATS = [
  { name:"Tacos del Mar", items:[
    { name:"Fish Taco",        desc:"Beer-battered white fish, crema, cabbage, pico de gallo",    price:"$4.50", tag:"🏆 Fan Fave" },
    { name:"Shrimp Taco",      desc:"Garlic shrimp, avocado, chipotle aioli, fresh lime",          price:"$5.00", tag:null },
    { name:"Octopus Taco",     desc:"Tender pulpo, roasted peppers, micro herbs, citrus drizzle",  price:"$5.50", tag:"🌟 Chef's Pick" },
    { name:"Gobernador Taco",  desc:"Shrimp & melted cheese griddled on a corn tortilla",          price:"$5.50", tag:null },
  ]},
  { name:"Burritos & Bowls", items:[
    { name:"Seafood Burrito",  desc:"Octopus, shrimp, scallops, fish, rice, beans, white sauce",  price:"$16.99", tag:"🐙 Loaded" },
    { name:"Asada Burrito",    desc:"Grilled asada, rice, beans, guac, pico de gallo",             price:"$14.99", tag:null },
    { name:"Shrimp Bowl",      desc:"Cilantro rice, black beans, shrimp, corn pico, crema",        price:"$14.99", tag:null },
  ]},
  { name:"Drinks & Bar", items:[
    { name:"Aguachile Verde",  desc:"Shrimp cured in lime & serrano, cucumber, red onion",         price:"$14.99", tag:"🔥 Spicy" },
    { name:"Michelada Clasica",desc:"Tajín-rimmed Modelo with house mix, lime, clam juice",        price:"$10.00", tag:null },
    { name:"Horchata Fresca",  desc:"House-made rice drink with cinnamon & vanilla",               price:"$4.00",  tag:null },
    { name:"Agua de Sandia",   desc:"Fresh watermelon water, lightly salted with tajín",           price:"$4.00",  tag:null },
  ]},
];

const SPECIALS = [
  { day:"Tuesday",  deal:"2-for-1 Fish Tacos", icon:"🌮", color:"#f59e0b" },
  { day:"Thursday", deal:"Taco Trio Special",  icon:"🎉", color:"#10b981" },
  { day:"Weekend",  deal:"Mariscada Platter",  icon:"🦐", color:"#3b82f6" },
];

export default function TacosEnsenada() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm]   = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{background:"#fffaf0", fontFamily:"'Trebuchet MS','Gill Sans',sans-serif"}}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{background: scrolled ? "rgba(255,250,240,0.97)" : "transparent", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none", backdropFilter: scrolled ? "blur(12px)" : "none"}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{background:"#ef4444"}}>🌮</div>
            <div>
              <div className="font-black text-lg tracking-wide leading-none" style={{color:"#ef4444"}}>TACOS</div>
              <div className="font-black text-xs tracking-[0.3em]" style={{color:"#f59e0b"}}>ENSENADA</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home","Menu","Specials","About","Contact"].map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())}
                className="text-xs font-bold tracking-[0.15em] uppercase text-slate-600 hover:text-red-500 transition-colors">
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-2xl text-red-500">☰</button>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{background:"rgba(255,250,240,0.98)"}}>
            {["Home","Menu","Specials","About","Contact"].map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="text-xs font-bold tracking-widest uppercase text-slate-700 hover:text-red-500 text-left">{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={PHOTOS.hero} alt="tacos ensenada" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(160deg, rgba(255,243,199,0.88) 0%, rgba(255,247,237,0.80) 40%, rgba(255,249,240,0.70) 100%)"}} />
        </div>
        <svg className="absolute bottom-0 left-0 w-full z-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z" fill="#fffaf0" />
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase"
              style={{background:"#fef3c7", border:"2px solid #fbbf24", color:"#92400e"}}>
              🌊 Baja-Style · Pico Rivera, CA
            </div>
            <h1 className="font-black leading-none mb-4" style={{fontSize:"clamp(3.5rem,10vw,7rem)", color:"#1c1917"}}>
              TACOS<br/>
              <span style={{color:"transparent", WebkitTextStroke:"3px #ef4444"}}>ENSE</span>
              <span style={{color:"#ef4444"}}>NADA</span>
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-16 rounded-full" style={{background:"#f59e0b"}} />
              <span className="text-sm font-bold tracking-widest uppercase text-slate-500">Est. Pico Rivera</span>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-8" style={{fontFamily:"Georgia,serif"}}>
              Fresh fish. Cold Modelo. 3 screens for the game.<br/>
              Tuesdays are sacred — <strong>2-for-1 fish tacos</strong>, every week.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("specials")} className="px-7 py-4 font-black uppercase tracking-widest text-sm text-white transition-all transform hover:scale-105 shadow-lg"
                style={{background:"#ef4444"}}>
                🌮 Taco Tuesday →
              </button>
              <button onClick={() => scrollTo("contact")} className="px-7 py-4 font-black uppercase tracking-widest text-sm transition-all"
                style={{border:"2px solid #d97706", color:"#92400e"}}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALS */}
      <section id="specials" className="py-24 px-6" style={{background:"#1c1917"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{color:"#f59e0b"}}>Every Week</div>
            <h2 className="text-5xl md:text-6xl font-black uppercase text-white leading-none">Weekly<br/><span style={{color:"#ef4444"}}>Specials</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {SPECIALS.map(s => (
              <div key={s.day} className="p-8 text-center border transition-all hover:scale-105 cursor-pointer"
                style={{background:`${s.color}15`, borderColor:`${s.color}40`}}
                onMouseEnter={e => e.currentTarget.style.borderColor=s.color}
                onMouseLeave={e => e.currentTarget.style.borderColor=`${s.color}40`}>
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{color:s.color}}>{s.day}</div>
                <div className="text-white font-black text-xl uppercase">{s.deal}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{color:"#ef4444"}}>Our Food</div>
              <h2 className="text-5xl font-black uppercase leading-none text-slate-900">The Menu</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {MENU_CATS.map((m,i) => (
                <button key={m.name} onClick={() => setActiveMenu(i)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider transition-all"
                  style={{background: activeMenu===i ? "#ef4444" : "#fef2f2", color: activeMenu===i ? "white" : "#991b1b", border:`2px solid ${activeMenu===i ? "#ef4444" : "#fecaca"}`}}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MENU_CATS[activeMenu].items.map(item => (
              <div key={item.name} className="group p-6 border-2 hover:border-red-300 hover:shadow-md transition-all" style={{borderColor:"#fef2f2"}}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase">{item.name}</h3>
                    {item.tag && <span className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1" style={{background:"#fef3c7",color:"#92400e"}}>{item.tag}</span>}
                  </div>
                  <span className="font-black text-xl ml-4 shrink-0" style={{color:"#ef4444"}}>{item.price}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed" style={{fontFamily:"Georgia,serif"}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / GALLERY */}
      <section id="about" className="py-24 px-6" style={{background:"#fef3c7"}}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center mb-16">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{color:"#92400e"}}>Our Vibe</div>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6" style={{color:"#1c1917"}}>
              Great Tacos.<br/><span style={{color:"#ef4444"}}>Great Game.</span><br/>Great Deals.
            </h2>
            <p className="text-amber-900 leading-relaxed mb-4" style={{fontFamily:"Georgia,serif"}}>
              Walk in and you're greeted by three flat screens showing whatever game is on, a full bar with ice-cold micheladas, and the smell of something really good cooking.
            </p>
            <p className="text-amber-800 leading-relaxed" style={{fontFamily:"Georgia,serif"}}>
              The seafood burrito alone is a reason to visit — loaded with octopus, shrimp, scallops, and fish. Tuesday deals keep regulars coming back weekly.
            </p>
          </div>
          <img src={PHOTOS.about} alt="tacos" className="w-full h-80 object-cover rounded-sm shadow-lg" />
        </div>
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-black uppercase text-center mb-8 text-slate-900">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.gallery.map(g => (
              <div key={g.label} className="relative group overflow-hidden rounded-sm aspect-square">
                <img src={g.src} alt={g.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-red-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
                  <span className="text-white font-black uppercase tracking-wider text-sm">{g.label}</span>
                  {g.tag && <span className="text-yellow-300 text-xs font-bold">{g.tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6" style={{background:"#1c1917"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black uppercase text-white mb-2">Contact Us</h2>
            <p className="text-slate-400 text-sm italic" style={{fontFamily:"Georgia,serif"}}>We'd love to hear from you. Send us a message anytime.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-5">
              {[
                {icon:"📍",t:"Address",lines:["4611 Rosemead Blvd","Pico Rivera, CA 90660"]},
                {icon:"🕐",t:"Hours",  lines:["Mon–Sat: 9am–10pm","Sun: 10am–10pm"]},
                {icon:"📞",t:"Phone",  lines:["(562) 271-7656"]},
                {icon:"📸",t:"Instagram",lines:["@tacos_ensenada_official"]},
              ].map(c => (
                <div key={c.t} className="flex gap-4 items-start p-5 border border-red-900/30 hover:border-red-500 transition-colors"
                  onMouseEnter={e => e.currentTarget.style.borderColor="#ef4444"}
                  onMouseLeave={e => e.currentTarget.style.borderColor="rgba(127,29,29,0.3)"}>
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="text-xs font-black tracking-widest uppercase mb-1" style={{color:"#ef4444"}}>{c.t}</div>
                    {c.lines.map(l => <div key={l} className="text-slate-300 text-sm">{l}</div>)}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {label:"Name", key:"name", type:"text", ph:"Your name"},
                {label:"Email",key:"email",type:"email",ph:"you@email.com"},
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{color:"#ef4444"}}>{f.label}</label>
                  <input required type={f.type} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 focus:border-red-500 outline-none px-4 py-3 text-white text-sm transition-colors rounded-sm"
                    placeholder={f.ph} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{color:"#ef4444"}}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  className="w-full bg-slate-800 border border-slate-600 focus:border-red-500 outline-none px-4 py-3 text-white text-sm resize-none transition-colors rounded-sm"
                  placeholder="Catering inquiries, questions, events…" />
              </div>
              <button type="submit" disabled={status==="sending"}
                className="w-full py-4 text-sm font-black tracking-widest uppercase text-white disabled:opacity-50 transition-all transform hover:scale-105 rounded-sm"
                style={{background:"#ef4444"}}>
                {status==="sending" ? "Sending…" : "Send Message 🌮"}
              </button>
              {status==="success" && <p className="text-red-400 text-sm text-center mt-2">✓ Message sent! Talk soon.</p>}
              {status==="error"   && <p className="text-slate-400 text-sm text-center mt-2">Something went wrong — please call us!</p>}
            </form>
          </div>
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-600 mt-14">© 2025 Tacos Ensenada · Pico Rivera · Taco Tuesday Since Forever</p>
        </div>
      </section>
    </div>
  );
}
