"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { PixelHeader } from "@/components/ui/pixel-header";
import { GraduationCap, Award, Trophy, Users, Sparkles, X, Search, FileText } from "lucide-react";
import Link from "next/link";
import { certificationsByProvider, certificationCounts, certificationUrls } from "@/content/certifications";

const collegeGrades = [
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

// Subjects widely considered among the hardest in CS — used to highlight top grades in tough courses
const HARD_SUBJECTS = new Set([
  "Analysis and Design of Algorithms", "Discrete Structures", "Comp. Org. w/ Microcontroller Prog.",
  "Software Engineering", "Automata Theory and Formal Languages", "Programming Languages",
  "Probability and Statistics", "Thesis 1", "Thesis 2", "Artificial Intelligence", "Data Science",
  "CS Elective 3: Machine Learning", "Information Assurance and Security", "Object Oriented Programming",
  "System Analysis and Design", "Cloud Based Application Development",
  "Usability, HCI and User Interaction Design", "Game Programming 2: Advance Game Design",
  "Applied Math for Games", "CS Elective 1: Technopreneurship", "Mobile-based Application Development",
  "Information Management", "Internship",
]);

function getSpotlightGrades() {
  return collegeGrades
    .filter((g) => HARD_SUBJECTS.has(g.subject) && g.grade <= 1.8)
    .sort((a, b) => a.grade - b.grade)
    .slice(0, 12);
}

const TICKER_PHRASE = "AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS";

const accolades = {
  college: {
    honors: [
      "CUM LAUDE with an OVERALL GWA: 1.3 (97%)",
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
      "Outstanding Intern College Award – Seniors' Recognition Rites (2025)",
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
      "Layout Artist Head, College of Engineering & Tech Council, University of St. La Salle (2021)",
      "Layout Artist & Marketing, Maskara Theatre Ensemble (2021)",
      "Lead, Google Developer Student Clubs (2022–2023)",
      "Member and Volunteer, DEVCON Philippines (2023–Present)",
      "Organizer, Google Developer Groups on Campus, University of St. La Salle (2024–Present)",
      "GeeksPH Volunteer, Geeks On A Beach — GOAB7 2024 (2024)",
      "Member, AWS Cloud Club – University of St. La Salle Chapter (2024–Present)",
      "Project Lead, SONDER: Google Dev World Tour, Google Developer Groups on Campus Philippines (2024–Present)",
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
      "Band Member (Since Grade 3)",
      "Choir Member (Since Grade 3)",
      "Vice President – PRISSAAP Region VI",
      "CAT Completer as Cadet Sgt.",
      "BSP Division Advancement Camp Participant",
      "Consistent SGO Officer (Since Grade 4)",
      "Little Mr. St. Francis (2009)",
      "Little Mr. United Nations (2010)",
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

function GradesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLegend, setShowLegend] = useState(false);

  const filteredGrades = useMemo(() => {
    if (!searchQuery.trim()) return collegeGrades;
    const query = searchQuery.toLowerCase();
    return collegeGrades.filter(
      (g) =>
        g.subject.toLowerCase().includes(query) ||
        g.term.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group grades by term
  const groupedGrades = useMemo(() => {
    const groups: Record<string, typeof collegeGrades> = {};
    filteredGrades.forEach((grade) => {
      if (!groups[grade.term]) groups[grade.term] = [];
      groups[grade.term].push(grade);
    });
    return groups;
  }, [filteredGrades]);

  const getGradeColor = (grade: number) => {
    if (grade <= 1.0) return "text-emerald-400 bg-emerald-500/20";
    if (grade <= 1.5) return "text-green-400 bg-green-500/20";
    if (grade <= 2.0) return "text-blue-400 bg-blue-500/20";
    return "text-yellow-400 bg-yellow-500/20";
  };

  // Stats
  const perfectGrades = collegeGrades.filter((g) => g.grade === 1.0).length;
  const avgGrade = (collegeGrades.reduce((sum, g) => sum + g.grade, 0) / collegeGrades.length).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92dvh] bg-zinc-900 border border-zinc-300 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Compact Header with Search */}
            <div className="flex-shrink-0 p-4 sm:p-6 border-b border-zinc-300 dark:border-white/10 bg-zinc-900/80">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold truncate tracking-tight text-white">Full College Transcript</h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">Bachelor of Science in Computer Science • University of St. La Salle</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all flex-shrink-0 touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search curriculum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-zinc-300 dark:border-white/10 focus:border-blue-500/50 focus:outline-none text-sm touch-manipulation transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Compact Stats + Legend Toggle */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-zinc-300 dark:border-white/10 bg-zinc-800/30">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-blue-400 leading-none">{avgGrade}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">GWA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-emerald-400 leading-none">{perfectGrades}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Perfect</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLegend(!showLegend)}
                  className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all touch-manipulation ${showLegend ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  {showLegend ? 'Hide Scale' : 'View Scale'}
                </button>
              </div>

              {/* Collapsible Legend */}
              <AnimatePresence>
                {showLegend && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground px-2 py-1 rounded bg-white/5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> 1.0 = 100%
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground px-2 py-1 rounded bg-white/5">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> 1.1-1.5 = 95%
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground px-2 py-1 rounded bg-white/5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> 1.6-2.0 = 88%
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground px-2 py-1 rounded bg-white/5">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" /> 2.1+ = 85%
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Grades List - Scrollable */}
            <div
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-8 scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {/* Spotlight: highest grades in hardest subjects */}
              {!searchQuery && (
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-4 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Spotlight Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {getSpotlightGrades().map((g) => (
                      <div key={g.subject} className="flex flex-col p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-sm font-semibold text-zinc-300 leading-tight flex-1">{g.subject}</span>
                          <span className={`text-[11px] font-black px-2 py-1 rounded-lg flex-shrink-0 ${getGradeColor(g.grade)}`}>{g.grade.toFixed(1)}</span>
                        </div>
                        <span className="text-[10px] text-zinc-600 mt-2 font-medium tracking-wide">{g.equivalent} Equivalent Score</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All subjects by term */}
              <div className="space-y-10">
                {Object.entries(groupedGrades).map(([term, grades]) => (
                  <div key={term} className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/80 whitespace-nowrap">{term}</span>
                      <div className="h-px w-full bg-white/5" />
                    </div>
                    <div className="divide-y divide-white/[0.03]">
                      {grades.map((grade, idx) => (
                        <div
                          key={`${term}-${idx}`}
                          className="flex items-center justify-between py-3 px-1 group transition-colors"
                        >
                          <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors line-clamp-2 pr-4">{grade.subject}</span>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter hidden sm:inline">{grade.equivalent}</span>
                            <span className={`text-[11px] font-black min-w-[34px] text-center px-1.5 py-1 rounded-lg ${getGradeColor(grade.grade)}`}>
                              {grade.grade.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredGrades.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-sm text-muted-foreground font-medium">No matches found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>

            {/* Compact Footer */}
            <div className="flex-shrink-0 px-6 py-4 bg-zinc-950/80 border-t border-white/5 backdrop-blur-md">
              <p className="text-[10px] text-center font-bold uppercase tracking-widest text-zinc-600">
                Official Records · Class of 2025 · University of St. La Salle
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useCopyMode } from "@/components/copy-mode-provider";

export default function AboutPage() {
  const { copyMode } = useCopyMode();
  const [mounted, setMounted] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showGrades) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGrades]);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="About Gian Aibo" />

      <PixelHeader
        title="Digital Craft & Academic Excellence"
        subtitle={copyMode === "plain"
          ? "I'm Gian Aibo C. Boyero — a Computer Science graduate blending technical precision with high-end creative direction. Currently exploring the intersection of AI, design systems, and luxury interfaces."
          : "GIAN AIBO CHUA BOYERO — Blending technical precision with high-end creative direction. Specializing in AI-driven interfaces and luxury digital experiences."}
        colors={["#3b82f6", "#10b981", "#f59e0b", "#ec4899"]}
        categoryIcon={<GraduationCap className="size-4" />}
        categoryText="Portfolio 2025"
        maxWidth="max-w-7xl"
      />

      {/* Quick Stats — same visual language as Formal Education: colored cards, dot, badges */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/20 bg-blue-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">GWA</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1.3</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">97%</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl p-6 border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Rank</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">#1</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">of 7,042 · 1st Year</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 border border-amber-500/30 dark:border-amber-500/20 bg-amber-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Honors</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">Cum Laude</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium">2025</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-6 border border-violet-500/30 dark:border-violet-500/20 bg-violet-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full" />
                <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Certifications</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">32</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-medium">Google, Microsoft, IBM, Canva, DataCamp, GitHub, YouTube</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education - 4 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            Formal Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 bg-blue-500/10 rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <h3 className="text-lg font-bold">College</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Bachelor of Science in Computer Science • University of St. La Salle • GWA 1.3 (97%)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">With Latin Honors (Cum Laude)</span>
              </div>
              {/* Grades at a glance — highest grades in hardest subjects */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 mb-4">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-0.5">Transcript at a glance</p>
                <p className="text-[10px] text-muted-foreground mb-2">Highest grades in hardest subjects</p>
                <div className="space-y-1.5 text-xs">
                  {getSpotlightGrades().slice(0, 6).map((g, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                      <span className="text-foreground/90 truncate min-w-0">{g.subject}</span>
                      <span className="flex-shrink-0 font-semibold text-blue-600 dark:text-blue-400">{g.grade} ({g.equivalent})</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowGrades(true)}
                  className="mt-3 w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-medium touch-manipulation"
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>View full transcript ({collegeGrades.length} subjects)</span>
                </button>
              </div>
            </div>
            <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/30 dark:border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h3 className="text-lg font-bold">Senior High School</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">STEM • Liceo De La Salle Bacolod</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">With Highest Honors</span>
              </div>
            </div>
            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/30 dark:border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <h3 className="text-lg font-bold">Junior High School</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">With Highest Honors</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">Rank 1 of Batch</span>
              </div>
            </div>
            <div className="bg-pink-500/10 rounded-2xl p-6 border border-pink-500/30 dark:border-pink-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
                <h3 className="text-lg font-bold">Elementary</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold">Batch Valedictorian</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS */}
      <div className="marquee-fade-edges overflow-hidden border-y border-zinc-300 dark:border-white/10 bg-white/[0.02] py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium text-muted-foreground" style={{ "--duration": "45s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" {...(copy === 1 ? { "aria-hidden": true } : {})}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-8">{TICKER_PHRASE}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Awards - 3 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Awards & Achievements
          </h2>

          {/* College — Honors | Awards | Affiliations & Leadership */}
          <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-12">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">College</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-6">University of St. La Salle</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Col 1: Honors + Deans&apos; List */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-blue-500" /> Honors</h4>
                  <div className="space-y-3">
                    {accolades.college.honors.map((h, i) => (
                      <div key={i} className="p-4 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/5 text-sm leading-relaxed">{h}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-blue-500" /> Deans&apos; List</h4>
                  <div className="p-4 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/5">
                    <ul className="text-sm space-y-1.5 text-muted-foreground">
                      {accolades.college.deansList.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Col 2: Awards */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Awards</h4>
                <div className="space-y-3">
                  {(expandedSections.collegeAwards ? accolades.college.awards : accolades.college.awards.slice(0, 5)).map((a, i) => (
                    <div key={i} className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-sm leading-relaxed">{a}</div>
                  ))}
                </div>
                {accolades.college.awards.length > 5 && (
                  <button
                    onClick={() => toggleSection('collegeAwards')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
                  >
                    {expandedSections.collegeAwards ? 'Show Less' : `Show ${accolades.college.awards.length - 5} More`}
                  </button>
                )}
              </div>
              {/* Col 3: Affiliations & Leadership */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-emerald-500" /> Affiliations & Leadership</h4>
                <div className="space-y-3">
                  {(expandedSections.collegeLeadership ? accolades.college.affiliations : accolades.college.affiliations.slice(0, 5)).map((a, i) => (
                    <div key={i} className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm leading-relaxed">{a}</div>
                  ))}
                </div>
                {accolades.college.affiliations.length > 5 && (
                  <button
                    onClick={() => toggleSection('collegeLeadership')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
                  >
                    {expandedSections.collegeLeadership ? 'Show Less' : `Show ${accolades.college.affiliations.length - 5} More`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Other Levels - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Senior High */}
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                Senior High School
              </h3>
              <p className="text-xs text-muted-foreground mb-4">{accolades.seniorHigh.school} — {accolades.seniorHigh.strand}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold mb-2 text-green-600/90 dark:text-green-400/90">Honors</h4>
                  <div className="space-y-2">
                    {accolades.seniorHigh.honors.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                    ))}
                  </div>
                </div>
                {expandedSections.seniorHigh && (
                  <>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-green-600/90 dark:text-green-400/90">Awards</h4>
                      <div className="space-y-2">
                        {accolades.seniorHigh.awards.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-green-600/90 dark:text-green-400/90">Affiliations</h4>
                      <div className="space-y-2">
                        {accolades.seniorHigh.affiliations.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-green-600/90 dark:text-green-400/90">Roles</h4>
                      <div className="space-y-2">
                        {accolades.seniorHigh.roles.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => toggleSection('seniorHigh')}
                className="mt-4 w-full py-2 px-3 rounded-lg border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium transition-all"
              >
                {expandedSections.seniorHigh ? 'Show Less' : `Show ${accolades.seniorHigh.awards.length + accolades.seniorHigh.affiliations.length + accolades.seniorHigh.roles.length} More`}
              </button>
            </div>

            {/* Junior High */}
            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <h3 className="text-lg font-bold mb-2 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                Junior High School
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-xs font-semibold mb-2 text-orange-600/90 dark:text-orange-400/90">Honors</h4>
                  <div className="space-y-2">
                    {accolades.juniorHigh.honors.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                    ))}
                  </div>
                </div>
                {expandedSections.juniorHigh && (
                  <>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-orange-600/90 dark:text-orange-400/90">Awards</h4>
                      <div className="space-y-2">
                        {accolades.juniorHigh.awards.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-orange-600/90 dark:text-orange-400/90">Affiliations & Roles</h4>
                      <div className="space-y-2">
                        {accolades.juniorHigh.roles.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => toggleSection('juniorHigh')}
                className="mt-4 w-full py-2 px-3 rounded-lg border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium transition-all"
              >
                {expandedSections.juniorHigh ? 'Show Less' : `Show ${accolades.juniorHigh.awards.length + accolades.juniorHigh.roles.length} More`}
              </button>
            </div>

            {/* Elementary */}
            <div className="p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5">
              <h3 className="text-lg font-bold mb-2 text-pink-600 dark:text-pink-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />
                Elementary
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-xs font-semibold mb-2 text-pink-600/90 dark:text-pink-400/90">Honors</h4>
                  <div className="space-y-2">
                    {accolades.elementary.honors.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                    ))}
                  </div>
                </div>
                {expandedSections.elementary && (
                  <>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-pink-600/90 dark:text-pink-400/90">Awards</h4>
                      <div className="space-y-2">
                        {accolades.elementary.awards.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-pink-600/90 dark:text-pink-400/90">Affiliations & Roles</h4>
                      <div className="space-y-2">
                        {accolades.elementary.roles.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => toggleSection('elementary')}
                className="mt-4 w-full py-2 px-3 rounded-lg border border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-medium transition-all"
              >
                {expandedSections.elementary ? 'Show Less' : `Show ${accolades.elementary.awards.length + accolades.elementary.roles.length} More`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS */}
      <div className="marquee-fade-edges overflow-hidden border-y border-zinc-300 dark:border-white/10 bg-white/[0.02] py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium text-muted-foreground" style={{ "--duration": "45s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" {...(copy === 1 ? { "aria-hidden": true } : {})}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-8">{TICKER_PHRASE}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-500" />
            Certifications / Trainings
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Verify credentials and badges: <a href="https://linkedin.com/in/aiboboyero" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">linkedin.com/in/aiboboyero</a>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(certificationsByProvider).map(([provider, names]) => {
              const card = {
                Google: "border-blue-500/30 dark:border-blue-500/20 bg-blue-500/10",
                Microsoft: "border-sky-500/30 dark:border-sky-500/20 bg-sky-500/10",
                IBM: "border-violet-500/30 dark:border-violet-500/20 bg-violet-500/10",
                Canva: "border-pink-500/30 dark:border-pink-500/20 bg-pink-500/10",
                DataCamp: "border-orange-500/30 dark:border-orange-500/20 bg-orange-500/10",
                GitHub: "border-slate-500/30 dark:border-slate-500/20 bg-slate-500/10",
                YouTube: "border-red-500/30 dark:border-red-500/20 bg-red-500/10",
              }[provider] || "border-zinc-300 dark:border-white/10 bg-white/5";
              const dot = {
                Google: "bg-blue-500",
                Microsoft: "bg-sky-500",
                IBM: "bg-violet-500",
                Canva: "bg-pink-500",
                DataCamp: "bg-orange-500",
                GitHub: "bg-slate-500",
                YouTube: "bg-red-500",
              }[provider] || "bg-zinc-500";
              return (
                <div key={provider} className={`rounded-2xl p-5 border ${card}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${dot}`} />
                    <h3 className="text-base font-bold">{provider}</h3>
                    <span className="text-xs text-muted-foreground">({certificationCounts[provider] ?? names.length})</span>
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {names.map((name, i) => {
                      const url = certificationUrls[name];
                      return (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-0.5">·</span>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                            >
                              {name}
                            </a>
                          ) : (
                            <span>{name}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-400 dark:border-white/20 bg-white/5 hover:bg-white/10 transition-all">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Grades Modal */}
      <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
    </div>
  );
}
