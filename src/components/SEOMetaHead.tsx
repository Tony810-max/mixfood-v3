import React from 'react';

const SEOMetaHead = () => {
  return (
    <>
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for social media domains */}
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//www.instagram.com" />
      <link rel="dns-prefetch" href="//twitter.com" />
      
      {/* Additional meta tags for Thai cuisine SEO */}
      <meta name="category" content="restaurant, thai cuisine, food" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Restaurant specific meta tags */}
      <meta name="restaurant" content="Mix Food - Ẩm Thực Thái Đà Nẵng" />
      <meta name="cuisine" content="Thai, Asian, Vietnamese-Thai Fusion" />
      <meta name="price-range" content="$$" />
      
      {/* Location based SEO */}
      <meta name="city" content="Đà Nẵng" />
      <meta name="country" content="Vietnam" />
      <meta name="state" content="VN-54" />
      
      {/* Food specific meta tags */}
      <meta name="food-type" content="thai food, asian cuisine, authentic thai" />
      <meta name="specialty" content="tom yum, pad thai, som tam, thai desserts" />
      
      {/* Additional Open Graph tags */}
      <meta property="og:site_name" content="Mix Food - Ẩm Thực Thái Đà Nẵng" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="restaurant" />
      <meta property="restaurant:contact_info:street_address" content="123 Nguyễn Văn Linh" />
      <meta property="restaurant:contact_info:locality" content="Đà Nẵng" />
      <meta property="restaurant:contact_info:region" content="VN-54" />
      <meta property="restaurant:contact_info:postal_code" content="550000" />
      <meta property="restaurant:contact_info:country_name" content="Vietnam" />
      <meta property="restaurant:contact_info:phone_number" content="+84-236-xxxx-xxxx" />
      <meta property="restaurant:contact_info:website" content="https://mixfood.vn" />
      <meta property="restaurant:contact_info:email" content="info@mixfood.vn" />
      
      {/* Twitter Card additional tags */}
      <meta name="twitter:domain" content="mixfood.vn" />
      <meta name="twitter:app:name:iphone" content="Mix Food" />
      <meta name="twitter:app:name:ipad" content="Mix Food" />
      <meta name="twitter:app:name:googleplay" content="Mix Food" />
      
      {/* Schema.org structured data for breadcrumbs */}
      <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang chủ",
              "item": "https://mixfood.vn"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Ẩm thực Thái",
              "item": "https://mixfood.vn/menu"
            }
          ]
        }
      `}
      </script>
      
      {/* FAQ structured data */}
      <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Mix Food phục vụ những món ăn Thái nào?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mix Food chuyên phục vụ các món ăn Thái Lan đặc sắc như Tom Yum, Pad Thai, Som Tam, Mango Sticky Rice và nhiều món khác."
              }
            },
            {
              "@type": "Question",
              "name": "Mix Food ở đâu tại Đà Nẵng?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mix Food tọa lạc tại 123 Nguyễn Văn Linh, Đà Nẵng, gần các khu vực trung tâm."
              }
            },
            {
              "@type": "Question",
              "name": "Giờ mở cửa của Mix Food là bao nhiêu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mix Food mở cửa từ 10:00 đến 22:00 hàng ngày, bao gồm cả cuối tuần."
              }
            }
          ]
        }
      `}
      </script>
    </>
  );
};

export default SEOMetaHead;
