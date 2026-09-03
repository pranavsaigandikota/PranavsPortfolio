import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import history from "@/data/history.json";

export default function ExperienceExpandable() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const cards = history.map((h) => ({
    title: `${h.role} @ ${h.organisation}`,
    description: `${h.startDate} - ${h.endDate}`,
    src: `/assets/${h.imageSrc}`,
    ctaText: "View",
    ctaLink: h.link || "#",
    content: () => (
      <ul className="list-disc pl-5 space-y-2">
        {h.experiences.map((exp, i) => (
          <li key={i}>{exp}</li>
        ))}
      </ul>
    ),
  }));

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Experience</h2>

      {/* Backdrop */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 shadow"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Experience text */}
              <div className="flex-1 p-6">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-2xl text-neutral-700 dark:text-neutral-200 mb-2"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 italic mb-4"
                >
                  {active.description}
                </motion.p>

                <div className="text-neutral-700 dark:text-neutral-300 space-y-3 text-base overflow-y-auto max-h-72 pr-2">
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </div>

                <motion.a
                  layoutId={`button-${active.title}-${id}`}
                  href={active.ctaLink}
                  target="_blank"
                  className="inline-block mt-6 px-5 py-2 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600"
                >
                  {active.ctaText}
                </motion.a>
              </div>

              {/* Right: Image */}
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="flex-shrink-0 md:w-1/2"
              >
                <img
                  width={400}
                  height={400}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* List view */}
      <ul className="max-w-4xl mx-auto w-full gap-6 flex flex-col">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer shadow-sm"
          >
            {/* Left side: Experience text */}
            <div className="flex-1">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-bold text-lg md:text-xl text-neutral-800 dark:text-neutral-200 mb-2"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 italic mb-3"
              >
                {card.description}
              </motion.p>
              {typeof card.content === "function"
                ? card.content()
                : card.content}
            </div>

            {/* Right side: Image */}
            <motion.div
              layoutId={`image-${card.title}-${id}`}
              className="flex-shrink-0"
            >
              <img
                width={200}
                height={200}
                src={card.src}
                alt={card.title}
                className="h-32 w-32 md:h-40 md:w-40 rounded-lg object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
