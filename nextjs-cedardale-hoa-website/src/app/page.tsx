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
  const [settings, nextEvent, upcomingEvents] = await Promise.all([
    client.fetch<SiteSetting>(SITE_SETTINGS_QUERY, {}, OPTIONS),
    client.fetch<SanityEvent | null>(NEXT_EVENT_QUERY, {}, OPTIONS),
    client.fetch<SanityEvent[]>(UPCOMING_EVENTS_QUERY, {}, OPTIONS),
  ]);

  return (
    <>
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
