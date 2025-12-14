import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Inscription réussie", { description: "Bienvenue dans l'univers Maison Élite." });
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto text-center">
          <p className="text-background/60 text-xs tracking-[0.25em] uppercase mb-6">Newsletter</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6">Restez Inspiré</h2>
          <p className="text-background/70 leading-relaxed mb-10">Inscrivez-vous pour recevoir nos dernières collections, événements exclusifs et inspirations décoration.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre adresse email" className="flex-1 bg-transparent border border-background/30 px-6 py-4 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors text-sm tracking-wide" required />
            <Button type="submit" className="bg-background text-foreground hover:bg-background/90 transition-all duration-300 px-8 py-6 text-xs tracking-widest uppercase">S'inscrire<ArrowRight className="w-4 h-4 ml-2" /></Button>
          </form>
          <p className="text-background/40 text-xs mt-6">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;