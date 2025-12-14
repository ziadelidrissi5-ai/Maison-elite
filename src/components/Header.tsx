import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User, MapPin } from "lucide-react";

const navLinks = [
  { name: "Canapés", href: "#canapes" },
  { name: "Tables", href: "#tables" },
  { name: "Chaises", href: "#chaises" },
  { name: "Luminaires", href: "#luminaires" },
  { name: "Décoration", href: "#decoration" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-4 lg:gap-6 flex-1">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
              <Menu className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline text-xs tracking-[0.15em] uppercase">Menu</span>
            </button>
            <button className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <a href="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl lg:text-3xl tracking-wide">
              <span className="font-semibold">maison</span>
              <span className="font-light">élite</span>
            </h1>
            <p className="text-[8px] lg:text-[10px] tracking-[0.35em] text-muted-foreground uppercase text-center">Paris</p>
          </a>

          <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
            <button className="hidden sm:flex text-foreground hover:text-muted-foreground transition-colors"><Heart className="w-5 h-5" strokeWidth={1.5} /></button>
            <button className="text-foreground hover:text-muted-foreground transition-colors"><ShoppingBag className="w-5 h-5" strokeWidth={1.5} /></button>
            <button className="hidden lg:flex text-foreground hover:text-muted-foreground transition-colors"><User className="w-5 h-5" strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-background z-50">
            <div className="absolute top-6 left-6">
              <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
                <X className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.15em] uppercase">Fermer</span>
              </button>
            </div>
            <div className="h-full flex items-center justify-center lg:justify-start lg:pl-32 py-20">
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div key={link.name} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <a href={link.href} onClick={() => setIsMenuOpen(false)} className="block font-serif text-5xl lg:text-7xl font-light text-foreground hover:text-accent transition-colors duration-300">
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;