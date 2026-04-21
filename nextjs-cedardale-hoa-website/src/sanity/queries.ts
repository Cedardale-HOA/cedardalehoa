// All GROQ queries used throughout the Next.js app

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  duesAmount,
  duesTagline,
  dueDate,
  billingPeriod,
  newsletterUrl,
  facebookGroupUrl,
  hoaDocumentsUrl,
  meetingMinutesUrl,
  contactEmail,
  aboutHeading,
  aboutBody,
  aboutImage
}`;

export const EVENTS_QUERY = `*[_type == "event"] | order(date asc){
  _id,
  title,
  date,
  time,
  location,
  details,
  status
}`;

export const NEXT_EVENT_QUERY = `*[_type == "event" && status == "upcoming"] | order(date asc)[0]{
  _id,
  title,
  date,
  time,
  location,
  details,
  status
}`;

export const UPCOMING_EVENTS_QUERY = `*[_type == "event" && status == "upcoming"] | order(date asc)[0...5]{
  _id,
  title,
  date,
  time,
  location,
  details,
  status
}`;

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  author,
  excerpt,
  image
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  author,
  excerpt,
  image,
  body
}`;

export const BOARD_MEMBERS_QUERY = `*[_type == "boardMember"] | order(order asc){
  _id,
  name,
  role,
  image,
  bio,
  email,
  order
}`;
