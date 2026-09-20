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
    blurb: "BSc Artificial Intelligence and Data Science. Started HTF to build the society she needed in first year.",
  },
  // Add the rest of the committee here, in the same shape.
];

export const committee: CommitteeMember[] = parseCollection(
  committeeMemberSchema,
  rawCommittee,
  "committee member",
);
