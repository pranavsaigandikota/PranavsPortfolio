import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Maximize2 } from "lucide-react";
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

    // Auto-scroll disabled
    /*
    useEffect(() => {
        if (!isOpen || !experience?.images || experience.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isOpen, experience]);
    */

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
                        className="modal-content retro-window"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            "--theme-color": experience.themeColor,
                            width: "100%",
                            maxWidth: "900px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "#000",
                            position: "relative",
                            boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <button
                            className="modal-close"
                            onClick={onClose}
                            style={{
                                position: "absolute",
                                top: "1rem",
                                right: "1rem",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 20,
                                fontFamily: '"Press Start 2P"',
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Image Carousel Section */}
                        {hasImages ? (
                            <div className="relative w-full h-[300px] md:h-[400px] bg-black overflow-hidden group border-b-4 border-white flex items-center justify-center">
                                <motion.img
                                    key={currentImageIndex}
                                    src={experience.images[currentImageIndex]}
                                    alt={`${experience.role} - Image ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.1 }}
                                    className="max-w-full max-h-full object-contain image-pixelated"
                                    style={{ imageRendering: "pixelated", cursor: "zoom-in" }}
                                    onClick={() => setPreviewImage(experience.images[currentImageIndex])}
                                />
                                <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <Maximize2 size={16} color="white" />
                                </div>

                                {experience.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {experience.images.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-3 h-3 border-2 border-white ${idx === currentImageIndex ? 'bg-white' : 'bg-transparent'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-[200px] bg-black flex items-center justify-center border-b-4 border-white">
                                <div style={{ color: experience.themeColor, transform: "scale(2)" }}>
                                    {experience.icon}
                                </div>
                            </div>
                        )}

                        <div className="p-8 font-mono">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2 uppercase" style={{ color: "#fff", textShadow: `2px 2px 0px ${experience.themeColor}`, fontFamily: '"Press Start 2P"' }}>
                                        {experience.role}
                                    </h2>
                                    <h3 className="text-xl text-gray-400 font-bold uppercase">
                                        {experience.organisation}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 border-2 bg-opacity-10"
                                        style={{
                                            borderColor: experience.themeColor,
                                            backgroundColor: `${experience.themeColor}20`,
                                            color: experience.themeColor
                                        }}
                                    >
                                        <Calendar size={16} />
                                        <span className="font-bold uppercase">{experience.startDate} - {experience.endDate}</span>
                                    </div>
                                    <span className="text-sm bg-gray-800 text-white px-2 py-1 uppercase tracking-wider font-bold border border-gray-600">
                                        {experience.type}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-white border-b-4 border-gray-700 pb-2 uppercase" style={{ fontFamily: '"Press Start 2P"', fontSize: '0.8rem' }}>MISSION REPORT</h4>
                                <ul className="space-y-3">
                                    {experience.experiences.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed group">
                                            <span
                                                className="mt-1.5 w-3 h-3 flex-shrink-0 border border-white group-hover:bg-white transition-colors"
                                            ></span>
                                            <span className="uppercase">{point}</span>
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
