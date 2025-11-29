import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
};

export const ProjectModal = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Prevent layout shift if scrollbar disappears
            document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0px";
        }
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0px";
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(8px)",
                        padding: "20px",
                    }}
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            borderTop: `4px solid ${project.themeColor}`,
                            width: "100%",
                            maxWidth: "800px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "#1a1a1a",
                            borderRadius: "16px",
                            position: "relative",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <button
                            className="modal-close"
                            onClick={onClose}
                            style={{
                                position: "absolute",
                                top: "1rem",
                                right: "1rem",
                                background: "rgba(255,255,255,0.1)",
                                border: "none",
                                borderRadius: "50%",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "white",
                                zIndex: 10,
                                transition: "background 0.2s",
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div className="modal-image-container" style={{ width: "100%", height: "300px", overflow: "hidden", position: "relative" }}>
                            {project.videoSrc ? (
                                <video
                                    src={project.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="modal-media"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <img
                                    src={project.imageSrc}
                                    alt={project.title}
                                    className="modal-media"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            )}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "100px",
                                background: "linear-gradient(to top, #1a1a1a, transparent)",
                            }} />
                        </div>

                        <div className="modal-body" style={{ padding: "2rem" }}>
                            <h2 className="modal-title" style={{ color: project.themeColor, fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
                                {project.title}
                            </h2>

                            <div className="modal-tags" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                                {project.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="modal-tag"
                                        style={{
                                            backgroundColor: `${project.themeColor}15`,
                                            color: project.themeColor,
                                            border: `1px solid ${project.themeColor}30`,
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "999px",
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <p className="modal-description" style={{ color: "#d1d5db", lineHeight: "1.6", marginBottom: "2rem" }}>{project.description}</p>

                            <div className="modal-links" style={{ display: "flex", gap: "1rem" }}>
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-btn"
                                        style={{
                                            backgroundColor: project.themeColor,
                                            color: "#fff",
                                            padding: "0.75rem 1.5rem",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            fontWeight: "600",
                                            textDecoration: "none",
                                            transition: "transform 0.2s",
                                        }}
                                    >
                                        <ExternalLink size={18} />
                                        Live Demo
                                    </a>
                                )}
                                {project.source && (
                                    <a
                                        href={project.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-btn outline"
                                        style={{
                                            border: `2px solid ${project.themeColor}`,
                                            color: project.themeColor,
                                            padding: "0.75rem 1.5rem",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            fontWeight: "600",
                                            textDecoration: "none",
                                            transition: "background 0.2s",
                                        }}
                                    >
                                        <Github size={18} />
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
