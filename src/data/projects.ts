import { Project, ProjectPreview } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "voumbii",
    title: "Voumbii",
    category: "Brand",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A9207.webp",
      alt: "Voumbii",
    },
    thumbnailVideo: {
      src: "/videos/projects/voumbii.mp4",
      poster: "/images/projects/voumbii.jpg",
    },
    shortDescription: "Brand Identity & Visual Design",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A9207.webp", alt: "Voumbii showcase" },
    showcaseCaption: "Voumbii",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A9207.webp", alt: "Voumbii solution" },
    gallery: [{ src: "/images/project-section/5W9A9207.webp", alt: "Gallery 1" }],
    results: [
      { value: 1, suffix: "M", label: "Views" },
      { value: 100, suffix: "%", label: "Quality" },
      { value: 10, label: "Projects" },
      { value: 5, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "event", title: "Event", category: "Event", thumbnail: { src: "/images/projects/event_full.jpg", alt: "Event preview" } },
  },
  {
    slug: "event",
    title: "Event",
    category: "Event",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A0006.webp",
      alt: "Event",
    },
    thumbnailImage: {
      src: "/images/projects/event_tile.jpg",
      alt: "Event Kachel",
    },
    shortDescription: "Event Photography & Documentation",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A0006.webp", alt: "Event showcase" },
    showcaseCaption: "Event",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A0006.webp", alt: "Event solution" },
    gallery: [{ src: "/images/project-section/5W9A0006.webp", alt: "Gallery 1" }],
    results: [
      { value: 500, label: "Photos" },
      { value: 1, label: "Event" },
      { value: 100, suffix: "%", label: "Satisfaction" },
      { value: 3, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "website-shooting", title: "Website Shooting", category: "Photography", thumbnail: { src: "/images/projects/website_shooting.jpg", alt: "Website Shooting preview" } },
  },
  {
    slug: "website-shooting",
    title: "Website Shooting",
    category: "Photography",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A3810.webp",
      alt: "Website Shooting",
    },
    thumbnailVideo: {
      src: "/videos/projects/website_shooting.mp4",
      poster: "/images/projects/website_shooting.jpg",
    },
    shortDescription: "Professional Photography for Web",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A3810.webp", alt: "Website Shooting showcase" },
    showcaseCaption: "Website Shooting",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A3810.webp", alt: "Website Shooting solution" },
    gallery: [{ src: "/images/project-section/5W9A3810.webp", alt: "Gallery 1" }],
    results: [
      { value: 200, label: "Photos" },
      { value: 50, label: "Edited" },
      { value: 100, suffix: "%", label: "Quality" },
      { value: 2, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "event2", title: "Event 2", category: "Event", thumbnail: { src: "/images/projects/event2_full.jpg", alt: "Event 2 preview" } },
  },
  {
    slug: "event2",
    title: "Event 2",
    category: "Event",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A6486.webp",
      alt: "Event 2",
    },
    thumbnailImage: {
      src: "/images/projects/event2_tile.jpg",
      alt: "Event 2 Kachel",
    },
    shortDescription: "Event Photography & Coverage",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A6486.webp", alt: "Event 2 showcase" },
    showcaseCaption: "Event 2",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A6486.webp", alt: "Event 2 solution" },
    gallery: [{ src: "/images/project-section/5W9A6486.webp", alt: "Gallery 1" }],
    results: [
      { value: 300, label: "Photos" },
      { value: 1, label: "Event" },
      { value: 100, suffix: "%", label: "Satisfaction" },
      { value: 2, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "motorsport", title: "Motorsport", category: "Sports", thumbnail: { src: "/images/projects/motorsport.jpg", alt: "Motorsport preview" } },
  },
  {
    slug: "motorsport",
    title: "Motorsport",
    category: "Sports",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A6806.webp",
      alt: "Motorsport",
    },
    thumbnailVideo: {
      src: "/videos/projects/motorsport.mp4",
      poster: "/images/projects/motorsport.jpg",
    },
    shortDescription: "Motorsport Photography & Videography",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A6806.webp", alt: "Motorsport showcase" },
    showcaseCaption: "Motorsport",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A6806.webp", alt: "Motorsport solution" },
    gallery: [{ src: "/images/project-section/5W9A6806.webp", alt: "Gallery 1" }],
    results: [
      { value: 150, label: "Photos" },
      { value: 5, label: "Videos" },
      { value: 100, suffix: "%", label: "Speed" },
      { value: 4, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "voumbii", title: "Voumbii", category: "Brand", thumbnail: { src: "/images/projects/voumbii.jpg", alt: "Voumbii preview" } },
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
    ({ slug, title, category, year, heroImage, thumbnailVideo, thumbnailImage, shortDescription }) => ({
      slug,
      title,
      category,
      year,
      thumbnail: thumbnailImage || heroImage, // Kachel: separates Bild oder heroImage
      fullImage: heroImage, // Vollbild: project-section Bilder
      thumbnailVideo,
      shortDescription,
    })
  );
}
