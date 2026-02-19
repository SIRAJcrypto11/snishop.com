
"use client";
import { useEffect } from "react";

export default function useScrollAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const hiddenElements = document.querySelectorAll(".fade-in, .reveal-scale, .reveal-item, .section-reveal, .stagger");
        hiddenElements.forEach((el) => observer.observe(el));

        // Cleanup
        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []); // Run once on mount
}
