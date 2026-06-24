/** Customer testimonials. Used on the homepage and the dedicated Reviews page. */

export type Review = {
  author: string;
  rating: number;
  text: string;
  /** Service(s) referenced, for context chips. */
  tags: string[];
};

export const reviews: Review[] = [
  {
    author: "Scott G.",
    rating: 5,
    text: "Brian's Landscaping did a great job grinding out a stump and trimming around two trees. Work and cleanup was done carefully. Communication was very good from estimate until the job was complete. Highly recommend!",
    tags: ["Stump Grinding", "Tree Trimming"],
  },
  {
    author: "Local Guide",
    rating: 5,
    text: "Brian tore out some old shrubs and mulched 14 yards for us and did an awesome job. He will be back for sure.",
    tags: ["Shrub Removal", "Mulching"],
  },
  {
    author: "Andy A.",
    rating: 5,
    text: "Brian promptly gave me a very fair estimate and arrived to do the job when he said he would.",
    tags: ["Free Estimate"],
  },
];
