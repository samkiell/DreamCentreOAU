/**
 * JSON-LD Component — Dream Centre
 * Injects structured data for SEO
 */

import { getMetadata, getContact } from '@/lib/content';

export function JsonLd() {
  const siteData = getMetadata();
  const contact = getContact();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'Senator Oluremi Tinubu Dream Centre',
    'url': siteData.url,
    'logo': `${siteData.url}/images/logo/dream-centre-logo.png`,
    'description': siteData.description,
    'parentOrganization': {
      '@type': 'EducationalOrganization',
      'name': 'Obafemi Awolowo University'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': contact.address[0],
      'addressLocality': 'Ile-Ife',
      'addressRegion': 'Osun State',
      'postalCode': '220005',
      'addressCountry': 'NG'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': contact.email,
      'contactType': 'institutional inquiries'
    }
  };

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': 'Senator Oluremi Tinubu Dream Centre',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': contact.address.join(', '),
      'addressLocality': 'Ile-Ife',
      'addressCountry': 'NG'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': contact.coordinates?.lat,
      'longitude': contact.coordinates?.lng
    },
    'hasMap': contact.mapUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
    </>
  );
}
