"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import { X, Search, ExternalLink } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

// --- PORTAL COMPONENT ---
function Portal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

export const collegeGrades = [
    { term: "Year 1 - 1st Sem", subject: "Art Appreciation", grade: 1.2, equivalent: "98%" },
    { term: "Year 1 - 1st Sem", subject: "Computer Science Fundamentals", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 1st Sem", subject: "Computer Programming 1", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 1st Sem", subject: "Group Guidance 1", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 1st Sem", subject: "Lasallian Spirituality", grade: 1.2, equivalent: "98%" },
    { term: "Year 1 - 1st Sem", subject: "Mathematics in the Modern World", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 1st Sem", subject: "Purposive Communication", grade: 1.2, equivalent: "98%" },
    { term: "Year 1 - 1st Sem", subject: "Wellness and Fitness", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 1st Sem", subject: "Science, Technology and Society", grade: 1.2, equivalent: "98%" },
    { term: "Year 1 - 2nd Sem", subject: "Computer Programming 2", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 2nd Sem", subject: "2D Game Art", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 2nd Sem", subject: "Ethics", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 2nd Sem", subject: "Christian Morality", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 2nd Sem", subject: "Logic", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 2nd Sem", subject: "College Algebra", grade: 1.1, equivalent: "99%" },
    { term: "Year 1 - 2nd Sem", subject: "Team Sports and Rhythmic Activities", grade: 1.0, equivalent: "100%" },
    { term: "Year 1 - 2nd Sem", subject: "Reading Visual Art", grade: 1.1, equivalent: "99%" },
    { term: "Year 2 - 1st Sem", subject: "Data Structures and Algorithms", grade: 2.2, equivalent: "88%" },
    { term: "Year 2 - 1st Sem", subject: "Information Management", grade: 1.4, equivalent: "96%" },
    { term: "Year 2 - 1st Sem", subject: "Object Oriented Programming", grade: 1.4, equivalent: "96%" },
    { term: "Year 2 - 1st Sem", subject: "Discrete Structures", grade: 1.4, equivalent: "96%" },
    { term: "Year 2 - 1st Sem", subject: "System Analysis and Design", grade: 1.1, equivalent: "99%" },
    { term: "Year 2 - 1st Sem", subject: "Trigonometry", grade: 1.3, equivalent: "97%" },
    { term: "Year 2 - 1st Sem", subject: "National Service Training Program 1", grade: 1.0, equivalent: "100%" },
    { term: "Year 2 - 1st Sem", subject: "Swimming and Recreation", grade: 1.0, equivalent: "100%" },
    { term: "Year 2 - 2nd Sem", subject: "Applied Math for Games", grade: 1.5, equivalent: "95%" },
    { term: "Year 2 - 2nd Sem", subject: "Analysis and Design of Algorithms", grade: 1.3, equivalent: "97%" },
    { term: "Year 2 - 2nd Sem", subject: "Comp. Org. w/ Microcontroller Prog.", grade: 1.1, equivalent: "99%" },
    { term: "Year 2 - 2nd Sem", subject: "Software Engineering", grade: 1.2, equivalent: "98%" },
    { term: "Year 2 - 2nd Sem", subject: "Intro to Game Design and Development", grade: 1.1, equivalent: "99%" },
    { term: "Year 2 - 2nd Sem", subject: "Usability, HCI and User Interaction Design", grade: 1.2, equivalent: "98%" },
    { term: "Year 2 - 2nd Sem", subject: "Analytical Geometry and Calculus", grade: 2.2, equivalent: "88%" },
    { term: "Year 2 - 2nd Sem", subject: "National Service Training Program 2", grade: 1.1, equivalent: "99%" },
    { term: "Year 2 - 2nd Sem", subject: "Individual and Dual Sports", grade: 1.2, equivalent: "98%" },
    { term: "Year 3 - 1st Sem", subject: "Cloud Based Application Development", grade: 1.2, equivalent: "98%" },
    { term: "Year 3 - 1st Sem", subject: "CS Elective 1: Technopreneurship", grade: 1.3, equivalent: "97%" },
    { term: "Year 3 - 1st Sem", subject: "Automata Theory and Formal Languages", grade: 1.6, equivalent: "94%" },
    { term: "Year 3 - 1st Sem", subject: "3D Animation", grade: 1.0, equivalent: "100%" },
    { term: "Year 3 - 1st Sem", subject: "Game Programming 2: Advance Game Design", grade: 1.4, equivalent: "96%" },
    { term: "Year 3 - 1st Sem", subject: "GE Electives 3 (Gender and Society)", grade: 1.5, equivalent: "95%" },
    { term: "Year 3 - 1st Sem", subject: "Spirituality in the Workplace", grade: 1.5, equivalent: "95%" },
    { term: "Year 3 - 1st Sem", subject: "Understanding the Self", grade: 1.5, equivalent: "95%" },
    { term: "Year 3 - 2nd Sem", subject: "CS Elective 2: Game Technologies", grade: 1.2, equivalent: "98%" },
    { term: "Year 3 - 2nd Sem", subject: "Social Issues and Professional Practice", grade: 1.0, equivalent: "100%" },
    { term: "Year 3 - 2nd Sem", subject: "Web Development Technologies", grade: 1.0, equivalent: "100%" },
    { term: "Year 3 - 2nd Sem", subject: "Programming Languages", grade: 1.8, equivalent: "92%" },
    { term: "Year 3 - 2nd Sem", subject: "Thesis 1", grade: 1.4, equivalent: "96%" },
    { term: "Year 3 - 2nd Sem", subject: "Probability and Statistics", grade: 1.8, equivalent: "92%" },
    { term: "Year 3 - 2nd Sem", subject: "Public Speaking", grade: 1.1, equivalent: "99%" },
    { term: "Year 3 - Summer", subject: "Internship", grade: 1.7, equivalent: "93%" },
    { term: "Year 4 - 1st Sem", subject: "Networks and Communications", grade: 2.4, equivalent: "86%" },
    { term: "Year 4 - 1st Sem", subject: "Thesis 2", grade: 1.6, equivalent: "94%" },
    { term: "Year 4 - 1st Sem", subject: "Artificial Intelligence", grade: 1.5, equivalent: "95%" },
    { term: "Year 4 - 1st Sem", subject: "Data Science", grade: 1.7, equivalent: "93%" },
    { term: "Year 4 - 1st Sem", subject: "Great Books", grade: 1.2, equivalent: "98%" },
    { term: "Year 4 - 1st Sem", subject: "Life and Works of Rizal", grade: 1.2, equivalent: "98%" },
    { term: "Year 4 - 2nd Sem", subject: "CS Elective 3: Machine Learning", grade: 1.7, equivalent: "93%" },
    { term: "Year 4 - 2nd Sem", subject: "Operating System", grade: 2.1, equivalent: "89%" },
    { term: "Year 4 - 2nd Sem", subject: "Information Assurance and Security", grade: 1.1, equivalent: "99%" },
    { term: "Year 4 - 2nd Sem", subject: "Mobile-based Application Development", grade: 1.7, equivalent: "93%" },
    { term: "Year 4 - 2nd Sem", subject: "Emerging Trends in Computing", grade: 1.9, equivalent: "91%" },
    { term: "Year 4 - 2nd Sem", subject: "The Contemporary World", grade: 1.2, equivalent: "98%" },
    { term: "Year 4 - 2nd Sem", subject: "Readings in Philippine History", grade: 1.5, equivalent: "95%" },
];

export const accolades = {
    college: {
        honors: [
            "Cum Laude with an Overall GWA: 1.3 (97%)",
            "College Awardee - Outstanding Intern Award",
            "Rank 1 — Highest GWA across all colleges and year levels (7,042 students) — University of St. La Salle Recognition Rites, 1st Year (2021-2022)",
        ],
        deansList: [
            "1st Year, 1st Semester - First Honors Deans' List",
            "1st Year, 2nd Semester - First Honors Deans' List",
            "2nd Year, 1st Semester - First Honors Deans' List",
            "2nd Year, 2nd Semester - First Honors Deans' List",
            "3rd Year, 1st Semester - First Honors Deans' List",
            "3rd Year, 2nd Semester - First Honors Deans' List",
            "4th Year, 1st Semester - First Honors Deans' List",
            "4th Year, 2nd Semester - First Honors Deans' List",
        ],
        awards: [
            "Google Developer Groups on Campus USLS - Legacy Builder Award (2025)",
            "Best in 3D Game – Game On USLS (2024) – Group Award",
            "Best in Mobile Game – Game On USLS (2024) – Group Award",
            "Best in Character and Asset Design – Game On USLS (2024) – Group Award",
            "Best in 2D Game Design – Game On USLS (2024) – Group Award",
            "Best in 2D Game – Game On USLS (2024) – Group Award",
            "Best in Game Concept – Game On USLS (2024) – Group Award",
            "Best in Sound Design – Game On USLS (2024) – Group Award",
            "Top 10 – Philippine Creative Awards for Animation and Games from GDAP & Animation Council of the Philippines (2024) – Group Award",
            "Best in Art Direction – Philippine Creative Awards for Animation and Games from GDAP & Animation Council of the Philippines (2024) – Group Award",
            "Most Outstanding Student in the Field of Visual Arts – Animo Grand Cup (2023)",
            "Most Outstanding Student in the Field of Student Service – Corps d' Elite Recipient (2023)",
            "Most Outstanding Special Interest Club President – Corps d' Elite Recipient (2023)",
            "Role Model of the Year – Google Awards (2023)",
            "Google Fellow of the Year – Google Awards (2023)",
            "Distinguished Achievement Award for External Leadership – CS Department (2023)",
            "Best Thesis Project Presenters – CS Department (2023) – Group Award",
            "Best Web Game Technologies Project Concept – CS Department (2023) – Group Award",
            "Most Outstanding Student in the Field of Visual Arts – Corps d' Elite Finalist (2022)",
            "Google Career Certificate Scholar (2022)",
        ],
        affiliations: [
            // Experience / Work
            "Creatives Co-head, Google Developer Groups Bacolod (Nov 2022 – Jul 2025)",
            "Chief Executive Officer, Google Developer Groups on Campus - University of St. La Salle (Sep 2024 – Jun 2025)",
            "President, DEVCON Bacolod (Feb 2024 – Jan 2025)",
            "Creatives & Marketing Intern, Armada Brands (Jun 2024 – Sep 2024)",
            "Chief Executive Officer, Google Developer Student Clubs - University of St. La Salle (Aug 2022 – Jul 2023)",
            "Editor in Chief, Tigris (Jun 2022 – Jun 2023)",
            "Media Officer, Computer Science Society, USLS (Jan 2022 – Jan 2023)",
            "Vice President, Google Developer Student Clubs - University of St. La Salle (Aug 2021 – Jun 2022)",
            "Head of Public Relations Department, College of Engineering and Technology Council - USLS (Nov 2021 – Apr 2022)",
            "Layout Artist Head, College of Engineering and Technology Council - USLS (Aug 2021 – Oct 2021)",
            "Layout Artist, Maskara Theatre Ensemble (Jul 2019 – Mar 2021)",
            "Owner, The Allegiance (Nov 2020 – Dec 2020)",
            "Executive President, Student Government Organization - Holy Infant Academy (Apr 2018 – Mar 2019)",
            // Volunteering
            "Google Developer Groups on Campus Organizer, Google (Sep 2024 – Present)",
            "Google Developer Student Clubs Lead, Google (Aug 2022 – Jun 2023)",
            "Member and Volunteer, DEVCON Philippines (Aug 2023 – Present)",
            "GeeksPH Volunteer, Geeks On A Beach — GOAB7 2024 (Nov 2024)",
            "AWS Cloud Club - USLS Chapter Member, Amazon Web Services (Oct 2024 – Present)",
            "SONDER: Google Dev World Tour - Project Lead, Google Developer Groups on Campus Philippines (Dec 2024 – Present)",
        ],
    },
    seniorHigh: {
        school: "Liceo De La Salle Bacolod Senior High School",
        strand: "Science, Technology, Engineering & Mathematics",
        honors: ["With Highest Honors", "Principal's Distinction Award", "Licean Scholarship Grantee – Scholars who ranked 1st of their batch in Junior High School", "Best Capstone Project – Liceo Research Colloquium"],
        awards: ["Most Outstanding Student in the Field of Culture and Arts – Laurier de La Salle (2021)"],
        affiliations: [
            "Commissioner for Media – Student Activities Council, Department of Public Relations (2019–2020)",
            "Vice Chairperson – Student Activities Council & House of Rheims Committee, Department of Public Relations (2020–2021)",
            "Vice Mayor – Homeroom Class (2019–2020)",
        ],
        roles: [
            "Layout Artist, Photographer, Photo & Video Editor – Mimesis Media Arts Club (2019–2020)",
            "Layout Artist & Graphic Designer – Berdeng Parola, Official Filipino Publication of Liceo de La Salle (2019–2021)",
            "Aspirant – Maskara Theatre Ensemble, University of St. La Salle (2019–2021)",
            "Member – Liceo Dance Club (2020–2021)",
        ],
    },
    juniorHigh: {
        honors: ["First Honors (Rank 1 of the Batch)", "Best in Math", "Best in English", "Best in Filipino", "Best in Science", "Best in Christian Living", "Best in Computer", "Best in MAPEH", "Best in Araling Panlipunan"],
        awards: ["Sen. Manny Villar Sipag Award", "Loyalty Award", "Sports Awardee, Cultural Awardee, Service Awardee"],
        roles: [
            "SGO President (2018–2019)",
            "SGO Executive Committee Excellency Award",
            "PRISSAAP Awardee",
            "PRISSAAP Best Leader Award and Certificate",
            "PRISSAAP Scene Stealer Award and Certificate",
            "PRISSAAP Group Best in Cheers & Yells Award and Certificate",
            "Vice President – PRISSAAP Region VI",
            "CAT Completer as Cadet Sgt.",
            "BSP Division Advancement Camp Participant",
            "Mr. United Nations (2015, 2016)",
            "Mr. Valentines 1st Runner-Up (2015)",
            "Scrabble – DACS Canlaon (Champion)",
            "Volleyball – DACS Canlaon (Silver Medalist)",
            "Badminton – DACS Canlaon (Silver Medalist)",
            "Battle of the Bands – DACS Canlaon (Champion)",
        ],
    },
    elementary: {
        honors: ["First Honors (Rank 1 of the Batch)", "Best in English", "Best in Science", "Best in Math", "Best in Sibika", "Best in Filipino", "Best in HELE"],
        awards: ["Computer Wizard", "Conduct Awardee", "Leadership Awardee", "Sports Awardee", "Artist of the Year", "Singer of the Year", "Cultural Awardee"],
        roles: ["Choir Member", "Band Member", "Vice President – PRISSAAP Region VI", "Most Outstanding Pupil – Private School of the 10th PRISSAAP Educator's Award – Region VI", "Consistent SGO Representative (Grade 4 to Grade 6)"],
    },
    certifications: { google: 11, canva: 3, ibm: 1, microsoft: 7 },
};

export const HARD_SUBJECTS = new Set([
    "Analysis and Design of Algorithms", "Discrete Structures", "Comp. Org. w/ Microcontroller Prog.",
    "Software Engineering", "Automata Theory and Formal Languages", "Programming Languages",
    "Probability and Statistics", "Thesis 1", "Thesis 2", "Artificial Intelligence", "Data Science",
    "CS Elective 3: Machine Learning", "Information Assurance and Security", "Object Oriented Programming",
    "System Analysis and Design", "Cloud Based Application Development",
    "Usability, HCI and User Interaction Design", "Game Programming 2: Advance Game Design",
    "Applied Math for Games", "CS Elective 1: Technopreneurship", "Mobile-based Application Development",
    "Information Management", "Internship",
]);

/**
 * Filters the top grades for "hard" subjects to showcase academic excellence.
 * @returns Sorted array of top performing subjects.
 */
export function getSpotlightGrades() {
    return collegeGrades
        .filter((g) => HARD_SUBJECTS.has(g.subject) && g.grade <= 1.8)
        .sort((a, b) => a.grade - b.grade)
        .slice(0, 12);
}

/**
 * Modal component displaying a comprehensive list of all academic and extracurricular achievements.
 * Uses a portal to render outside the DOM hierarchy for proper z-indexing.
 * 
 * @param props.isOpen - Whether the modal is visible
 * @param props.onClose - Callback to close the modal
 */
export function AchievementArchiveModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }
        return () => {
            unlockScroll();
        };
    }, [isOpen]);

    const allAwards = [
        ...accolades.college.awards,
        ...accolades.seniorHigh.awards,
        ...accolades.seniorHigh.honors.map(h => `[SHS Honors] ${h}`),
        ...accolades.juniorHigh.awards,
        ...accolades.juniorHigh.roles,
        ...accolades.elementary.awards,
        ...accolades.elementary.roles
    ];

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 tracking-tight pointer-events-none" data-lenis-prevent>
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/40 backdrop-blur-3xl pointer-events-auto touch-none"
                        />

                        <m.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            className="relative w-full max-w-2xl h-full max-h-[85vh] bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] pointer-events-auto backdrop-blur-md"
                        >
                            <div className="flex-shrink-0 p-8 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-transparent flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-medium text-zinc-900 dark:text-white tracking-tight">Achievement Archive</h2>
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium uppercase tracking-[0.2em] mt-1 opacity-80">Full History · 2009–2025</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95 group"
                                >
                                    <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-4 no-scrollbar overscroll-behavior-contain" data-lenis-prevent>
                                <div className="space-y-3">
                                    <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-500/80 mb-6">Verified Ledger</h3>
                                    {allAwards.map((award, i) => (
                                        <m.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.005 }}
                                            key={i}
                                            className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04] hover:border-zinc-200 dark:hover:border-white/10 transition-all leading-relaxed flex gap-5 group"
                                        >
                                            <span className="text-zinc-400 dark:text-zinc-700 font-mono text-[10px] pt-1 group-hover:text-blue-500/50 transition-colors">{String(i + 1).padStart(3, '0')}</span>
                                            <span className="font-light tracking-wide">{award}</span>
                                        </m.div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-shrink-0 px-8 py-6 bg-zinc-50 dark:bg-transparent border-t border-zinc-100 dark:border-white/5">
                                <p className="text-[8px] text-center font-medium uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-600">Generated for Gian Aibo Boyero</p>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}

/**
 * Modal component for searching and viewing the full college transcript.
 * Features client-side search and filtering by term.
 * 
 * @param props.isOpen - Whether the modal is visible
 * @param props.onClose - Callback to close the modal
 */
export function GradesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }
        return () => {
            unlockScroll();
        };
    }, [isOpen]);

    const filteredGrades = useMemo(() => {
        if (!searchQuery.trim()) return collegeGrades;
        const query = searchQuery.toLowerCase();
        return collegeGrades.filter(
            (g) =>
                g.subject.toLowerCase().includes(query) ||
                g.term.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const groupedGrades = useMemo(() => {
        const groups: Record<string, typeof collegeGrades> = {};
        filteredGrades.forEach((grade) => {
            if (!groups[grade.term]) groups[grade.term] = [];
            groups[grade.term].push(grade);
        });
        return groups;
    }, [filteredGrades]);

    const getGradeColor = (grade: number) => {
        if (grade <= 1.0) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        if (grade <= 1.5) return "text-green-400 bg-green-400/10 border-green-400/20";
        if (grade <= 2.0) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    };

    const perfectGrades = collegeGrades.filter((g) => g.grade === 1.0).length;
    // const avgGrade = (collegeGrades.reduce((sum, g) => sum + g.grade, 0) / collegeGrades.length).toFixed(2);
    const avgGrade = "1.3";

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 tracking-tight pointer-events-none" data-lenis-prevent>
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/40 backdrop-blur-3xl pointer-events-auto touch-none"
                        />

                        <m.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white/95 dark:bg-zinc-950/95 border border-zinc-200 dark:border-white/10 rounded-[1.5rem] overflow-hidden flex flex-col shadow-2xl pointer-events-auto backdrop-blur-xl"
                        >
                            {/* Compact Header */}
                            <div className="flex-shrink-0 p-5 sm:p-6 border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/20">
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight">Official Grades Transcript</h2>
                                            <a
                                                href="/lib/mygradescollege.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 hover:text-blue-500 dark:hover:text-blue-300 transition-all group/pdf"
                                            >
                                                <span>View Validated PDF</span>
                                                <ExternalLink className="w-3 h-3 group-hover/pdf:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium uppercase tracking-widest">University of St. La Salle - Bacolod · Bachelor of Science in Computer Science</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95 group flex-shrink-0"
                                    >
                                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search subjects or terms..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-black/20 border border-zinc-200 dark:border-white/10 focus:border-blue-500/30 focus:bg-white dark:focus:bg-black/40 focus:outline-none text-sm transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-200"
                                        />
                                    </div>

                                    {/* Compact Stats */}
                                    <div className="flex gap-2 flex-shrink-0">
                                        <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/10 flex flex-col justify-center min-w-[80px]">
                                            <span className="text-[8px] uppercase font-bold text-blue-500/70 dark:text-blue-300/60 tracking-widest mb-0.5">Cumulative GWA</span>
                                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tabular-nums">{avgGrade}</span>
                                        </div>
                                        <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/10 flex flex-col justify-center min-w-[80px]">
                                            <span className="text-[8px] uppercase font-bold text-emerald-600/70 dark:text-emerald-300/60 tracking-widest mb-0.5">Perfect Marks</span>
                                            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{perfectGrades} Subjects</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Refined Legend */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-zinc-200 dark:border-white/5">
                                    <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                                        <span className="text-emerald-400 font-bold">●</span>
                                        <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">1.0 — Excellent</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                                        <span className="text-green-400 font-bold">●</span>
                                        <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">1.1–1.5 — Superior</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                                        <span className="text-blue-400 font-bold">●</span>
                                        <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">1.6–2.0 — Commendable</span>
                                    </div>
                                    <a href="/lib/mygradescollege.pdf" target="_blank" rel="noopener noreferrer" className="sm:hidden ml-auto text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-widest">PDF</a>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-0 space-y-6 bg-transparent scroll-smooth no-scrollbar overscroll-behavior-contain relative" data-lenis-prevent>
                                {Object.entries(groupedGrades).map(([term, grades]) => (
                                    <div key={term} className="space-y-3 pt-5">
                                        <div className="flex items-center gap-3 sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-20 py-2.5 -mx-2 px-2 border-b border-zinc-200 dark:border-white/5">
                                            <span className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500 pl-1">{term}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                            {grades.map((grade, idx) => (
                                                <div
                                                    key={`${term}-${idx}`}
                                                    className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.04] hover:bg-zinc-100 dark:hover:bg-white/[0.04] hover:border-zinc-200 dark:hover:border-white/10 transition-all group"
                                                >
                                                    <div className="min-w-0 pr-3 flex-1">
                                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors block leading-tight mb-0.5 truncate">{grade.subject}</span>
                                                        <span className="text-[9px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-wider group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors font-mono">{grade.equivalent}</span>
                                                    </div>
                                                    <div className={`text-[11px] font-mono font-bold px-2 py-1 rounded-md border tabular-nums whitespace-nowrap ${getGradeColor(grade.grade)}`}>
                                                        {grade.grade.toFixed(1)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {filteredGrades.length === 0 && (
                                    <div className="py-24 text-center">
                                        <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">No subjects found</p>
                                    </div>
                                )}
                                <div className="h-8" />
                            </div>

                            <div className="flex-shrink-0 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center">
                                <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Final Verification · 2025</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500/80">Official Record</span>
                                </div>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}
