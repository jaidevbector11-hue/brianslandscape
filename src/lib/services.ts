/**
 * Service catalog. Each entry powers:
 *  - a dedicated, SEO-optimized service page at /{slug}
 *  - the services overview grid + homepage cards
 *  - Service JSON-LD (areaServed = Lehigh Valley)
 *  - internal links to the gallery (galleryCategory) and quote/booking CTAs
 */

export type ServiceFeature = { title: string; description: string };

export type Service = {
  slug: string;
  /** Short name for cards / nav. */
  name: string;
  /** Even shorter label for compact UI. */
  shortName: string;
  /** Icon key resolved by <ServiceIcon />. */
  icon: string;
  /** One-line teaser for cards. */
  teaser: string;
  /** Primary keyword this page targets. */
  primaryKeyword: string;
  keywords: string[];
  /** <title> — keep under ~60 chars. */
  seoTitle: string;
  /** meta description — keep under ~155 chars. */
  metaDescription: string;
  /** Single H1 for the page. */
  h1: string;
  /** Hero sub-headline. */
  heroBlurb: string;
  /** Opening body paragraphs. */
  overview: string[];
  /** "What's included" bullets. */
  features: ServiceFeature[];
  /** Pricing/estimate note. */
  priceNote: string;
  /** Matching gallery category slug (see lib/gallery.ts). */
  galleryCategory: string;
};

export const services: Service[] = [
  {
    slug: "landscape-design-bethlehem-pa",
    name: "Landscape Design & Architecture",
    shortName: "Landscape Design",
    icon: "design",
    teaser:
      "Custom landscape design that turns your yard into an outdoor space you'll love — planned around your home, budget, and how you live.",
    primaryKeyword: "landscape design Bethlehem PA",
    keywords: [
      "landscape design Bethlehem PA",
      "landscape architecture Lehigh Valley",
      "landscaper Bethlehem PA",
      "backyard design Bethlehem",
    ],
    seoTitle: "Landscape Design in Bethlehem, PA | Brian's Landscaping",
    metaDescription:
      "Custom landscape design & architecture in Bethlehem, PA and the Lehigh Valley. Plant beds, walkways & outdoor spaces. Free honest estimates — call (610) 867-7414.",
    h1: "Landscape Design & Architecture in Bethlehem, PA",
    heroBlurb:
      "Thoughtful, made-to-fit landscape design for Bethlehem and Lehigh Valley homes — beautiful, low-maintenance, and built within your budget.",
    overview: [
      "Great landscaping starts with a great plan. At Brian's Landscaping we design outdoor spaces that fit your home, your lifestyle, and your budget — whether you're refreshing a tired front yard, planning new plant beds, or reimagining the whole property.",
      "We're a local, family-run crew, so you work directly with the people doing the job. We listen first, walk the property with you, and put together a clear plan with honest pricing — no pushy upsells and no big-company markups.",
    ],
    features: [
      {
        title: "On-site design consultation",
        description:
          "We visit your property, talk through your goals, and assess sun, drainage, and soil before recommending anything.",
      },
      {
        title: "Plant & bed planning",
        description:
          "Hardy, regionally appropriate plantings and clean bed layouts designed to look full now and age well over the seasons.",
      },
      {
        title: "Hardscape coordination",
        description:
          "Walkways, edging, and natural stone elements planned to tie the whole yard together.",
      },
      {
        title: "Phased options to fit any budget",
        description:
          "Want to spread the work out? We'll prioritize the highest-impact areas first and phase the rest.",
      },
    ],
    priceNote:
      "Every property is different, so we provide a free, no-obligation design estimate after walking your yard with you.",
    galleryCategory: "landscape-design",
  },
  {
    slug: "lawn-care-bethlehem-pa",
    name: "Landscaping & Lawn Care",
    shortName: "Lawn Care",
    icon: "leaf",
    teaser:
      "Dependable lawn care and general landscaping to keep your property healthy, tidy, and looking its best all season long.",
    primaryKeyword: "lawn care Bethlehem PA",
    keywords: [
      "lawn care Bethlehem PA",
      "landscaping Bethlehem PA",
      "lawn maintenance Lehigh Valley",
      "landscaper Bethlehem PA",
    ],
    seoTitle: "Lawn Care & Landscaping in Bethlehem, PA | Brian's",
    metaDescription:
      "Reliable lawn care & general landscaping in Bethlehem, PA. Mowing, cleanups, bed maintenance & seasonal care. Fair prices, careful cleanup — call (610) 867-7414.",
    h1: "Lawn Care & General Landscaping in Bethlehem, PA",
    heroBlurb:
      "Keep your Bethlehem property healthy and sharp all season with dependable lawn care from a crew that shows up and does it right.",
    overview: [
      "A well-kept lawn is the foundation of great curb appeal. Brian's Landscaping provides reliable lawn care and general landscaping for homes and small properties throughout Bethlehem and the Lehigh Valley.",
      "We treat your property like it's our own — careful mowing and trimming, tidy edges, and a thorough cleanup before we leave. You'll get clear communication from the first estimate through every visit.",
    ],
    features: [
      {
        title: "Mowing, trimming & edging",
        description:
          "Crisp, even cuts with clean edges along walks, beds, and driveways.",
      },
      {
        title: "Bed & border maintenance",
        description:
          "Weeding, refreshing, and keeping plant beds neat and healthy through the season.",
      },
      {
        title: "Seasonal cleanups",
        description:
          "Spring and fall cleanups to clear leaves, debris, and winter damage.",
      },
      {
        title: "Careful, complete cleanup",
        description:
          "We haul off clippings and debris and leave your property tidier than we found it.",
      },
    ],
    priceNote:
      "We'll give you a fair, upfront estimate based on your property size and the level of care you want.",
    galleryCategory: "landscape-design",
  },
  {
    slug: "mulching-bethlehem-pa",
    name: "Mulching",
    shortName: "Mulching",
    icon: "mulch",
    teaser:
      "Fresh mulch that protects your plants, locks in moisture, and instantly sharpens the look of every bed on your property.",
    primaryKeyword: "mulching Bethlehem PA",
    keywords: [
      "mulching Bethlehem PA",
      "mulch installation Lehigh Valley",
      "mulch delivery Bethlehem",
      "landscaping Bethlehem PA",
    ],
    seoTitle: "Mulching in Bethlehem, PA | Brian's Landscaping",
    metaDescription:
      "Professional mulching in Bethlehem, PA & the Lehigh Valley. Bed prep, edging & fresh mulch that protects plants and boosts curb appeal. Free estimate: (610) 867-7414.",
    h1: "Mulching Services in Bethlehem, PA",
    heroBlurb:
      "Fresh, neatly installed mulch that protects your plants and makes your whole yard pop — done quickly and cleanly.",
    overview: [
      "Few things sharpen a property faster than fresh mulch. Beyond the clean, finished look, a good mulch layer holds in moisture, suppresses weeds, and protects roots through the Lehigh Valley's hot summers and cold winters.",
      "Brian's Landscaping handles the whole job — bed prep, clean edging, and even mulch installation around trees, shrubs, and beds. One recent customer had us tear out old shrubs and install 14 yards of mulch; we left it looking sharp and they're already booked for more.",
    ],
    features: [
      {
        title: "Bed preparation & weeding",
        description:
          "We clear weeds and old material so the new mulch goes down clean.",
      },
      {
        title: "Crisp bed edging",
        description:
          "Defined edges give beds that finished, professional look that lasts.",
      },
      {
        title: "Quality mulch, evenly applied",
        description:
          "Consistent depth around trees, shrubs, and beds — no thin spots or sloppy piles against trunks.",
      },
      {
        title: "Full cleanup",
        description:
          "Walks, driveways, and patios are blown clean before we go.",
      },
    ],
    priceNote:
      "Pricing is based on the number of yards of mulch and bed prep needed. Ask for a free measure-up and estimate.",
    galleryCategory: "mulching",
  },
  {
    slug: "tree-removal-bethlehem-pa",
    name: "Tree Removal",
    shortName: "Tree Removal",
    icon: "tree",
    teaser:
      "Safe, careful removal of dead, dying, or hazardous trees — with thorough cleanup so your property is left clean and clear.",
    primaryKeyword: "tree removal Bethlehem PA",
    keywords: [
      "tree removal Bethlehem PA",
      "tree service Lehigh Valley",
      "tree removal cost Bethlehem",
      "hazardous tree removal Bethlehem",
    ],
    seoTitle: "Tree Removal in Bethlehem, PA | Brian's Tree Service",
    metaDescription:
      "Safe tree removal in Bethlehem, PA & the Lehigh Valley. Dead, hazardous & overgrown trees removed with careful cleanup. Free honest estimate — call (610) 867-7414.",
    h1: "Tree Removal in Bethlehem, PA",
    heroBlurb:
      "Safe, careful tree removal for Bethlehem and Lehigh Valley properties — with the careful cleanup our customers rave about.",
    overview: [
      "When a tree is dead, damaged, leaning, or simply in the wrong place, removing it safely takes the right equipment and real experience. Brian's Landscaping removes trees of all sizes for homeowners across Bethlehem and the Lehigh Valley.",
      "Safety and cleanup come first. We protect the surrounding yard, take the tree down in a controlled way, and clear the debris so you'd never know we were there — except for the problem tree that's gone. Need the stump gone too? We handle stump grinding as well.",
    ],
    features: [
      {
        title: "Safe, controlled takedowns",
        description:
          "Trees removed section by section when needed to protect your home, fences, and landscaping.",
      },
      {
        title: "Hazardous & storm-damaged trees",
        description:
          "Leaning, split, or storm-damaged trees assessed and removed before they cause damage.",
      },
      {
        title: "Complete debris removal",
        description:
          "Branches, trunk, and limbs hauled away — careful cleanup is what our reviews are built on.",
      },
      {
        title: "Stump grinding available",
        description:
          "Pair removal with stump grinding to reclaim the space completely.",
      },
    ],
    priceNote:
      "Tree removal cost depends on size, location, and access. We provide free, honest, no-pressure estimates — often more reasonable than the big companies.",
    galleryCategory: "tree-removal",
  },
  {
    slug: "tree-trimming-bethlehem-pa",
    name: "Tree Trimming & Pruning",
    shortName: "Tree Trimming",
    icon: "scissors",
    teaser:
      "Expert trimming and pruning to keep your trees healthy, safe, and shaped — protecting your home and improving your view.",
    primaryKeyword: "tree trimming Bethlehem PA",
    keywords: [
      "tree trimming Bethlehem PA",
      "tree pruning Lehigh Valley",
      "tree service Lehigh Valley",
      "tree trimming near me Bethlehem",
    ],
    seoTitle: "Tree Trimming & Pruning in Bethlehem, PA | Brian's",
    metaDescription:
      "Expert tree trimming & pruning in Bethlehem, PA. Shape trees, clear hazards & boost health with careful cleanup. Free estimate from Brian's — call (610) 867-7414.",
    h1: "Tree Trimming & Pruning in Bethlehem, PA",
    heroBlurb:
      "Healthy, well-shaped trees and a safer property — careful trimming and pruning from a local crew you can trust.",
    overview: [
      "Regular trimming keeps your trees healthy, safe, and looking their best. Brian's Landscaping prunes and trims trees and shrubs throughout Bethlehem and the Lehigh Valley — removing dead or hazardous limbs, shaping growth, and clearing branches away from roofs, wires, and walkways.",
      "Our customers consistently mention how careful we are. As one put it, we did 'a great job grinding out a stump and trimming around two trees' with cleanup 'done carefully' and excellent communication start to finish.",
    ],
    features: [
      {
        title: "Crown thinning & shaping",
        description:
          "Selective pruning that improves health and structure without over-cutting.",
      },
      {
        title: "Deadwood & hazard removal",
        description:
          "Dead, broken, or rubbing limbs removed before they fall.",
      },
      {
        title: "Clearance trimming",
        description:
          "Branches cleared from roofs, gutters, driveways, and sightlines.",
      },
      {
        title: "Shrub trimming & careful cleanup",
        description:
          "Shrubs shaped and all trimmings cleaned up and hauled away.",
      },
    ],
    priceNote:
      "Trimming estimates are free and based on the number, size, and access of the trees involved.",
    galleryCategory: "tree-removal",
  },
  {
    slug: "stump-grinding-lehigh-valley",
    name: "Stump Grinding",
    shortName: "Stump Grinding",
    icon: "stump",
    teaser:
      "Grind out unsightly stumps below grade so you can reclaim your yard, plant grass, or finish a clean landscaping project.",
    primaryKeyword: "stump grinding Lehigh Valley",
    keywords: [
      "stump grinding Lehigh Valley",
      "stump removal Bethlehem PA",
      "stump grinding Bethlehem PA",
      "tree service Lehigh Valley",
    ],
    seoTitle: "Stump Grinding in the Lehigh Valley | Brian's Landscaping",
    metaDescription:
      "Stump grinding across the Lehigh Valley & Bethlehem, PA. Grind stumps below grade & reclaim your yard with careful cleanup. Free estimate — call (610) 867-7414.",
    h1: "Stump Grinding in the Lehigh Valley",
    heroBlurb:
      "Reclaim your yard — we grind stumps below grade and clean up completely, so the eyesore is gone for good.",
    overview: [
      "An old stump is more than an eyesore — it can sprout new growth, attract pests, and get in the way of mowing or new landscaping. Brian's Landscaping grinds stumps below grade for homeowners throughout the Lehigh Valley and Bethlehem area.",
      "We grind the stump down, clean up the grindings, and leave the area ready for grass, mulch, or a new plant bed. Customers regularly highlight our careful work and clean job sites — exactly what you want when reclaiming part of your yard.",
    ],
    features: [
      {
        title: "Below-grade grinding",
        description:
          "Stumps ground down well below the surface so you can replant or regrade.",
      },
      {
        title: "Surface roots & multiple stumps",
        description:
          "From a single stump to a whole yard's worth, we size the job to your property.",
      },
      {
        title: "Grindings cleaned up",
        description:
          "We remove or backfill grindings and leave the spot tidy and usable.",
      },
      {
        title: "Pairs with tree removal",
        description:
          "Removing a tree? Grind the stump at the same time and be done with it.",
      },
    ],
    priceNote:
      "Stump grinding is priced by stump size and number. Ask about combining it with tree removal for the best value.",
    galleryCategory: "stump-grinding",
  },
  {
    slug: "yard-debris-removal-bethlehem-pa",
    name: "Shrub & Yard Debris Removal",
    shortName: "Debris Removal",
    icon: "debris",
    teaser:
      "Old shrubs, brush, and yard debris hauled away fast — clearing the way for a fresh, clean landscape.",
    primaryKeyword: "yard debris removal Bethlehem PA",
    keywords: [
      "yard debris removal Bethlehem PA",
      "shrub removal Bethlehem PA",
      "brush removal Lehigh Valley",
      "landscaping cleanup Bethlehem",
    ],
    seoTitle: "Shrub & Yard Debris Removal in Bethlehem, PA | Brian's",
    metaDescription:
      "Shrub & yard debris removal in Bethlehem, PA. Old bushes, brush & yard waste cleared and hauled away. Fair prices and careful cleanup — call (610) 867-7414.",
    h1: "Shrub & Yard Debris Removal in Bethlehem, PA",
    heroBlurb:
      "Out with the old — we tear out tired shrubs and haul away brush and yard debris so you can start fresh.",
    overview: [
      "Overgrown shrubs and piles of yard debris hold a property back. Brian's Landscaping removes old shrubs, brush, branches, and general yard waste throughout Bethlehem and the Lehigh Valley — and hauls it all away.",
      "It's the perfect first step before mulching or a new landscape design. One customer had us 'tear out some old shrubs and mulch 14 yards' and called it an awesome job — that fresh-start transformation is exactly what we do best.",
    ],
    features: [
      {
        title: "Old shrub & bush removal",
        description:
          "Tired, overgrown shrubs pulled out root and all.",
      },
      {
        title: "Brush & branch clearing",
        description:
          "Fallen branches, brush piles, and overgrowth cleared out.",
      },
      {
        title: "General yard waste hauling",
        description:
          "We load it up and haul it away — no piles left at the curb.",
      },
      {
        title: "Ready for what's next",
        description:
          "A clean slate for mulch, new plantings, or a full landscape design.",
      },
    ],
    priceNote:
      "Debris removal is quoted by volume and effort. We'll take a look and give you a fair, upfront estimate.",
    galleryCategory: "cleanup",
  },
  {
    slug: "storm-cleanup-bethlehem-pa",
    name: "Storm Debris Cleanup",
    shortName: "Storm Cleanup",
    icon: "storm",
    teaser:
      "Fast, dependable cleanup after a storm — downed limbs and debris cleared so your property is safe again.",
    primaryKeyword: "storm cleanup Bethlehem PA",
    keywords: [
      "storm cleanup Bethlehem PA",
      "storm debris removal Lehigh Valley",
      "fallen tree removal Bethlehem",
      "emergency tree service Lehigh Valley",
    ],
    seoTitle: "Storm Debris Cleanup in Bethlehem, PA | Brian's",
    metaDescription:
      "Storm debris cleanup in Bethlehem, PA & the Lehigh Valley. Downed limbs, fallen trees & storm damage cleared fast. Emergency cleanup available — call (610) 867-7414.",
    h1: "Storm Debris Cleanup in Bethlehem, PA",
    heroBlurb:
      "After the storm, we've got you — fast, dependable cleanup of downed limbs, trees, and debris across the Lehigh Valley.",
    overview: [
      "Lehigh Valley storms can leave behind downed limbs, split trees, and a yard full of debris. Brian's Landscaping helps Bethlehem-area homeowners clean up safely and quickly so your property is back to normal.",
      "We assess hazards first, remove fallen and damaged trees and limbs, and clear the debris. Emergency storm cleanup is available — when the weather hits, give us a call and we'll get to you as soon as we safely can.",
    ],
    features: [
      {
        title: "Downed limb & tree removal",
        description:
          "Fallen and dangerously hanging limbs and trees removed safely.",
      },
      {
        title: "Hazard assessment",
        description:
          "We check for split trunks, hung-up limbs, and other risks before clearing.",
      },
      {
        title: "Full debris cleanup & hauling",
        description:
          "Brush, branches, and storm debris cleared and hauled away.",
      },
      {
        title: "Emergency response",
        description:
          "Emergency storm cleanup available — call and we'll prioritize getting you safe.",
      },
    ],
    priceNote:
      "Storm cleanup is quoted based on the scope of damage. Call (610) 867-7414 for fast help and a fair estimate.",
    galleryCategory: "cleanup",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
