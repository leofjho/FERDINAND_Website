export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string; // Fallback image
}

export interface ChallengePoint {
  title: string;
  description: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface ResultMetric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface GalleryImage extends ProjectImage {
  caption?: string;
}

export interface NextProject {
  slug: string;
  title: string;
  category: string;
  thumbnail: ProjectImage;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  technologies?: string[];
  heroImage: ProjectImage;
  thumbnailVideo?: ProjectVideo; // Optional video for tile animation
  thumbnailImage?: ProjectImage; // Optional separate image for tile (if different from heroImage)
  shortDescription: string;
  challenge: string;
  challengePoints: ChallengePoint[];
  showcaseImage: ProjectImage;
  showcaseCaption?: string;
  solution: string;
  solutionFeatures: SolutionFeature[];
  solutionImage: ProjectImage;
  gallery: GalleryImage[];
  results: ResultMetric[];
  resultsDescription?: string;
  nextProject: NextProject;
}

export interface ProjectPreview {
  slug: string;
  title: string;
  category: string;
  year: string;
  thumbnail: ProjectImage; // Für Kachel
  fullImage: ProjectImage; // Für Vollbild
  thumbnailVideo?: ProjectVideo;
  shortDescription: string;
}
