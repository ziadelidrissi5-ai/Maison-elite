import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { name: "Canapés", href: "/#canapes" },
  { name: "Tables", href: "/#tables" },
  { name: "Chaises", href: "/#chaises" },
  { name: "Luminaires", href: "/#luminaires" },
  { name: "Décoration", href: "/#decoration" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
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

            <Link to="/" className="flex-shrink-0">
              <h1 className="font-serif text-2xl lg:text-3xl tracking-wide">
                <span className="font-semibold">maison</span>
                <span className="font-light">élite</span>
              </h1>
              <p className="text-[8px] lg:text-[10px] tracking-[0.35em] text-muted-foreground uppercase text-center">Paris</p>
            </Link>

            <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
              <Link to="/wishlist" className="hidden sm:flex text-foreground hover:text-muted-foreground transition-colors relative">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-foreground hover:text-muted-foreground transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="hidden lg:flex text-foreground hover:text-muted-foreground transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-5 h-5" strokeWidth={1.5} />
                </button>
              ) : (
                <Link 
                  to="/auth" 
                  className="hidden lg:flex text-foreground hover:text-muted-foreground transition-colors"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              )}
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
                      <Link to={link.href} onClick={() => setIsMenuOpen(false)} className="block font-serif text-5xl lg:text-7xl font-light text-foreground hover:text-accent transition-colors duration-300">
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: navLinks.length * 0.1 }} className="pt-8 border-t border-border mt-8">
                    {user ? (
                      <button onClick={handleSignOut} className="block font-sans text-xl text-muted-foreground hover:text-foreground transition-colors">
                        Déconnexion
                      </button>
                    ) : (
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block font-sans text-xl text-muted-foreground hover:text-foreground transition-colors">
                        Connexion
                      </Link>
                    )}
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
