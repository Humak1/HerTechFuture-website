import { z } from "zod";

/**
 * VALIDATION LAYER
 * ----------------
 * This is the closest thing this site has to a backend, and it is worth
 * understanding why it is here.
 *
 * The content in `src/content/` is hand-written by a committee member who may
 * not know TypeScript. TypeScript alone would catch a missing field, but it
 * cannot catch a *wrong* one: `start: "7th November"` is a perfectly valid
 * string as far as the compiler is concerned, and it would sail through the
 * build and produce "Invalid Date" on the live site.
 *
 * Zod validates the actual values at the moment the content is loaded. Because
 * every page here is statically generated, "load" happens during `next build`
 * -- so a malformed event fails the build and never reaches production. That
 * is the behaviour you want: loud and early, rather than quiet and live.
 *
 * This is also the exact pattern you would reuse if the site later accepted
 * user input: define a schema, parse at the boundary, and trust nothing that
 * has not been through it.
 */

/** An ISO calendar date, e.g. "2025-11-07". Refined so real dates only. */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format, e.g. 2025-11-07")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Not a real calendar date",
  });

/** A 24-hour clock time, e.g. "11:00". */
const time24 = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:MM format, e.g. 16:30");

/**
 * URL-safe identifier used in the address bar: /events/<slug>.
 * Restricting the character set is a small security measure as well as a
 * tidiness one -- the slug is interpolated into a path, so we never want
 * slashes, dots or spaces in it.
 */
const slug = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Lowercase letters, numbers and single hyphens only",
  );

export const eventSchema = z.object({
  slug,
  title: z.string().min(1).max(120),
  /** One sentence used on cards and in search results. */
  summary: z.string().min(1).max(300),
  date: isoDate,
  startTime: time24,
  endTime: time24,
  location: z.string().min(1),
  /** Guest speaker or partner organisation, when there is one. */
  host: z.string().min(1).optional(),
  /**
   * Where people actually get a ticket. This always points at the Students'
   * Union, never at us -- they handle the attendee data, so we never hold it.
   * `.url()` rejects anything that is not a well-formed absolute URL.
   */
  ticketUrl: z.url().optional(),
  capacity: z.number().int().positive().optional(),
  /** Body copy, one string per paragraph. */
  body: z.array(z.string().min(1)).min(1),
});

export const committeeMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  /** Course title, as they'd write it themselves. */
  studying: z.string().min(1).optional(),
  /** The fun fact from the Instagram cards — the bit people actually read. */
  funFact: z.string().max(200).optional(),
  photo: z
    .string()
    .regex(
      /^\/committee\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/i,
      "Use a path like /committee/huma.png",
    )
    .optional(),
  linkedin: z.url().optional(),
});

export const pillarSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/**
 * `z.infer` derives the TypeScript type from the schema, so the type and the
 * validation can never drift apart. Add a field to the schema and the type
 * updates itself.
 */
export type Event = z.infer<typeof eventSchema>;
export type CommitteeMember = z.infer<typeof committeeMemberSchema>;
export type Pillar = z.infer<typeof pillarSchema>;

/**
 * Parse an array of unknown content against a schema, with an error message
 * that tells you which entry is wrong.
 *
 * Generic over the schema type so it works for events, committee members and
 * anything added later -- one helper rather than three near-identical ones.
 */
export function parseCollection<T extends z.ZodType>(
  schema: T,
  items: unknown[],
  label: string,
): z.infer<T>[] {
  return items.map((item, index) => {
    const result = schema.safeParse(item);

    if (!result.success) {
      // Thrown during `next build`, so a bad entry fails CI rather than
      // rendering broken markup for visitors.
      throw new Error(
        `Invalid ${label} at index ${index}:\n${z.prettifyError(result.error)}`,
      );
    }

    return result.data;
  });
}
