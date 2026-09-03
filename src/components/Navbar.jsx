import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Flix", href: "/flix" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home">PG</a>
        </motion.div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={link.label === "Flix" ? { color: "#E50914", fontWeight: "900", background: "rgba(229, 9, 20, 0.1)", padding: "0.4rem 0.8rem", borderRadius: "0.25rem", border: "1px solid rgba(229, 9, 20, 0.3)" } : {}}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? "open-1" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open-2" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open-3" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
          >
            <ul className="mobile-menu-links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={link.label === "Flix" ? { color: "#E50914", fontWeight: "900", background: "rgba(229, 9, 20, 0.1)", padding: "0.4rem 0.8rem", borderRadius: "0.25rem", border: "1px solid rgba(229, 9, 20, 0.3)", display: "inline-block" } : {}}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
