import {
  committeeMemberSchema,
  parseCollection,
  type CommitteeMember,
} from "@/lib/schemas";

/**
 * Committee members are the only real people named on this site.
 *
 * Two rules before you add anyone here:
 *   1. Ask them first. A name and a role on a public page is personal data,
 *      and being publicly associated with a women in tech society is theirs
 *      to consent to, not yours to assume.
 *   2. Take it down promptly when someone steps back from the role.
 *
 * No email addresses, no social handles, no photographs without asking.
 */
const rawCommittee: unknown[] = [
  {
    name: "Huma",
    role: "Founder & Chair",
    studying: "BSc(Hons) Artificial Intelligence and Data Science",
    funFact: "I use my voice to advocate for young people across the UK",
    photo: "/committee/huma.png",
    linkedin: "https://www.linkedin.com/in/huma-k-878392216/",
  },
  // Add the rest of the committee here, in the same shape if needed.
  {
    name: "Faith Fawusi",
    role: "Founder & Treasurer",
    studying: "BS Software Engineering",
    funFact: "I really like farming sim games and pixel art",
    photo: "/committee/faith.png",
    linkedin: "https://www.linkedin.com/in/faith-f-7b553b287/",
  },
  {
    name: "Alishbah Atiq",
    role: "Secretary",
    studying: "BSc(Hons) Mathematics",
    funFact:
      "I like to make art in multiple mediums such as painting, knitting, digital art and pottery",
    photo: "/committee/alishbah.png",
    linkedin: "https://www.linkedin.com/in/alishbah-atiq-a14635388/",
  },
];

export const committee: CommitteeMember[] = parseCollection(
  committeeMemberSchema,
  rawCommittee,
  "committee member",
);
