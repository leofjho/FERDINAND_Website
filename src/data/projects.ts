import { Project, ProjectPreview } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "voumbii",
    title: "Voumbii",
    category: "Brand",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A9207.avif",
      alt: "Voumbii",
    },
    thumbnailVideo: {
      src: "/videos/projects/voumbii.mp4",
      poster: "/images/project-section/5W9A9207.avif",
    },
    shortDescription: "Brand Identity & Visual Design",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A9207.avif", alt: "Voumbii showcase" },
    showcaseCaption: "Voumbii",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A9207.avif", alt: "Voumbii solution" },
    gallery: [{ src: "/images/project-section/5W9A9207.avif", alt: "Gallery 1" }],
    results: [
      { value: 1, suffix: "M", label: "Views" },
      { value: 100, suffix: "%", label: "Quality" },
      { value: 10, label: "Projects" },
      { value: 5, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "event", title: "Event", category: "Event", thumbnail: { src: "/images/project-section/5W9A0006.avif", alt: "Event preview" } },
  },
  {
    slug: "event",
    title: "Event",
    category: "Event",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A0006.avif",
      alt: "Event",
    },
    thumbnailImage: {
      src: "/images/project-section/5W9A0006.avif",
      alt: "Event Kachel",
    },
    shortDescription: "Event Photography & Documentation",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A0006.avif", alt: "Event showcase" },
    showcaseCaption: "Event",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A0006.avif", alt: "Event solution" },
    gallery: [{ src: "/images/project-section/5W9A0006.avif", alt: "Gallery 1" }],
    results: [
      { value: 500, label: "Photos" },
      { value: 1, label: "Event" },
      { value: 100, suffix: "%", label: "Satisfaction" },
      { value: 3, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "website-shooting", title: "Website Shooting", category: "Photography", thumbnail: { src: "/images/project-section/5W9A3810.avif", alt: "Website Shooting preview" } },
  },
  {
    slug: "website-shooting",
    title: "Website Shooting",
    category: "Photography",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A3810.avif",
      alt: "Website Shooting",
    },
    thumbnailVideo: {
      src: "/videos/projects/website_shooting.mp4",
      poster: "/images/project-section/5W9A3810.avif",
    },
    shortDescription: "Professional Photography for Web",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A3810.avif", alt: "Website Shooting showcase" },
    showcaseCaption: "Website Shooting",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A3810.avif", alt: "Website Shooting solution" },
    gallery: [{ src: "/images/project-section/5W9A3810.avif", alt: "Gallery 1" }],
    results: [
      { value: 200, label: "Photos" },
      { value: 50, label: "Edited" },
      { value: 100, suffix: "%", label: "Quality" },
      { value: 2, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "event2", title: "Event 2", category: "Event", thumbnail: { src: "/images/project-section/5W9A6486.avif", alt: "Event 2 preview" } },
  },
  {
    slug: "event2",
    title: "Event 2",
    category: "Event",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A6486.avif",
      alt: "Event 2",
    },
    thumbnailImage: {
      src: "/images/project-section/5W9A6486.avif",
      alt: "Event 2 Kachel",
    },
    shortDescription: "Event Photography & Coverage",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A6486.avif", alt: "Event 2 showcase" },
    showcaseCaption: "Event 2",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A6486.avif", alt: "Event 2 solution" },
    gallery: [{ src: "/images/project-section/5W9A6486.avif", alt: "Gallery 1" }],
    results: [
      { value: 300, label: "Photos" },
      { value: 1, label: "Event" },
      { value: 100, suffix: "%", label: "Satisfaction" },
      { value: 2, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "motorsport", title: "Motorsport", category: "Sports", thumbnail: { src: "/images/project-section/5W9A6806.avif", alt: "Motorsport preview" } },
  },
  {
    slug: "motorsport",
    title: "Motorsport",
    category: "Sports",
    year: "2024",
    heroImage: {
      src: "/images/project-section/5W9A6806.avif",
      alt: "Motorsport",
    },
    thumbnailVideo: {
      src: "/videos/projects/motorsport.mp4",
      poster: "/images/project-section/5W9A6806.avif",
    },
    shortDescription: "Motorsport Photography & Videography",
    challenge: "Lorem ipsum dolor sit amet.",
    challengePoints: [
      { title: "Lorem", description: "Lorem ipsum dolor sit amet." },
      { title: "Ipsum", description: "Dolor sit amet." },
      { title: "Dolor", description: "Consectetur adipiscing." },
    ],
    showcaseImage: { src: "/images/project-section/5W9A6806.avif", alt: "Motorsport showcase" },
    showcaseCaption: "Motorsport",
    solution: "Lorem ipsum dolor sit amet.",
    solutionFeatures: [
      { title: "Lorem", description: "Lorem ipsum." },
      { title: "Ipsum", description: "Dolor sit." },
      { title: "Dolor", description: "Amet." },
      { title: "Sit", description: "Consectetur." },
    ],
    solutionImage: { src: "/images/project-section/5W9A6806.avif", alt: "Motorsport solution" },
    gallery: [{ src: "/images/project-section/5W9A6806.avif", alt: "Gallery 1" }],
    results: [
      { value: 150, label: "Photos" },
      { value: 5, label: "Videos" },
      { value: 100, suffix: "%", label: "Speed" },
      { value: 4, label: "Awards" },
    ],
    resultsDescription: "Lorem ipsum.",
    nextProject: { slug: "voumbii", title: "Voumbii", category: "Brand", thumbnail: { src: "/images/project-section/5W9A9207.avif", alt: "Voumbii preview" } },
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
      fullImage: heroImage, // Vollbild: immer heroImage (Großbild)
      thumbnailVideo,
      shortDescription,
    })
  );
}
