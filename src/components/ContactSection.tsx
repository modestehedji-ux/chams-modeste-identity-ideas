import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { getContactInfo, type ContactInfo } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const { lang, t } = useI18n();
  const [info, setInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContactInfo().then(setInfo).catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {uiStrings["contact.label"][lang]}
          </p>
          <h2 className="heading-lg mb-4">
            {uiStrings["contact.heading.1"][lang]} <span className="text-gradient-gold">{uiStrings["contact.heading.2"][lang]}</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              {info ? t(info.description_fr, info.description_en) : ""}
            </p>
            <div className="flex items-center gap-3 text-foreground">
              <MapPin className="text-primary" size={18} />
              <span className="text-sm">{info ? t(info.location_fr, info.location_en) : ""}</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Mail className="text-primary" size={18} />
              <a href={`mailto:${info?.email || ""}`} className="text-sm hover:text-primary transition-colors">{info?.email}</a>
            </div>
            {info?.linkedin_url && (
              <a href={info.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <svg className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={uiStrings["contact.name"][lang]}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder={uiStrings["contact.email"][lang]}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              rows={4}
              placeholder={uiStrings["contact.message"][lang]}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity"
            >
              {sent ? uiStrings["contact.sent"][lang] : uiStrings["contact.send"][lang]}
              <Send size={14} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
