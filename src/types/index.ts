export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  icon: string | null;
  image_url: string | null;
  features: string[];
  benefits: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  monthly_price: number | null;
  yearly_price: number | null;
  features: PackageFeature[];
  is_popular: boolean;
  cta_text: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  client_name: string | null;
  category: string;
  tags: string[];
  thumbnail_url: string | null;
  images: string[];
  live_url: string | null;
  tech_stack: string[];
  results: ProjectResult[];
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  author_avatar_url: string | null;
  category: string | null;
  tags: string[];
  reading_time: number | null;
  is_published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  budget_range: string | null;
  message: string;
  source: string;
  is_read: boolean;
  is_archived: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  client_company: string | null;
  client_avatar_url: string | null;
  content: string;
  rating: number | null;
  project_id: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  group_name: string;
  created_at: string;
  updated_at: string;
}
