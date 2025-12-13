import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci pour votre inscription !", {
        description: "Vous recevrez bientôt nos dernières nouveautés.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Newsletter
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream font-light mb-6">
            Restez informé de nos
            <br />
            <span className="italic">dernières créations</span>
          </h2>
          <p className="text-cream/60 mb-10 max-w-md mx-auto">
            Inscrivez-vous pour recevoir en avant-première nos nouveautés, 
            conseils déco et offres exclusives.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold"
              required
            />
            <Button type="submit" variant="luxury-gold" size="xl">
              S'inscrire
            </Button>
          </form>

          <p className="text-cream/40 text-xs mt-6">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
