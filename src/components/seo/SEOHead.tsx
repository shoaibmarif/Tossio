import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath,
  breadcrumbs,
  jsonLd,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const baseUrl = 'https://coinfliptool.netlify.app';
  const fullUrl = `${baseUrl}${currentPath}`;

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta description & keywords
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 3. Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Open Graph tags
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'coinfliptool');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // 5. JSON-LD structured data
    let jsonLdScript = document.getElementById('route-jsonld') as HTMLScriptElement | null;
    const finalJsonLd: Record<string, unknown>[] = [];
    if (jsonLd) {
      finalJsonLd.push(jsonLd);
    }
    if (breadcrumbs && breadcrumbs.length > 0) {
      finalJsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${baseUrl}${crumb.path}`,
        })),
      });
    }

    if (finalJsonLd.length > 0) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'route-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(finalJsonLd.length === 1 ? finalJsonLd[0] : finalJsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [title, description, keywords, fullUrl, jsonLd, breadcrumbs, baseUrl]);

  return null;
};
