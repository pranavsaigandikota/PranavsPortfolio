import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { ImageModal } from "./ImageModal";
import PropTypes from "prop-types";

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

export const ExperienceModal = ({ experience, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
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

    const nextImage = (e) => {
        e.stopPropagation();
        if (experience?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (experience?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
        }
    };

    if (!isOpen || !experience) return null;

    const hasImages = experience.images && experience.images.length > 0;

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
                        background: "rgba(0, 0, 0, 0.8)",
                        backdropFilter: "blur(8px)",
                        padding: "20px",
                    }}
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            "--theme-color": experience.themeColor,
                            width: "100%",
                            maxWidth: "800px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "#000",
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
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 10,
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Image Header Area */}
                        <div className="modal-image-container" style={{ width: "100%", height: "300px", overflow: "hidden", position: "relative", backgroundColor: "#111" }}>
                            {hasImages ? (
                                <>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={experience.images[currentImageIndex]}
                                        alt={`${experience.role} - Image ${currentImageIndex + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="modal-media"
                                        style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "zoom-in" }}
                                        onClick={() => setPreviewImage(experience.images[currentImageIndex])}
                                    />
                                    
                                    {experience.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors"
                                                style={{ border: "none" }}
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors"
                                                style={{ border: "none" }}
                                            >
                                                <ChevronRight size={24} />
                                            </button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                {experience.images.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div style={{ color: experience.themeColor, transform: "scale(2)" }}>
                                        {experience.icon}
                                    </div>
                                </div>
                            )}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "100px",
                                background: "linear-gradient(to top, #000, transparent)",
                            }} />
                        </div>

                        <div className="modal-body" style={{ padding: "2rem" }}>
                            <h2 className="modal-title" style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                {experience.role}
                            </h2>
                            <h3 style={{ fontSize: "1.25rem", color: experience.themeColor, marginBottom: "1rem", fontWeight: "600" }}>
                                {experience.organisation}
                            </h3>

                            <div className="modal-tags" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                <span
                                    className="modal-tag"
                                    style={{
                                        padding: "0.25rem 0.75rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "9999px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem"
                                    }}
                                >
                                    <Calendar size={14} />
                                    {experience.startDate} - {experience.endDate}
                                </span>
                                <span
                                    className="modal-tag"
                                    style={{
                                        padding: "0.25rem 0.75rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        backgroundColor: `${experience.themeColor}20`,
                                        color: experience.themeColor,
                                        borderRadius: "9999px",
                                        border: `1px solid ${experience.themeColor}40`
                                    }}
                                >
                                    {experience.type}
                                </span>
                            </div>

                            <div className="modal-description">
                                <ul style={{ color: "#d1d5db", lineHeight: "1.6", marginBottom: "2rem", listStyleType: "disc", paddingLeft: "1.5rem" }}>
                                    {experience.experiences.map((point, i) => (
                                        <li key={i} style={{ marginBottom: "0.5rem" }}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            {/* Image Modal for Fullscreen View */}
            <ImageModal 
                src={previewImage} 
                alt="Experience Detail" 
                isOpen={!!previewImage} 
                onClose={() => setPreviewImage(null)} 
            />
        </AnimatePresence>
    );
};

ExperienceModal.propTypes = {
    experience: PropTypes.shape({
        role: PropTypes.string,
        organisation: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        type: PropTypes.string,
        themeColor: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        icon: PropTypes.node,
        experiences: PropTypes.arrayOf(PropTypes.string),
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
