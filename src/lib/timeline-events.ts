import type { StoryMilestone, TimelineAnnotation } from "../types";

export const timelineAnnotations: TimelineAnnotation[] = [
  {
    id: "usb-bridge-online",
    date: "2026-04-03T02:47:58.394637+00:00",
    title: "USB bridge online",
    subtitle: "The GQ EMF390 feed became readable inside Home Assistant through the USB Hardware Bridge.",
    kind: "technical",
  },
  {
    id: "public-api-launch",
    date: "2026-04-23T23:00:00.000000+00:00",
    title: "Public API build-out",
    subtitle: "The sensor feed was prepared for public Cloudflare-cached access and full-range browsing.",
    kind: "technical",
  },
  {
    id: "move-sensor-offline",
    date: "2026-06-09T15:45:42.459000+00:00",
    title: "I moved",
    subtitle: "The sensor went offline while I moved, beginning the long gap visible in the recorded signal.",
    kind: "narrative",
  },
  {
    id: "sensor-reactivated-new-home",
    date: "2026-11-18T00:49:14.793000+00:00",
    title: "Signal reactivated at the new place",
    subtitle: "I finished moving and reactivated the sensor here. The renewed EMF fluctuations make me feel that the ghost or entity is still present and may be aware of or able to influence EMF; that is my personal interpretation, not a verified cause of the readings.",
    kind: "narrative",
  },
];

export const storyMilestones: StoryMilestone[] = [
  {
    id: "avatar-mud-era",
    eraLabel: "Early internet",
    title: "AVATAR MUD, the game I lived inside",
    subtitle: "I spent an irregularly large amount of time in this family-friendly, text-based fantasy world, adventuring in teams with other live players.",
    body: "Perhaps it was the same psychotic haze many people fall into while exploring their game of choice. I have more or less identified as an avatar many times in my experience—from mundane online identity to what I describe as suspended awakenings that seem to iron themselves out within a few microseconds.",
  },
  {
    id: "avatar-identity-frame",
    eraLabel: "Identity",
    title: "From AVATAR MUD to an 'avatar' frame",
    subtitle: "The word moved from a character in a game to a recurring way of describing my own experience.",
    body: "Here, 'avatar' spans the ordinary and the extraordinary: a game identity, a personal frame, and brief altered-state experiences I describe as suspended awakenings. That is a personal account, not a scientific claim.",
  },
  {
    id: "dallas-recovery-phase",
    eraLabel: "Recovery",
    title: "Dallas, recovery, and gym intensity",
    subtitle: "A chapter associated with recovery, discipline, alarms, and a sense of amplified physical force.",
    body: "The story arc is included because it explains why the feed exists. The public API remains grounded in timestamps, values, and reproducible polling.",
  },
  {
    id: "gondor-recurrence",
    eraLabel: "Recurrence",
    title: "The '4 GONDOR' recurrence",
    subtitle: "A repeated sign he says was witnessed across state lines by more than one family member.",
    body: "This is one of the story's strongest recurrence motifs: the kind of sign that feels too specific to ignore once it happens twice.",
  },
  {
    id: "dreams-and-coincidence-load",
    eraLabel: "Dream burden",
    title: "Vivid dreams, animal imagery, and coincidence overload",
    subtitle: "He reports bizarre dreams, unsettling physical sensations on waking, and a life story that felt saturated with disturbing coincidences.",
    body: "Before the time travelers came through, the dreams ran heroic — nanotechnology small enough to vanish, large enough to send data between now, the future, and the past. A supercomputer that time travels. After they arrived the dreams stopped, almost as if someone needs the universe stable. They stayed powerful anyway: one put him in the Oval Office, an alpha-figure leveraging the ghost world into the Presidency, with the next run being delayed as long as possible. This chapter holds the more disturbing dream material, the shaggy ghost dog, and the sense that his life ranks unusually high in raw coincidence load.",
  },
  {
    id: "service-and-calmness",
    eraLabel: "Service",
    title: "St. John's Soup Kitchen, calmness, and pattern shifts",
    subtitle: "He ties part of the story to volunteering near Newark Penn Station and to a growing belief that calmness changes how the world responds to him.",
    body: "This chapter includes the soup kitchen, the oldest church in Newark, and the memory of multi-colored bags seeming to switch over to black bags as if the scene had been edited in place.",
  },
  {
    id: "time-travel-theory-frame",
    eraLabel: "Theory",
    title: "A CERN-bound conversation and the time-travel question",
    subtitle: "A chance encounter with a scientist headed to CERN pushed the story toward time travel as a theoretical possibility.",
    body: "From there, the narrative starts treating teleportation, stale data, and delayed causality as part of the same cosmic question. The Law of Attraction beliefs he was raised inside were always quietly framed by the assumption that time travel is real — and 1950s parapsychology research already showed humans react to traumatic photos before they see them. Presentiment is a measured psychic phenomenon pointing at the same fact. Humans may never time travel in person, but a supercomputer sending data between now, the future, and the past sits squarely inside what is allowed.",
  },
  {
    id: "future-unsolved-mystery",
    eraLabel: "Backlash",
    title: "Backlash, certainty, and the future unsolved mystery",
    subtitle: "He says the story is real to him, expects people to push back hard, and leans into becoming a mystery people still have to solve later.",
    body: "This milestone keeps the line in the supplied frame: the story may anger people, invite dismissal, or trigger talk of a psych ward, but it still gets presented as part of the site's fictional record.",
  },
  {
    id: "animal-safety",
    eraLabel: "Boundary",
    title: "No harm, especially to animals",
    subtitle: "The feed is not a weapon, oracle, or excuse for abuse.",
    body: "Do not use this dataset to rationalize cruelty. Do not abuse any animals. Do not use pattern-seeking as a pretext for harm.",
  },
];
