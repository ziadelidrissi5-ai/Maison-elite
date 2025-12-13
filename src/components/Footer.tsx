import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Salon", href: "#" },
      { name: "Salle à manger", href: "#" },
      { name: "Chambre", href: "#" },
      { name: "Bureau", href: "#" },
      { name: "Luminaires", href: "#" },
    ],
    company: [
      { name: "À propos", href: "#about" },
      { name: "Notre histoire", href: "#" },
      { name: "Nos artisans", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Presse", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Livraison", href: "#" },
      { name: "Retours", href: "#" },
      { name: "Garantie", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl tracking-wide text-foreground">
                MAISON<span className="text-gold">.</span>ÉLITE
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Mobilier haut de gamme sélectionné avec passion depuis 2015.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-secondary flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-accent-foreground transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Boutique</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  42 Avenue Montaigne<br />75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-muted-foreground text-sm">
                  +33 1 42 00 00 00
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-muted-foreground text-sm">
                  contact@maisonelite.fr
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Maison Élite. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
