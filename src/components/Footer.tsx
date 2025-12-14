import { Instagram, Facebook, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  produits: ["Canapés", "Fauteuils", "Tables", "Chaises", "Luminaires", "Décoration"],
  services: ["Conseil décoration", "Livraison premium", "Service après-vente", "Financement"],
  maison: ["Notre histoire", "Designers", "Savoir-faire", "Engagements", "Carrières"],
};

const Footer = () => {
  return (
    <footer className="bg-secondary/50 pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-border">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <h2 className="font-serif text-3xl tracking-wide"><span className="font-semibold">maison</span><span className="font-light">élite</span></h2>
              <p className="text-[10px] tracking-[0.35em] text-muted-foreground uppercase">Paris</p>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">L'excellence du mobilier français depuis 1960. Design contemporain et savoir-faire artisanal.</p>
            <div className="space-y-3 text-sm">
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"><MapPin className="w-4 h-4" strokeWidth={1.5} /><span>12 Avenue des Champs-Élysées, 75008 Paris</span></a>
              <a href="tel:+33140123456" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"><Phone className="w-4 h-4" strokeWidth={1.5} /><span>+33 1 40 12 34 56</span></a>
              <a href="mailto:contact@maisonelite.fr" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-4 h-4" strokeWidth={1.5} /><span>contact@maisonelite.fr</span></a>
            </div>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">Produits</h3>
            <ul className="space-y-3">{footerLinks.produits.map((link) => <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">Services</h3>
            <ul className="space-y-3">{footerLinks.services.map((link) => <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">La Maison</h3>
            <ul className="space-y-3">{footerLinks.maison.map((link) => <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>)}</ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Maison Élite. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">CGV</a>
            <a href="#" className="hover:text-foreground transition-colors">Confidentialité</a>
          </div>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon className="w-5 h-5" strokeWidth={1.5} /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;