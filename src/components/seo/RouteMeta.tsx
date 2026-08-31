import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://mixfood.vn";

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
