import { Project, ProjectPreview } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "desert-dreams",
    title: "Desert Dreams",
    category: "Photography",
    year: "2024",
    client: "Nomad Collective",
    technologies: ["Film Photography", "Post-Production", "Art Direction"],
    heroImage: {
      src: "/images/marokko/001137030003.jpg",
      alt: "Desert Dreams hero - vast Moroccan landscape",
    },
    shortDescription:
      "A visual journey through the Moroccan Sahara, capturing the essence of solitude and natural beauty through analog photography.",
    challenge:
      "The client needed a visual identity that would convey the raw, untouched beauty of desert landscapes while maintaining commercial appeal for their luxury travel brand.",
    challengePoints: [
      {
        title: "Harsh Conditions",
        description:
          "Shooting in extreme temperatures while preserving film integrity and equipment functionality.",
      },
      {
        title: "Authentic Storytelling",
        description:
          "Balancing commercial needs with genuine documentary approach to capture real moments.",
      },
      {
        title: "Cultural Sensitivity",
        description:
          "Representing local communities with respect and accuracy while telling their stories.",
      },
    ],
    showcaseImage: {
      src: "/images/marokko/001137030020.jpg",
      alt: "Wide desert panorama at golden hour",
    },
    showcaseCaption: "Golden hour in the Sahara - where light meets sand",
    solution:
      "We developed a comprehensive visual strategy combining traditional film photography with modern post-production techniques, ensuring authenticity while meeting commercial standards.",
    solutionFeatures: [
      {
        title: "Analog First Approach",
        description:
          "Shot entirely on medium format film for authentic grain and color rendering.",
      },
      {
        title: "Golden Hour Focus",
        description:
          "Concentrated all shooting during optimal light conditions for maximum impact.",
      },
      {
        title: "Local Collaboration",
        description:
          "Worked with Berber guides for authentic location access and cultural accuracy.",
      },
      {
        title: "Selective Color Grading",
        description:
          "Enhanced natural tones while maintaining the film aesthetic throughout.",
      },
    ],
    solutionImage: {
      src: "/images/marokko/001137030018.jpg",
      alt: "Behind the scenes of the desert shoot",
    },
    gallery: [
      { src: "/images/marokko/001137030001.jpg", alt: "Desert landscape 1" },
      { src: "/images/marokko/001137030002.jpg", alt: "Desert landscape 2" },
      { src: "/images/marokko/001137030004.jpg", alt: "Desert landscape 3" },
      { src: "/images/marokko/001137030005.jpg", alt: "Desert landscape 4" },
      { src: "/images/marokko/001137030006.jpg", alt: "Desert landscape 5" },
      { src: "/images/marokko/001137030007.jpg", alt: "Desert landscape 6" },
    ],
    results: [
      { value: 2.4, suffix: "M", label: "Social Impressions" },
      { value: 340, suffix: "%", label: "Engagement Increase" },
      { value: 12, label: "Publications Featured" },
      { value: 3, label: "Awards Won" },
    ],
    resultsDescription:
      "The campaign exceeded all expectations, establishing the brand as a leader in authentic travel experiences.",
    nextProject: {
      slug: "medina-stories",
      title: "Medina Stories",
      category: "Documentary",
      thumbnail: {
        src: "/images/marokko/001137040001.jpg",
        alt: "Medina Stories preview",
      },
    },
  },
  {
    slug: "medina-stories",
    title: "Medina Stories",
    category: "Documentary",
    year: "2023",
    client: "Morocco Heritage Foundation",
    technologies: ["Video Production", "Sound Design", "Cultural Documentation"],
    heroImage: {
      src: "/images/marokko/001137040003.jpg",
      alt: "Medina Stories hero - ancient marketplace",
    },
    shortDescription:
      "An immersive documentary series exploring the daily lives and traditions within Morocco's historic medinas.",
    challenge:
      "Creating an intimate portrait of medina life while navigating complex cultural dynamics and gaining trust of local communities.",
    challengePoints: [
      {
        title: "Access & Trust",
        description:
          "Building genuine relationships to capture authentic, unguarded moments.",
      },
      {
        title: "Technical Constraints",
        description:
          "Filming in tight, crowded spaces with limited lighting and constant movement.",
      },
      {
        title: "Preservation Focus",
        description:
          "Documenting traditions and crafts at risk of disappearing in modern times.",
      },
    ],
    showcaseImage: {
      src: "/images/marokko/001137040010.jpg",
      alt: "Artisan at work in the medina",
    },
    showcaseCaption: "Preserving centuries of craftsmanship",
    solution:
      "A year-long embedded approach, living within the community to build genuine connections and capture unguarded moments of daily life.",
    solutionFeatures: [
      {
        title: "Long-term Embedding",
        description:
          "Spent 8 months living within medina communities to build trust.",
      },
      {
        title: "Minimal Crew",
        description:
          "Two-person team for intimate, unobtrusive filming experience.",
      },
      {
        title: "Natural Sound",
        description:
          "Prioritized authentic ambient audio over narration for immersion.",
      },
      {
        title: "Community Involvement",
        description:
          "Local residents contributed to storytelling direction and review.",
      },
    ],
    solutionImage: {
      src: "/images/marokko/001137040015.jpg",
      alt: "Community gathering in medina courtyard",
    },
    gallery: [
      { src: "/images/marokko/001137040001.jpg", alt: "Medina scene 1" },
      { src: "/images/marokko/001137040002.jpg", alt: "Medina scene 2" },
      { src: "/images/marokko/001137040004.jpg", alt: "Medina scene 3" },
      { src: "/images/marokko/001137040005.jpg", alt: "Medina scene 4" },
      { src: "/images/marokko/001137040006.jpg", alt: "Medina scene 5" },
      { src: "/images/marokko/001137040007.jpg", alt: "Medina scene 6" },
    ],
    results: [
      { value: 50, suffix: "K", label: "Documentary Views" },
      { value: 8, label: "Festival Selections" },
      { value: 15, label: "Artisans Documented" },
      { value: 1, label: "UNESCO Recognition" },
    ],
    resultsDescription:
      "The documentary received international recognition and contributed to heritage preservation efforts.",
    nextProject: {
      slug: "atlas-perspectives",
      title: "Atlas Perspectives",
      category: "Brand Campaign",
      thumbnail: {
        src: "/images/marokko/001137020001.jpg",
        alt: "Atlas Perspectives preview",
      },
    },
  },
  {
    slug: "atlas-perspectives",
    title: "Atlas Perspectives",
    category: "Brand Campaign",
    year: "2023",
    client: "Atlas Mountain Resorts",
    technologies: ["Campaign Strategy", "Photography", "Digital Experience"],
    heroImage: {
      src: "/images/marokko/001137020002.jpg",
      alt: "Atlas Perspectives hero - mountain vista",
    },
    shortDescription:
      "A comprehensive brand campaign showcasing luxury mountain experiences through a lens of adventure and tranquility.",
    challenge:
      "Positioning a new luxury resort brand in a competitive market while honoring the natural environment and local heritage.",
    challengePoints: [
      {
        title: "Market Differentiation",
        description:
          "Standing out in the crowded luxury travel sector with unique positioning.",
      },
      {
        title: "Dual Appeal",
        description:
          "Attracting both adventure seekers and guests seeking relaxation.",
      },
      {
        title: "Sustainability Narrative",
        description:
          "Communicating eco-conscious practices authentically without greenwashing.",
      },
    ],
    showcaseImage: {
      src: "/images/marokko/001137020003.jpg",
      alt: "Panoramic Atlas mountain range view",
    },
    showcaseCaption: "Where adventure meets serenity",
    solution:
      "A multi-platform campaign emphasizing the duality of adventure and serenity, with strong visual storytelling across all touchpoints.",
    solutionFeatures: [
      {
        title: "Visual Identity System",
        description:
          "Created comprehensive brand guidelines and asset library.",
      },
      {
        title: "Content Strategy",
        description:
          "12-month content calendar across all social platforms.",
      },
      {
        title: "Interactive Experience",
        description:
          "360-degree virtual tours of resort and surrounding nature.",
      },
      {
        title: "Influencer Collaboration",
        description:
          "Partnered with travel and lifestyle creators for authentic reach.",
      },
    ],
    solutionImage: {
      src: "/images/marokko/001137020004.jpg",
      alt: "Resort experience detail shot",
    },
    gallery: [
      { src: "/images/marokko/001137020001.jpg", alt: "Atlas view 1" },
      { src: "/images/marokko/001137030008.jpg", alt: "Landscape detail" },
      { src: "/images/marokko/001137030009.jpg", alt: "Mountain morning" },
      { src: "/images/marokko/001137030010.jpg", alt: "Resort exterior" },
      { src: "/images/marokko/001137030011.jpg", alt: "Nature detail" },
      { src: "/images/marokko/001137030012.jpg", alt: "Sunset view" },
    ],
    results: [
      { value: 156, suffix: "%", label: "Booking Increase" },
      { value: 4.2, suffix: "M", label: "Campaign Reach" },
      { value: 28, suffix: "%", label: "Brand Awareness Lift" },
      { value: 92, suffix: "%", label: "Guest Satisfaction" },
    ],
    resultsDescription:
      "The campaign transformed the resort into a must-visit destination within its first year.",
    nextProject: {
      slug: "desert-dreams",
      title: "Desert Dreams",
      category: "Photography",
      thumbnail: {
        src: "/images/marokko/001137030003.jpg",
        alt: "Desert Dreams preview",
      },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectPreviews(): ProjectPreview[] {
  return projects.map(
    ({ slug, title, category, year, heroImage, shortDescription }) => ({
      slug,
      title,
      category,
      year,
      thumbnail: heroImage,
      shortDescription,
    })
  );
}
