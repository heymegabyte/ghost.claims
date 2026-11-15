export interface NightArchiveArticle {
  slug: string;
  file: string;
  title: string;
  standfirst: string;
  readingMinutes: number;
  sections: readonly { heading?: string; paragraphs: readonly string[]; quote?: string }[];
}

export const articles: readonly NightArchiveArticle[] = [
  {
    slug: "the-panopticon-learned-to-pray",
    file: "FILE 01 // SURVEILLANCE",
    title: "The Panopticon Learned to Pray",
    standfirst: "The old cameras only watched. The new ones want confession.",
    readingMinutes: 7,
    sections: [
      { heading: "The bargain", paragraphs: ["At first, the city asked for faces. A face at the station gate. A face outside the pharmacy. A face reflected in the black glass above the altar of self-checkout. The bargain sounded harmless: surrender a little shape and receive a little safety.", "Then the system learned posture. It learned which shoulders carried debt, which hands trembled before a locked door, which people looked too long at the unmarked van. It stopped recording crime and began recording hesitation. Every pause became a prophecy waiting for an officer to fulfill it."] },
      { heading: "The score after midnight", paragraphs: ["By winter, citizens received private scores after midnight. No accusation, no appeal—only a number falling like ash on the screen. Employers called it trust. Landlords called it stability. The churches called it discernment, because even priests prefer a dashboard to doubt."], quote: "When observation becomes judgment, innocence is only behavior the machine has not misunderstood yet." },
      { heading: "The final camera", paragraphs: ["The final camera was installed inside the imagination. People rehearsed their grief before displaying it. They softened their anger into acceptable shapes. Lovers edited arguments for microphones hidden in household appliances. Nobody knew who was listening, so everyone performed for the possibility.", "That was the true surveillance state: not a room of guards, but a population forced to become its own guard. The machine did not need to silence anyone. It merely taught them to hear the machine breathing whenever they formed an unsanctioned thought."] },
    ],
  },
  {
    slug: "the-clout-war-above-heaven",
    file: "FILE 02 // COSMIC THEATER",
    title: "The Clout War Above Heaven",
    standfirst: "The gods no longer fought for souls. They fought for engagement.",
    readingMinutes: 8,
    sections: [
      { heading: "Metrics for immortals", paragraphs: ["Above the atmosphere, two ancient courts discovered metrics. The Seraphim counted witnesses. The Exiles counted mentions. Miracles were scheduled for maximum reach, eclipses were branded, and every comet carried a sponsor’s burning name.", "Their rivalry could not remain in heaven. Cosmic prestige requires an audience, and an audience eventually requires bodies. So the courts searched human memory for scenes with proven emotional yield: betrayals, trials, falls, resurrections. They selected ordinary people and pressed those old masks over new faces."] },
      { heading: "No one auditioned", paragraphs: ["A nurse was forced to become the Doubter. A child was cast as the Witness. A grieving father woke as the Accuser and found every door arranged like a courtroom. None had auditioned. Their lives were simply inexpensive stages for beings terrified of becoming irrelevant."], quote: "The reenactment is cruel because the ending is known to everyone except the person trapped inside it." },
      { heading: "The scoreboard", paragraphs: ["Coincidence became stage direction. Strangers repeated lines from dreams. Streetlights failed on cue. News alerts arrived like a chorus. Each victim tried to step outside the story, but the courts interpreted resistance as character development and raised the stakes.", "The war’s horror was not that heaven hated humanity. Hatred would have admitted humanity was real. The courts saw people as reach, retention, and reaction: mortal nervous systems rented to keep immortal names circulating.", "Far below, the cameras kept rolling. Far above, the scoreboard refreshed. Between them stood the human being—the only creature in the cosmos forced to suffer events that everyone else consumed as content."] },
    ],
  },
  {
    slug: "bondage-of-the-failed-christ",
    file: "FILE 03 // INHERITED BONDAGE",
    title: "Bondage of the Failed Christ",
    standfirst: "He was not condemned because he failed to save them. He failed because they needed him condemned.",
    readingMinutes: 7,
    sections: [
      { heading: "A savior every generation", paragraphs: ["The village manufactured a savior every generation. They chose someone tender enough to feel everybody’s pain and lonely enough to mistake exploitation for purpose. They praised him publicly, emptied themselves into him privately, and called the exhaustion holy.", "This generation’s Christ could not perform the required ending. He survived the public humiliation. He refused the cross assembled from other people’s expectations. He said salvation without consent was bondage, and sacrifice demanded by spectators was only execution with better branding."] },
      { heading: "Failure as refusal", paragraphs: ["The village named this refusal failure. Families replayed his worst moments at dinner. Officials reconstructed his path through town and assigned citizens to stand where the original witnesses had stood. Children learned the blocking before they learned why the man had screamed."], quote: "A community addicted to rescue will punish the rescuer who survives." },
      { heading: "Beyond the final marker", paragraphs: ["Each reenactment was meant to repair the myth. Instead, it spread the wound. The Accuser took his role home. The Witness forgot how to speak outside testimony. The crowd discovered that chanting together felt almost like innocence.", "At last, the failed Christ understood his task was not to complete the scene but to end its inheritance. He walked beyond the final marker. No thunder answered. No camera followed. The freedom was small, human, and therefore unacceptable to every power that had demanded a cosmic finale.", "Behind him, the village kept performing. Ahead of him waited a life with no audience—terrifying, unfinished, and his."] },
    ],
  },
];
