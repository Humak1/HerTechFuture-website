import { eventSchema, parseCollection, type Event } from "@/lib/schemas";

/**
 * THE EVENT ARCHIVE
 * -----------------
 * Adding an event after you run it is: copy the block below, change the
 * values, commit, push. Vercel rebuilds and deploys automatically. That is the
 * whole workflow, and it is deliberately something a future committee member
 * can do without understanding React.
 *
 * The raw array is typed `unknown[]` on purpose. That forces every entry
 * through the Zod schema below rather than letting TypeScript take the shape
 * on trust -- see the comment at the top of `src/lib/schemas.ts`.
 */
const rawEvents: unknown[] = [
  {
    slug: "hurdle-secure-the-job",
    title: "Hurdle x HerTech Future: Secure the Job",
    summary:
      "A practical session on running an intentional job search, with Nathaniel from Hurdle Community.",
    date: "2026-03-25",
    startTime: "13:00",
    endTime: "15:00",
    location: "Geoffrey Manton 230, Manchester Metropolitan University",
    host: "Nathaniel, founder of Hurdle Community",
    ticketUrl:
      "https://www.theunionmmu.org/groups/hertech-future/events/hurdle-x-her-tech-future-secure-the-job-workshop",
    body: [
      "Job hunting as a student is mostly advice about polishing a CV and then sending it into a void. This session was about the opposite: building a job search you actually run on purpose.",
      "Nathaniel spent two years in private equity and a family office before founding Hurdle Community, which had helped more than twenty-five people into roles in its first four months. He took us through four things: building an intentional job search, understanding the problems you can solve for an employer, building visibility, and the tools worth using.",
      "The through-line was that visibility beats volume. Being findable and specific gets you further than another hundred applications.",
    ],
  },
  {
    slug: "tech-for-tomorrow",
    title: "Tech For Tomorrow: Building a Greener Digital Future",
    summary:
      "An interactive sustainability workshop on eco-innovation and the digital solutions behind it.",
    date: "2025-11-07",
    startTime: "11:00",
    endTime: "13:00",
    location: "Business School 3.14, North Atrium",
    host: "Amani Sheik Ibrahim",
    capacity: 30,
    ticketUrl:
      "https://www.theunionmmu.org/groups/hertech-future/events/tech-for-tomorrow-building-a-greener-digital-future",
    body: [
      "Sustainability gets talked about far more often than it gets built. This workshop went after the practical end of it: creative, tech-driven ways to make sustainability more than a buzzword.",
      "Amani Sheik Ibrahim led an interactive session on eco-innovation and the digital solutions behind environmental progress, with plenty of room to think out loud and argue with each other.",
      "Members came away with ideas they could take straight into their ICE module, which was rather the point.",
    ],
  },
  {
    slug: "social-circle",
    title: "HerTech Future Social Circle",
    summary:
      "An evening of games, conversation and meeting the people you will spend the next three years with.",
    date: "2025-02-21",
    startTime: "16:00",
    endTime: "18:00",
    location: "Meeting Room 3, The Union",
    capacity: 15,
    ticketUrl:
      "https://www.theunionmmu.org/groups/hertech-future/events/hertech-future-social-circle",
    body: [
      "Not every event needs a speaker and a slide deck. This one was about the part that actually keeps people coming back: knowing somebody in the room.",
      "Interactive games, a lot of talking, and fifteen people who did not all know each other at the start. Open to women and non-male-identifying students with an interest in tech.",
    ],
  },
];

/** Validated at module load, which during `next build` means at build time. */
export const events: Event[] = parseCollection(eventSchema, rawEvents, "event");
