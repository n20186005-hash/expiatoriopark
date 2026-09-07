import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import WeatherSection from '@/components/WeatherSection';
import AboutExpiatorio from '@/components/AboutExpiatorio';
import StoriesSection from '@/components/StoriesSection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import SeasonalSection from '@/components/SeasonalSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import ServicesSection from '@/components/ServicesSection';
import NearbySection from '@/components/NearbySection';
import ItinerarySection from '@/components/ItinerarySection';
import AudienceRoutesSection from '@/components/AudienceRoutesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import ResponsibilitySection from '@/components/ResponsibilitySection';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  ATTRACTION,
  BASE_URL,
  OG_IMAGE_URL,
  LOCALIZED_ENTITY_NAME,
  LOCALIZED_ENTITY_ALT,
} from '@/lib/site';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const breadcrumbItems = (messages?.intro?.breadcrumbItems ||
    [ATTRACTION.ATTRACTION_FULL_NAME, ATTRACTION.CITY_NAME, ATTRACTION.STATE_PROVINCE, ATTRACTION.COUNTRY_NAME]) as string[];

  const entityName = LOCALIZED_ENTITY_NAME[locale] || ATTRACTION.ATTRACTION_FULL_NAME;
  const entityAlt = LOCALIZED_ENTITY_ALT[locale] || ATTRACTION.ATTRACTION_SHORT_NAME;
  const pageUrl = `${BASE_URL}/${locale}`;

  // ===== Schema.org / JSON-LD：Park / TouristAttraction 实体绑定 =====
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': ['Park', 'TouristAttraction'],
    '@id': ATTRACTION.ATTRACTION_ENTITY_ID,
    name: entityName,
    alternateName: [entityAlt, `${entityName} ${ATTRACTION.CITY_NAME}`],
    description: `Comprehensive visitor guide to ${entityName} in ${ATTRACTION.CITY_NAME}, ${ATTRACTION.STATE_PROVINCE}, ${ATTRACTION.COUNTRY_NAME}.`,
    url: pageUrl,
    image: [OG_IMAGE_URL],
    isAccessibleForFree: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '8187',
      bestRating: '5',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Col Americana, Americana',
      addressLocality: ATTRACTION.CITY_NAME,
      addressRegion: ATTRACTION.STATE_PROVINCE,
      postalCode: ATTRACTION.POSTAL_CODE,
      addressCountry: ATTRACTION.COUNTRY_CODE_2LETTER,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.LATITUDE,
      longitude: ATTRACTION.LONGITUDE,
    },
    hasMap: ATTRACTION.MAPS_SHARE_URL,
    sameAs: [ATTRACTION.MAPS_SHARE_URL, ATTRACTION.GOVT_TOURISM_URL],
  };

  // ===== Schema.org / JSON-LD：地理面包屑 =====
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((name: string, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      ...(i === 0 ? { item: `${pageUrl}/` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={attractionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <WeatherSection />
        <AboutExpiatorio />
        <StoriesSection />
        <RouteSection />
        <HoursSection />
        <SeasonalSection />
        <TicketsSection />
        <TransportSection />
        <ServicesSection />
        <NearbySection />
        <ItinerarySection />
        <AudienceRoutesSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <ResponsibilitySection />
        <FaqSection />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
