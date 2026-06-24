/**
 * FAQ content. Rendered on the FAQ page (with FAQPage JSON-LD) and selectively
 * on the homepage. Answers reinforce local keywords and NAP.
 */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How much does tree removal cost in Bethlehem, PA?",
    answer:
      "Tree removal cost in Bethlehem depends on the tree's size, location, and how easy it is to access. A small tree in an open yard costs far less than a large tree near a house or power lines. Brian's Landscaping gives free, honest estimates — and because we're a local, family-run business, our prices are typically more reasonable than the big companies. Call (610) 867-7414 for a no-pressure quote.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. We provide free, no-obligation estimates for every service — landscape design, lawn care, mulching, tree removal, tree trimming, stump grinding, and cleanups. We'll visit your property, talk through what you need, and give you a fair, upfront price with no pushy sales tactics.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in Bethlehem, PA and serve the surrounding Lehigh Valley, including Allentown, Easton, Nazareth, Whitehall, Emmaus, Bath, Northampton, Catasauqua, Hellertown, and nearby communities. If you're not sure whether you're in our service area, just give us a call.",
  },
  {
    question: "What are your hours?",
    answer:
      "Our hours are Monday through Friday 7:00 AM – 6:00 PM, Saturday 8:00 AM – 4:00 PM, and we're closed Sunday. Emergency storm cleanup is available outside of normal hours — call (610) 867-7414 and we'll get to you as soon as we safely can.",
  },
  {
    question: "How do I book an appointment or estimate?",
    answer:
      "The easiest way is to call or text us at (610) 867-7414. You can also request a free quote through our online form or book an on-site estimate using our scheduler — pick a day and time that works for you and we'll confirm. We'll follow up to lock in the details.",
  },
  {
    question: "Do you grind the stump after removing a tree?",
    answer:
      "We can. Stump grinding is a separate service, but it pairs perfectly with tree removal — grinding the stump below grade lets you reclaim the space for grass, mulch, or new plantings. Ask us to include stump grinding when you request your estimate.",
  },
  {
    question: "Do you clean up after the work is done?",
    answer:
      "Always. Careful cleanup is something our customers mention again and again in their reviews. We haul away branches, debris, clippings, and grindings, and we blow off walks and driveways so your property is left clean and tidy.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes — Brian's Landscaping is a local, family-run business that carries insurance for the work we perform. We're happy to discuss the details when we provide your estimate so you have complete peace of mind.",
  },
];

/** Smaller, homepage-friendly subset. */
export const homepageFaqs = faqs.slice(0, 5);
