import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://mixfood.vn";
const SHARE_IMAGE_URL = `${SITE_URL}/social-share.jpg`;
const SHARE_IMAGE_ALT = "Các món ăn Thái tại Mix Food Đà Nẵng";

type PublicPageMetadata = {
  title: string;
  description: string;
  breadcrumbName?: string;
};

const publicPages: Record<string, PublicPageMetadata> = {
  "/": {
    title: "Mix Food | Nhà hàng Thái chuẩn vị tại Đà Nẵng",
    description: "Thưởng thức ẩm thực Thái chuẩn vị tại Mix Food Đà Nẵng. Khám phá thực đơn và đặt bàn trực tuyến nhanh chóng.",
  },
  "/menu": {
    title: "Thực đơn món Thái | Mix Food Đà Nẵng",
    description: "Khám phá thực đơn Mix Food với Tom Yum, Pad Thai, Som Tam và nhiều món Thái được chế biến tươi mỗi ngày.",
    breadcrumbName: "Thực đơn",
  },
  "/booking": {
    title: "Đặt bàn nhà hàng Thái | Mix Food Đà Nẵng",
    description: "Đặt bàn tại Mix Food Đà Nẵng nhanh chóng. Chọn thời gian phù hợp để thưởng thức ẩm thực Thái chuẩn vị.",
    breadcrumbName: "Đặt bàn",
  },
};

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertBreadcrumbStructuredData(pathname: string, page: PublicPageMetadata | undefined) {
  const existingScript = document.head.querySelector<HTMLScriptElement>("#route-breadcrumb-schema");

  if (!page?.breadcrumbName) {
    existingScript?.remove();
    return;
  }

  const script = existingScript ?? document.createElement("script");
  script.id = "route-breadcrumb-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumbName,
        item: `${SITE_URL}${pathname}`,
      },
    ],
  });

  if (!existingScript) {
    document.head.appendChild(script);
  }
}

export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPathname = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
    const page = publicPages[normalizedPathname];
    const isPublicPage = page !== undefined;
    const canonicalUrl = `${SITE_URL}${normalizedPathname === "/" ? "/" : normalizedPathname}`;
    const title = page?.title ?? "Mix Food";
    const description = page?.description ?? "Mix Food mang hương vị Thái đặc trưng đến Đà Nẵng.";
    const robots = isPublicPage ? "index, follow" : "noindex, follow";

    document.title = title;
    document.documentElement.lang = "vi";
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertMeta('meta[name="googlebot"]', "name", "googlebot", robots);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:image"]', "property", "og:image", SHARE_IMAGE_URL);
    upsertMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", SHARE_IMAGE_URL);
    upsertMeta('meta[property="og:image:type"]', "property", "og:image:type", "image/jpeg");
    upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", SHARE_IMAGE_ALT);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", SHARE_IMAGE_URL);
    upsertMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", SHARE_IMAGE_ALT);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    upsertBreadcrumbStructuredData(normalizedPathname, page);
  }, [pathname]);

  return null;
}
