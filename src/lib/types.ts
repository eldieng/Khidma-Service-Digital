// Types for database models

export interface ServiceBenefit {
  id: string;
  text: string;
  order: number;
}

export interface SubService {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  image: string;
  order: number;
  isActive: boolean;
  benefits: ServiceBenefit[];
  subServices: SubService[];
  processSteps: ProcessStep[];
}

export interface ProjectTechnology {
  id: string;
  name: string;
  order: number;
}

export interface ProjectChallenge {
  id: string;
  text: string;
  order: number;
}

export interface ProjectSolution {
  id: string;
  text: string;
  order: number;
}

export interface ProjectResult {
  id: string;
  text: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  client: string;
  date: string;
  image: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  technologies: ProjectTechnology[];
  challenges: ProjectChallenge[];
  solutions: ProjectSolution[];
  results: ProjectResult[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
}
