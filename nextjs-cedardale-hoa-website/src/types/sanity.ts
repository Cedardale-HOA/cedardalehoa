export interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  details?: string;
  status: "upcoming" | "past" | "tentative";
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author?: string;
  excerpt?: string;
  image?: SanityImage;
  body?: SanityBlock[];
}

export interface SanityBoardMember {
  _id: string;
  name: string;
  role: string;
  image?: SanityImage;
  bio?: string;
  email?: string;
  order?: number;
}

export interface SiteSetting {
  duesAmount?: string;
  duesTagline?: string;
  dueDate?: string;
  billingPeriod?: string;
  newsletterUrl?: string;
  facebookGroupUrl?: string;
  hoaDocumentsUrl?: string;
  meetingMinutesUrl?: string;
  contactEmail?: string;
  aboutHeading?: string;
  aboutBody?: string;
  aboutImage?: SanityImage;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityBlock = any;
