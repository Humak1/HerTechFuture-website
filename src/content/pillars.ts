import { parseCollection, pillarSchema, type Pillar } from "@/lib/schemas";

/**
 * The five things the society offers, taken from the Students' Union listing
 * so the site and the official description say the same thing.
 */
const rawPillars: unknown[] = [
  {
    title: "Workshops & events",
    description:
      "Expert speakers, hands-on sessions and collaborative projects that build real skills, not just attendance.",
  },
  {
    title: "Mentorship",
    description:
      "A developing programme connecting members with industry professionals who have already walked the path.",
  },
  {
    title: "Networking & community",
    description:
      "A community of women who are serious about tech. Share ideas, collaborate, and build relationships that outlast university.",
  },
  {
    title: "Safe spaces",
    description:
      "Dedicated space to unwind, speak honestly about the hard parts, and celebrate the wins without hedging.",
  },
  {
    title: "Your voice matters",
    description:
      "We ask what you want from us and we act on it. The floor is yours -- your ideas shape where the society goes.",
  },
];

export const pillars: Pillar[] = parseCollection(pillarSchema, rawPillars, "pillar");
