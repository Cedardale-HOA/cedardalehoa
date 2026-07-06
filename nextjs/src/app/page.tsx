import { client } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  NEXT_EVENT_QUERY,
  UPCOMING_EVENTS_QUERY,
} from "@/sanity/queries";
import type { SiteSetting, SanityEvent } from "@/types/sanity";
import HeroSection from "@/components/sections/HeroSection";
import QuickLinksBar from "@/components/sections/QuickLinksBar";
import AboutSection from "@/components/sections/AboutSection";
import DuesSection from "@/components/sections/DuesSection";
import EventsPreviewSection from "@/components/sections/EventsPreviewSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ResourcesSection from "@/components/sections/ResourcesSection";

const OPTIONS = { next: { revalidate: 60 } };

export default async function HomePage() {
  let settings: SiteSetting | null = null;
  let nextEvent: SanityEvent | null = null;
  let upcomingEvents: SanityEvent[] = [];
  let dataUnavailable = false;

  try {
    const [siteSettings, upcoming, events] = await Promise.all([
      client.fetch<SiteSetting | null>(SITE_SETTINGS_QUERY, {}, OPTIONS),
      client.fetch<SanityEvent | null>(NEXT_EVENT_QUERY, {}, OPTIONS),
      client.fetch<SanityEvent[]>(UPCOMING_EVENTS_QUERY, {}, OPTIONS),
    ]);
    settings = siteSettings;
    nextEvent = upcoming;
    upcomingEvents = events ?? [];
  } catch {
    dataUnavailable = true;
  }

  return (
    <>
      {dataUnavailable && (
        <div style={{ background: "#fff8e1", color: "#6d4c00", borderBottom: "1px solid #f1dd9f", padding: "0.75rem 1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
          Some live content is temporarily unavailable. The page is showing fallback values.
        </div>
      )}
      <HeroSection settings={settings} nextEvent={nextEvent} />
      <QuickLinksBar settings={settings} />
      <AboutSection settings={settings} />
      <DuesSection settings={settings} />
      <EventsPreviewSection events={upcomingEvents ?? []} />
      <NewsletterSection settings={settings} />
      <ResourcesSection settings={settings} />
    </>
  );
}
