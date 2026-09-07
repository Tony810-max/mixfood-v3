import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://mixfood.vn";
const SHARE_IMAGE_URL = `${SITE_URL}/social-share.jpg`;
const SHARE_IMAGE_ALT = "Các món ăn Thái tại Mix Food Đà Nẵng";

const metadata = {
  "/": {
    title: "Mix Food | Nhà hàng Thái chuẩn vị tại Đà Nẵng",
    description: "Khám phá ẩm thực Thái đậm vị tại Mix Food Đà Nẵng. Xem thực đơn và đặt bàn trực tuyến nhanh chóng.",
  },
  "/menu": {
    title: "Thực đơn món Thái | Mix Food Đà Nẵng",
    description: "Xem thực đơn Mix Food với Tom Yum, Pad Thai, Som Tam và nhiều món Thái được chế biến tươi mỗi ngày.",
  },
  "/booking": {
    title: "Đặt bàn | Mix Food Đà Nẵng",
    description: "Đặt bàn tại Mix Food Đà Nẵng nhanh chóng, nhận xác nhận và quản lý lịch đặt bàn trực tuyến.",
  },
} as const;

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isPublicPage = pathname in metadata;
    const page = metadata[pathname as keyof typeof metadata] ?? {
      title: "Mix Food | Trải nghiệm ẩm thực Thái",
      description: "Mix Food mang hương vị Thái đặc trưng đến Đà Nẵng.",
    };
    const canonicalPath = pathname === "/" ? "" : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = page.title;
    document.documentElement.lang = "vi";
    upsertMeta('meta[name="description"]', "name", "description", page.description);
    upsertMeta('meta[name="robots"]', "name", "robots", isPublicPage ? "index, follow" : "noindex, nofollow");
    upsertMeta('meta[property="og:title"]', "property", "og:title", page.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", page.description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:image"]', "property", "og:image", SHARE_IMAGE_URL);
    upsertMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", SHARE_IMAGE_URL);
    upsertMeta('meta[property="og:image:type"]', "property", "og:image:type", "image/jpeg");
    upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", SHARE_IMAGE_ALT);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
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
  }, [pathname]);

  return null;
}
