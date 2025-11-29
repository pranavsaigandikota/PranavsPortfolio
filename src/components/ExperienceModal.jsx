import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

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

    // Auto-scroll images
    useEffect(() => {
        if (!isOpen || !experience?.images || experience.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isOpen, experience]);

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
                            borderTop: `4px solid ${experience.themeColor}`,
                            width: "100%",
                            maxWidth: "900px",
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
                                background: "rgba(0,0,0,0.5)",
                                border: "none",
                                borderRadius: "50%",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "white",
                                zIndex: 20,
                                transition: "background 0.2s",
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Image Carousel Section */}
                        {hasImages ? (
                            <div className="relative w-full h-[300px] md:h-[400px] bg-black overflow-hidden group">
                                <motion.img
                                    key={currentImageIndex}
                                    src={experience.images[currentImageIndex]}
                                    alt={`${experience.role} - Image ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-contain"
                                />

                                {experience.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                        ) : (
                            <div className="w-full h-[200px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                                <div style={{ color: experience.themeColor, transform: "scale(2)" }}>
                                    {experience.icon}
                                </div>
                            </div>
                        )}

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2 text-white" style={{ color: experience.themeColor }}>
                                        {experience.role}
                                    </h2>
                                    <h3 className="text-xl text-gray-300 font-medium">
                                        {experience.organisation}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 rounded-full border bg-opacity-10"
                                        style={{
                                            borderColor: experience.themeColor,
                                            backgroundColor: `${experience.themeColor}10`,
                                            color: experience.themeColor
                                        }}
                                    >
                                        <Calendar size={16} />
                                        <span className="font-semibold">{experience.startDate} - {experience.endDate}</span>
                                    </div>
                                    <span className="text-sm text-gray-400 uppercase tracking-wider font-bold">
                                        {experience.type}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Key Responsibilities & Achievements</h4>
                                <ul className="space-y-3">
                                    {experience.experiences.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                                            <span
                                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: experience.themeColor }}
                                            ></span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
