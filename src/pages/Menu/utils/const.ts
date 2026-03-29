import padThaiImg from "@/assets/pad-thai.jpg";
import greenCurryImg from "@/assets/green-curry.jpg";
import somTumImg from "@/assets/som-tum.jpg";
import mangoRiceImg from "@/assets/mango-sticky-rice.jpg";
import heroDishImg from "@/assets/hero-dish.jpg";

export interface MenuItem {
  id: string;
  name: { en: string; vi: string };
  price: number;
  image: string | null;
  tags?: ("spicy" | "veggie" | "popular")[];
}

export interface Category {
  id: string;
  en: string;
  vi: string;
  items: MenuItem[];
}

export const menuData: Category[] = [
  {
    id: "appetizers",
    en: "Appetizers",
    vi: "Khai Vị",
    items: [
      {
        id: "phong-tom",
        name: { en: "Prawn Crackers", vi: "Phồng tôm" },
        price: 15000,
        image: null,
      },
      {
        id: "cai-thia-xao-toi",
        name: { en: "Stir-fried Bok Choy with Garlic", vi: "Cải thìa xào tỏi" },
        price: 40000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "rau-muong-xao-toi",
        name: {
          en: "Stir-fried Morning Glory with Garlic",
          vi: "Rau muống xào tỏi",
        },
        price: 40000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "rau-muong-xao-ruoc",
        name: {
          en: "Stir-fried Morning Glory with Shrimp Paste",
          vi: "Rau muống xào rưới",
        },
        price: 45000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "salad",
        name: { en: "Salad", vi: "Salad" },
        price: 45000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "rau-cu-xao-toi",
        name: { en: "Stir-fried Vegetables with Garlic", vi: "Rau củ xào tỏi" },
        price: 50000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "chan-ga",
        name: {
          en: "Boneless Chicken Feet with Thai Sauce",
          vi: "Chân gà rút xương sốt Thái",
        },
        price: 75000,
        image: null,
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "son-tam",
    en: "Sontam",
    vi: "Gỏi đu đủ",
    items: [
      {
        id: "sontam-xanh",
        name: { en: "Green Papaya Salad", vi: "Sontam xanh" },
        price: 40000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-mam-ca",
        name: { en: "Papaya Salad with Fermented Fish", vi: "Sontam mắm cá" },
        price: 45000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-tep",
        name: { en: "Papaya Salad with Tiny Shrimp", vi: "Sontam tép" },
        price: 45000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-ca-kho-gion",
        name: {
          en: "Papaya Salad with Crispy Dried Fish",
          vi: "Sontam cá khô giòn",
        },
        price: 55000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-tom-kho",
        name: { en: "Papaya Salad with Dried Shrimp", vi: "Sontam tôm khô" },
        price: 60000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-ngheu",
        name: { en: "Papaya Salad with Scallop", vi: "Sontam nghêu" },
        price: 60000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-ba-khia",
        name: { en: "Papaya Salad with Crab", vi: "Sontam ba khía" },
        price: 65000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-muc",
        name: { en: "Papaya Salad with Squid", vi: "Sontam mực" },
        price: 75000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-tom-hap",
        name: { en: "Papaya Salad with Steamed Shrimp", vi: "Sontam tôm hấp" },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-tom-song",
        name: { en: "Papaya Salad with Fresh Shrimp", vi: "Sontam tôm sống" },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-tom-xoc-toi",
        name: {
          en: "Papaya Salad with Garlic Tossed Shrimp",
          vi: "Sontam tôm xốc tỏi",
        },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-hai-san",
        name: { en: "Papaya Salad with Seafood", vi: "Sontam hải sản" },
        price: 85000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-mam-ca-tom-song",
        name: {
          en: "Papaya Salad with Fermented Fish & Fresh Shrimp",
          vi: "Sontam mắm cá tôm sống",
        },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-ba-kia-tom-song",
        name: {
          en: "Papaya Salad with Crab & Fresh Shrimp",
          vi: "Sontam ba khía & tôm sống",
        },
        price: 85000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "sontam-ba-kia-hai-san",
        name: {
          en: "Papaya Salad with Crab & Seafood",
          vi: "Sontam ba khía & hải sản",
        },
        price: 90000,
        image: null,
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "mango-salad",
    en: "Mango Salad",
    vi: "Gỏi xoài",
    items: [
      {
        id: "goi-xoai-ca-kho",
        name: { en: "Mango Salad with Dried Fish", vi: "Gỏi xoài cá khô" },
        price: 65000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "goi-xoai-muc",
        name: { en: "Mango Salad with Squid", vi: "Gỏi xoài mực" },
        price: 70000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "goi-xoai-tom",
        name: { en: "Mango Salad with Shrimp", vi: "Gỏi xoài tôm" },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "goi-xoai-hai-san",
        name: { en: "Mango Salad with Seafood", vi: "Gỏi xoài hải sản" },
        price: 85000,
        image: null,
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "larb-sticky-rice",
    en: "Larb + Sticky Rice",
    vi: "Larb + Xôi",
    items: [
      {
        id: "larb-ga",
        name: { en: "Chicken Larb with Sticky Rice", vi: "Larb gà" },
        price: 70000,
        image: null,
      },
      {
        id: "larb-heo",
        name: { en: "Pork Larb with Sticky Rice", vi: "Larb heo" },
        price: 70000,
        image: null,
      },
      {
        id: "larb-heo-nuong",
        name: {
          en: "Grilled Pork Larb with Sticky Rice",
          vi: "Larb heo nướng",
        },
        price: 75000,
        image: null,
      },
      {
        id: "larb-bo",
        name: { en: "Beef Larb with Sticky Rice", vi: "Larb bò" },
        price: 85000,
        image: null,
      },
      {
        id: "larb-bo-nuong",
        name: { en: "Grilled Beef Larb with Sticky Rice", vi: "Larb bò nướng" },
        price: 90000,
        image: null,
      },
      {
        id: "larb-hai-san",
        name: { en: "Seafood Larb with Sticky Rice", vi: "Larb hải sản" },
        price: 90000,
        image: null,
      },
    ],
  },
  {
    id: "glass-noodles-salad",
    en: "Glass Noodles Salad",
    vi: "Gỏi Miến Trộn",
    items: [
      {
        id: "goi-mien-ngheu",
        name: { en: "Glass Noodles Salad with Scallop", vi: "Gỏi miến nghêu" },
        price: 70000,
        image: null,
      },
      {
        id: "goi-mien-heo-bam",
        name: {
          en: "Glass Noodles Salad with Minced Pork",
          vi: "Gỏi miến heo bằm",
        },
        price: 70000,
        image: null,
      },
      {
        id: "goi-mien-muc",
        name: { en: "Glass Noodles Salad with Squid", vi: "Gỏi miến mực" },
        price: 75000,
        image: null,
      },
      {
        id: "goi-mien-tom",
        name: { en: "Glass Noodles Salad with Shrimp", vi: "Gỏi miến tôm" },
        price: 80000,
        image: null,
      },
      {
        id: "goi-mien-hai-san",
        name: {
          en: "Glass Noodles Salad with Seafood",
          vi: "Gỏi miến hải sản",
        },
        price: 85000,
        image: null,
      },
      {
        id: "mien-tom-tay-cam-xao",
        name: {
          en: "Stir-fried Glass Noodles with Shrimp",
          vi: "Miến Tôm tay cầm (xào)",
        },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "special-salad",
    en: "Special Salad",
    vi: "Gỏi Đặc Biệt",
    items: [
      {
        id: "goi-ngheu-chua-cay",
        name: { en: "Spicy Scallop Salad", vi: "Gỏi nghêu chua cay" },
        price: 70000,
        image: null,
      },
      {
        id: "goi-tom-thai-tom-song",
        name: { en: "Thai Fresh Shrimp Salad", vi: "Gỏi tôm Thái – Tôm sống" },
        price: 90000,
        image: null,
      },
      {
        id: "goi-heo-chua-cay",
        name: { en: "Spicy Pork Salad", vi: "Gỏi heo chua cay" },
        price: 75000,
        image: null,
      },
      {
        id: "goi-bo-bop-thau",
        name: { en: "Beef Salad with Papaya", vi: "Gỏi bò bóp thấu" },
        price: 80000,
        image: null,
      },
      {
        id: "goi-bo-nuong",
        name: { en: "Grilled Beef Salad", vi: "Gỏi bò nướng" },
        price: 80000,
        image: null,
      },
      {
        id: "gan-bo-chua-ngot",
        name: { en: "Sweet & Sour Beef Tendon", vi: "Gân bò chua ngọt" },
        price: 75000,
        image: null,
      },
      {
        id: "goi-xoai-ca-basa",
        name: { en: "Mango Salad with Basa Fish", vi: "Gỏi xoài cá Basa" },
        price: 75000,
        image: null,
      },
      {
        id: "goi-nam-va-hai-san",
        name: { en: "Mushroom & Seafood Salad", vi: "Gỏi nấm và hải sản" },
        price: 80000,
        image: null,
      },
      {
        id: "goi-bach-tuoc-sot-cay",
        name: { en: "Octopus with Spicy Sauce", vi: "Gỏi bạch tuộc sốt cay" },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "goi-muc-sot-cay",
        name: { en: "Squid with Spicy Sauce", vi: "Gỏi mực sốt cay" },
        price: 80000,
        image: null,
        tags: ["spicy"],
      },
      {
        id: "goi-bo-ca-phao",
        name: { en: "Beef Salad with Thai Eggplant", vi: "Gỏi bò cà pháo" },
        price: 80000,
        image: null,
      },
    ],
  },
  {
    id: "fried-foods",
    en: "Fried Foods",
    vi: "Món Chiên",
    items: [
      {
        id: "dau-khuon-chien",
        name: { en: "Fried Tofu Skin", vi: "Đậu khuôn chiên" },
        price: 40000,
        image: null,
      },
      {
        id: "khoai-tay-chien",
        name: { en: "Fried Potato", vi: "Khoai tây chiên" },
        price: 45000,
        image: null,
      },
      {
        id: "cha-bap",
        name: { en: "Corn Rolls", vi: "Chả bắp" },
        price: 70000,
        image: null,
      },
      {
        id: "cha-gio",
        name: { en: "Fried Spring Rolls", vi: "Chả giò" },
        price: 70000,
        image: null,
      },
      {
        id: "cha-ca-thai",
        name: { en: "Thai Fish Cake", vi: "Chả cá Thái" },
        price: 75000,
        image: null,
      },
      {
        id: "cha-tom",
        name: { en: "Fried Shrimp Cake", vi: "Chả tôm" },
        price: 80000,
        image: null,
      },
      {
        id: "canh-ga-chien-mam",
        name: { en: "Fried Chicken Wings", vi: "Cánh gà chiên mắm" },
        price: 75000,
        image: null,
      },
      {
        id: "canh-ga-chiang-mai",
        name: { en: "Thai Fried Chicken Wings", vi: "Cánh gà Chiang Mai" },
        price: 75000,
        image: null,
      },
      {
        id: "sun-ga-chien-mam",
        name: {
          en: "Fried Chicken Wings Cartilage with sauce",
          vi: "Sụn gà chiên mắm",
        },
        price: 75000,
        image: null,
      },
      {
        id: "ga-la-dua",
        name: { en: "Chicken Roll Pandan", vi: "Gà lá dứa" },
        price: 75000,
        image: null,
      },
      {
        id: "tom-rang-muoi",
        name: { en: "Salt Fried Shrimp", vi: "Tôm rang muối" },
        price: 80000,
        image: null,
      },
      {
        id: "ca-chien-mam-thai",
        name: {
          en: "Fried Red Tilapia/Snakehea with Thai Sauce",
          vi: "Cá Diêu Hồng/Cá Lóc Chiên mắm Thái",
        },
        price: 140000,
        image: null,
      },
      {
        id: "ech-chien-mam",
        name: { en: "Fried frog with Thai Sauce", vi: "Ếch chiên mắm Thái" },
        price: 80000,
        image: null,
      },
    ],
  },
  {
    id: "foods-with-rice",
    en: "Foods with Rice",
    vi: "Món Ăn Cùng Cơm",
    items: [
      {
        id: "heo-xao-moi-thai",
        name: { en: "Thai Fried Pork", vi: "Heo xào Mọi Thái" },
        price: 80000,
        image: null,
      },
      {
        id: "bo-xao-moi-thai",
        name: { en: "Thai Fried Beef", vi: "Bò xào Mọi Thái" },
        price: 90000,
        image: null,
      },
      {
        id: "bo-xao-luc-lac",
        name: { en: "Shaking Beef", vi: "Bò xào lúc lắc" },
        price: 90000,
        image: null,
      },
      {
        id: "heo-bam-xao-la-que",
        name: {
          en: "Stir-fried Minced Pork with Basil",
          vi: "Heo bằm xào lá quế",
        },
        price: 85000,
        image: null,
      },
      {
        id: "ga-bam-xao-la-que",
        name: {
          en: "Stir-fried Minced Chicken with Basil",
          vi: "Gà bằm xào lá quế",
        },
        price: 85000,
        image: null,
      },
      {
        id: "ga-xao-hat-dieu",
        name: { en: "Stir-fried Chicken with Cashew", vi: "Gà xào hạt điều" },
        price: 85000,
        image: null,
      },
      {
        id: "tom-xao-hat-dieu",
        name: { en: "Stir-fried Shrimp with Cashew", vi: "Tôm xào hạt điều" },
        price: 85000,
        image: null,
      },
      {
        id: "tomyum-xao-hai-san",
        name: { en: "Tomyum Stir-fried Seafood", vi: "Tomyum xào hải sản" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "foods-with-bread",
    en: "Foods with Bread",
    vi: "Món Ăn Cùng Bánh Mỳ",
    items: [
      {
        id: "bo-vien-sot-me",
        name: { en: "Beef Ball with Tamarind Sauce", vi: "Bò viên sốt me" },
        price: 80000,
        image: null,
      },
      {
        id: "ca-vien-sot-me",
        name: { en: "Fish Ball with Tamarind Sauce", vi: "Cá viên sốt me" },
        price: 75000,
        image: null,
      },
      {
        id: "ngheu-sot-me",
        name: { en: "Scallop with Tamarind Sauce", vi: "Nghêu sốt me" },
        price: 75000,
        image: null,
      },
      {
        id: "ech-xao-sa-ot",
        name: {
          en: "Stir-fried Frog with Lemongrass & Chili",
          vi: "Ếch xào sả ớt",
        },
        price: 80000,
        image: null,
      },
      {
        id: "tom-rang-me",
        name: { en: "Shrimp with Tamarind Sauce", vi: "Tôm rang me" },
        price: 90000,
        image: null,
      },
      {
        id: "ech-sot-chua-ngot",
        name: { en: "Sweet & Sour Frog", vi: "Ếch sốt chua ngọt" },
        price: 80000,
        image: null,
      },
      {
        id: "bo-keo-phao",
        name: { en: "Beef Strips", vi: "Bò kéo pháo" },
        price: 80000,
        image: null,
      },
    ],
  },
  {
    id: "pho-xao-kieu-thai",
    en: "Pad Thai",
    vi: "Pad Thai",
    items: [
      {
        id: "pad-thai-nam",
        name: { en: "Pad Thai with Mushroom", vi: "Pad Thai nấm" },
        price: 70000,
        image: null,
      },
      {
        id: "pad-thai-ga",
        name: { en: "Pad Thai with Chicken", vi: "Pad Thai gà" },
        price: 75000,
        image: null,
      },
      {
        id: "pad-thai-heo",
        name: { en: "Pad Thai with Pork", vi: "Pad Thai heo" },
        price: 75000,
        image: null,
      },
      {
        id: "pad-thai-bo",
        name: { en: "Pad Thai with Beef", vi: "Pad Thai bò" },
        price: 85000,
        image: null,
      },
      {
        id: "pad-thai-tom",
        name: { en: "Pad Thai with Shrimp", vi: "Pad Thai tôm" },
        price: 85000,
        image: null,
      },
      {
        id: "pad-thai-hai-san",
        name: { en: "Pad Thai with Seafood", vi: "Pad Thai hải sản" },
        price: 90000,
        image: null,
      },
      {
        id: "pad-thai-thap-cam",
        name: { en: "Mixed Pad Thai", vi: "Pad Thai thập cẩm" },
        price: 95000,
        image: null,
      },
      {
        id: "pad-thai-dac-biet",
        name: { en: "Special Pad Thai", vi: "Pad Thai đặc biệt" },
        price: 105000,
        image: null,
      },
    ],
  },
  {
    id: "my-xao",
    en: "Stir-fried Egg Noodles",
    vi: "MỲ XÀO",
    items: [
      {
        id: "my-xao-nam",
        name: { en: "Stir-fried Noodles with Mushroom", vi: "Mỳ xào nấm" },
        price: 70000,
        image: null,
      },
      {
        id: "my-xao-ga",
        name: { en: "Stir-fried Noodles with Chicken", vi: "Mỳ xào gà" },
        price: 75000,
        image: null,
      },
      {
        id: "my-xao-heo",
        name: { en: "Stir-fried Noodles with Pork", vi: "Mỳ xào heo" },
        price: 75000,
        image: null,
      },
      {
        id: "my-xao-bo",
        name: { en: "Stir-fried Noodles with Beef", vi: "Mỳ xào bò" },
        price: 85000,
        image: null,
      },
      {
        id: "my-xao-hai-san",
        name: { en: "Stir-fried Noodles with Seafood", vi: "Mỳ xào hải sản" },
        price: 90000,
        image: null,
      },
      {
        id: "my-xao-tom",
        name: { en: "Stir-fried Noodles with Shrimp", vi: "Mỳ xào tôm" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "com-chien-ruoc",
    en: "Fried Rice with Shrimp Paste",
    vi: "CƠM CHIÊN RUỐC",
    items: [
      {
        id: "com-chien-ruoc-tom-kho-ruoc",
        name: {
          en: "Fried Rice with Dried Shrimp",
          vi: "Cơm chiên ruốc tôm khô ruốc",
        },
        price: 75000,
        image: null,
      },
      {
        id: "com-chien-ruoc-lap-xuong",
        name: {
          en: "Fried Rice with Chinese Sausage",
          vi: "Cơm chiên ruốc lạp xưởng",
        },
        price: 75000,
        image: null,
      },
      {
        id: "com-chien-ruoc-heo",
        name: { en: "Fried Rice with Pork", vi: "Cơm chiên ruốc heo" },
        price: 80000,
        image: null,
      },
      {
        id: "com-chien-ruoc-tom",
        name: { en: "Fried Rice with Shrimp", vi: "Cơm chiên ruốc tôm" },
        price: 85000,
        image: null,
      },
      {
        id: "com-chien-ruoc-hai-san",
        name: { en: "Fried Rice with Seafood", vi: "Cơm chiên ruốc hải sản" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "com-chien-thom",
    en: "Pineapple Fried Rice",
    vi: "CƠM CHIÊN THƠM",
    items: [
      {
        id: "com-chien-thom-ga",
        name: {
          en: "Pineapple Fried Rice with Chicken",
          vi: "Cơm chiên trái thơm gà",
        },
        price: 75000,
        image: null,
      },
      {
        id: "com-chien-thom-heo",
        name: {
          en: "Pineapple Fried Rice with Pork",
          vi: "Cơm chiên trái thơm heo",
        },
        price: 75000,
        image: null,
      },
      {
        id: "com-chien-thom-tom",
        name: {
          en: "Pineapple Fried Rice with Shrimp",
          vi: "Cơm chiên trái thơm tôm",
        },
        price: 85000,
        image: null,
      },
      {
        id: "com-chien-thom-bo",
        name: {
          en: "Pineapple Fried Rice with Beef",
          vi: "Cơm chiên trái thơm bò",
        },
        price: 85000,
        image: null,
      },
      {
        id: "com-chien-thom-hai-san",
        name: {
          en: "Pineapple Fried Rice with Seafood",
          vi: "Cơm chiên trái thơm hải sản",
        },
        price: 90000,
        image: null,
      },
    ],
  },
  {
    id: "com-chien",
    en: "Fried Rice",
    vi: "CƠM CHIÊN",
    items: [
      {
        id: "com-chien-trung",
        name: { en: "Fried Rice with Egg", vi: "Cơm chiên trứng" },
        price: 55000,
        image: null,
      },
      {
        id: "com-chien-toi",
        name: { en: "Garlic Fried Rice", vi: "Cơm chiên tỏi" },
        price: 60000,
        image: null,
      },
      {
        id: "com-chien-bap",
        name: { en: "Fried Rice with Corn", vi: "Cơm chiên bắp" },
        price: 55000,
        image: null,
      },
      {
        id: "com-chien-rau-cu",
        name: { en: "Fried Rice with Vegetables", vi: "Cơm chiên rau củ" },
        price: 65000,
        image: null,
      },
      {
        id: "com-chien-duong-chau",
        name: { en: "Yangzhou Fried Rice", vi: "Cơm chiên dương châu" },
        price: 65000,
        image: null,
      },
      {
        id: "com-chien-tom",
        name: { en: "Fried Rice with Shrimp", vi: "Cơm chiên tôm" },
        price: 80000,
        image: null,
      },
      {
        id: "com-chien-hai-san",
        name: { en: "Fried Rice with Seafood", vi: "Cơm chiên hải sản" },
        price: 80000,
        image: null,
      },
      {
        id: "com-chien-mix-food",
        name: { en: "Mixed Fried Rice", vi: "Cơm chiên Mix Food" },
        price: 85000,
        image: null,
      },
      {
        id: "com-chien-bo",
        name: { en: "Fried Rice with Beef", vi: "Cơm chiên bò" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "mon-hap-ham",
    en: "Steam - Stew Food",
    vi: "MÓN HẤP - HẦM",
    items: [
      {
        id: "ngheu-hap-thai",
        name: { en: "Thai Steamed Scallop", vi: "Nghêu hấp Thái" },
        price: 70000,
        image: null,
      },
      {
        id: "tom-hap",
        name: { en: "Steamed Shrimp", vi: "Tôm hấp" },
        price: 80000,
        image: null,
      },
      {
        id: "xuong-ham-chua-cay",
        name: { en: "Spicy & Sour Bone Stew", vi: "Xương hầm chua cay" },
        price: 115000,
        image: null,
      },
    ],
  },
  {
    id: "ca-ri-do-com",
    en: "Red Curry + Rice",
    vi: "CÀ RI ĐỎ + CƠM",
    items: [
      {
        id: "ca-ri-do-nam",
        name: { en: "Red Curry with Mushroom", vi: "Cà ri đỏ nấm" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-do-ga",
        name: { en: "Red Curry with Chicken", vi: "Cà ri đỏ gà" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-do-heo",
        name: { en: "Red Curry with Pork", vi: "Cà ri đỏ heo" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-do-bo",
        name: { en: "Red Curry with Beef", vi: "Cà ri đỏ bò" },
        price: 85000,
        image: null,
      },
      {
        id: "ca-ri-do-hai-san",
        name: { en: "Red Curry with Seafood", vi: "Cà ri đỏ hải sản" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "ca-ri-xanh-com",
    en: "Green Curry + Rice",
    vi: "CÀ RI XANH + CƠM",
    items: [
      {
        id: "ca-ri-xanh-nam",
        name: { en: "Green Curry with Mushroom", vi: "Cà ri xanh nấm" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-xanh-ga",
        name: { en: "Green Curry with Chicken", vi: "Cà ri xanh gà" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-xanh-heo",
        name: { en: "Green Curry with Pork", vi: "Cà ri xanh heo" },
        price: 75000,
        image: null,
      },
      {
        id: "ca-ri-xanh-bo",
        name: { en: "Green Curry with Beef", vi: "Cà ri xanh bò" },
        price: 85000,
        image: null,
      },
      {
        id: "ca-ri-xanh-hai-san",
        name: { en: "Green Curry with Seafood", vi: "Cà ri xanh hải sản" },
        price: 85000,
        image: null,
      },
    ],
  },
  {
    id: "tomyum",
    en: "Tomyum",
    vi: "TOMYUM",
    items: [
      {
        id: "tomyum-nam",
        name: { en: "Tomyum with Mushroom", vi: "Tomyum Nấm" },
        price: 70000,
        image: null,
      },
      {
        id: "tomyum-ngheu",
        name: { en: "Tomyum with Scallop", vi: "Tomyum Nghêu" },
        price: 75000,
        image: null,
      },
      {
        id: "tomyum-heo",
        name: { en: "Tomyum with Pork", vi: "Tomyum Heo" },
        price: 75000,
        image: null,
      },
      {
        id: "tomyum-bo",
        name: { en: "Tomyum with Beef", vi: "Tomyum Bò" },
        price: 85000,
        image: null,
      },
      {
        id: "tomyum-tom",
        name: { en: "Tomyum with Shrimp", vi: "Tomyum Tôm" },
        price: 85000,
        image: null,
      },
      {
        id: "tomyum-ca-file",
        name: { en: "Tomyum with Basa Fillet", vi: "Tomyum Cá Filê" },
        price: 80000,
        image: null,
      },
      {
        id: "tomyum-hai-san",
        name: { en: "Tomyum with Seafood", vi: "Tomyum Hải sản" },
        price: 90000,
        image: null,
      },
      {
        id: "tomyum-dac-biet",
        name: { en: "Special Tomyum", vi: "Tomyum Đặc Biệt" },
        price: 95000,
        image: null,
      },
    ],
  },
  {
    id: "bun-thai",
    en: "Thai Noodles",
    vi: "BÚN THÁI",
    items: [
      {
        id: "bun-thai-hai-san",
        name: { en: "Thai Noodles with Seafood", vi: "Bún thái hải sản" },
        price: 50000,
        image: null,
      },
      {
        id: "bun-thai-bo",
        name: { en: "Thai Noodles with Beef", vi: "Bún thái bò" },
        price: 50000,
        image: null,
      },
      {
        id: "bun-thai-dac-biet",
        name: { en: "Special Thai Noodles", vi: "Bún thái đặc biệt" },
        price: 60000,
        image: null,
      },
    ],
  },
  {
    id: "lau-thai",
    en: "Thai Hotpot - Team 2 People",
    vi: "LẨU THÁI",
    items: [
      {
        id: "lau-nam",
        name: { en: "Mushroom Hotpot", vi: "Lẩu nấm" },
        price: 80000,
        image: null,
      },
      {
        id: "lau-ca-basa",
        name: { en: "Basa Fish Hotpot", vi: "Lẩu cá basa" },
        price: 80000,
        image: null,
      },
      {
        id: "lau-ngheu-nam",
        name: { en: "Scallop & Mushroom Hotpot", vi: "Lẩu Nghêu & Nấm" },
        price: 80000,
        image: null,
      },
      {
        id: "lau-hai-san",
        name: { en: "Seafood Hotpot", vi: "Lẩu Hải sản" },
        price: 90000,
        image: null,
      },
      {
        id: "lau-ca-loc-chien",
        name: { en: "Fried Snakehead Hotpot", vi: "Lẩu Cá Lóc chiên" },
        price: 90000,
        image: null,
      },
      {
        id: "lau-nam-hai-san",
        name: { en: "Mushroom & Seafood Hotpot", vi: "Lẩu Nấm & Hải sản" },
        price: 110000,
        image: null,
      },
      {
        id: "lau-bo-nhung-ot",
        name: { en: "Beef with Chili Hotpot", vi: "Lẩu Bò nhúng ớt" },
        price: 90000,
        image: null,
      },
      {
        id: "lau-bach-tuoc-cay",
        name: { en: "Spicy Octopus Hotpot", vi: "Lẩu Bạch tuộc cay" },
        price: 90000,
        image: null,
      },
      {
        id: "lau-bo-nam",
        name: { en: "Beef & Mushroom Hotpot", vi: "Lẩu Bò & Nấm" },
        price: 95000,
        image: null,
      },
      {
        id: "lau-tomyum-ech",
        name: { en: "Tomyum Frog Hotpot", vi: "Lẩu tomyum ếch" },
        price: 110000,
        image: null,
      },
    ],
  },
  {
    id: "lau-thai-3-4-people",
    en: "Thai Hotpot - Team 3-4 People",
    vi: "LẨU THÁI LỚN",
    items: [
      {
        id: "lau-ca-loc-chien-nguyen-con",
        name: {
          en: "Whole Fried Snakehead Hotpot",
          vi: "Lẩu cá lóc chiên nguyên con",
        },
        price: 165000,
        image: null,
      },
      {
        id: "combo-lau-nam",
        name: { en: "Mushroom Hotpot Combo", vi: "Combo Lẩu Nấm" },
        price: 165000,
        image: null,
      },
      {
        id: "combo-lau-hai-san",
        name: { en: "Seafood Hotpot Combo", vi: "Combo Lẩu Hải sản" },
        price: 175000,
        image: null,
      },
      {
        id: "combo-lau-nam-hai-san",
        name: {
          en: "Mushroom & Seafood Hotpot Combo",
          vi: "Combo Lẩu Nấm & Hải sản",
        },
        price: 175000,
        image: null,
      },
      {
        id: "combo-lau-bo-nam",
        name: { en: "Beef & Mushroom Hotpot Combo", vi: "Combo Lẩu Bò & Nấm" },
        price: 180000,
        image: null,
      },
      {
        id: "combo-lau-mix",
        name: {
          en: "Mixed Hotpot Combo",
          vi: "Combo Lẩu Mix: Bò, Nấm, Hải sản",
        },
        price: 210000,
        image: null,
      },
      {
        id: "set-lau-uyen-uong",
        name: { en: "Lovebirds Hotpot Set", vi: "SET LẨU UYÊN ƯƠNG" },
        price: 240000,
        image: null,
      },
    ],
  },
  {
    id: "mon-chay",
    en: "Vegetarian",
    vi: "MÓN CHAY",
    items: [
      {
        id: "goi-du-du-chay",
        name: { en: "Vegetarian Papaya Salad", vi: "Gỏi đu đủ chay" },
        price: 45000,
        image: null,
      },
      {
        id: "rau-cu-xao",
        name: { en: "Stir-fried Vegetables", vi: "Rau củ xào" },
        price: 50000,
        image: null,
      },
      {
        id: "com-chien-chay",
        name: { en: "Vegetarian Fried Rice", vi: "Cơm chiên chay" },
        price: 60000,
        image: null,
      },
      {
        id: "cha-gio-chay",
        name: { en: "Vegetarian Spring Rolls", vi: "Chả giò chay" },
        price: 65000,
        image: null,
      },
      {
        id: "com-chien-thom",
        name: { en: "Pineapple Fried Rice", vi: "Cơm chiên thơm" },
        price: 70000,
        image: null,
      },
      {
        id: "pad-thai-chay",
        name: { en: "Vegetarian Pad Thai", vi: "Pad Thai chay" },
        price: 70000,
        image: null,
      },
      {
        id: "goi-nam-chay",
        name: { en: "Vegetarian Mushroom Salad", vi: "Gỏi nấm chay" },
        price: 70000,
        image: null,
      },
      {
        id: "my-xao-chay",
        name: { en: "Vegetarian Stir-fried Noodles", vi: "Mỳ xào chay" },
        price: 70000,
        image: null,
      },
      {
        id: "tomyum-chay",
        name: { en: "Vegetarian Tomyum", vi: "Tomyum chay" },
        price: 70000,
        image: null,
      },
      {
        id: "lau-chay",
        name: { en: "Vegetarian Hotpot", vi: "Lẩu chay" },
        price: 75000,
        image: null,
      },
      {
        id: "nam-xao-chay-com",
        name: { en: "Stir-fried Mushroom with Rice", vi: "Nấm xào chay + Cơm" },
        price: 75000,
        image: null,
      },
      {
        id: "nam-xao-chua-ngot-com",
        name: {
          en: "Sweet & Sour Mushroom with Rice",
          vi: "Nấm xào chua ngọt + Cơm",
        },
        price: 75000,
        image: null,
      },
      {
        id: "nam-xao-la-que-com",
        name: { en: "Basil Mushroom with Rice", vi: "Nấm xào lá quế + Cơm" },
        price: 75000,
        image: null,
      },
    ],
  },
  {
    id: "desserts",
    en: "Desserts",
    vi: "Món Tráng Miệng",
    items: [
      {
        id: "xoi-xoai",
        name: { en: "Mango Sticky Rice", vi: "Xôi Xoài" },
        price: 50000,
        image: null,
      },
      {
        id: "khoai-so",
        name: { en: "Taro Cakes", vi: "Khoai Sọ (Viên)" },
        price: 18000,
        image: null,
      },
    ],
  },
  {
    id: "drinks",
    en: "Drinks",
    vi: "Thức Uống",
    items: [
      {
        id: "tra-tac",
        name: { en: "Kumquat Tea", vi: "Trà Tắc" },
        price: 17000,
        image: null,
      },
      {
        id: "chanh-tuoi",
        name: { en: "Fresh Lemonade", vi: "Chanh Tươi" },
        price: 17000,
        image: null,
      },
      {
        id: "chanh-sa",
        name: { en: "Lemongrass Lemonade", vi: "Chanh Sả" },
        price: 22000,
        image: null,
      },
      {
        id: "chanh-day",
        name: { en: "Passion Fruit Juice", vi: "Chanh dây" },
        price: 22000,
        image: null,
      },
      {
        id: "thom-ep",
        name: { en: "Pineapple Juice", vi: "Thơm ép" },
        price: 22000,
        image: null,
      },
      {
        id: "ca-rot",
        name: { en: "Carrot Juice", vi: "Cà Rốt Ép" },
        price: 22000,
        image: null,
      },
      {
        id: "ca-chua",
        name: { en: "Tomato Juice", vi: "Cà Chua Ép" },
        price: 22000,
        image: null,
      },
      {
        id: "dua-hau",
        name: { en: "Watermelon Juice", vi: "Dưa Hấu Ép" },
        price: 22000,
        image: null,
      },
      {
        id: "oi",
        name: { en: "Guava Juice", vi: "Ổi Ép" },
        price: 22000,
        image: null,
      },
      {
        id: "cam",
        name: { en: "Orange Juice", vi: "Cam Ép" },
        price: 27000,
        image: null,
      },
      {
        id: "sinh-to-xoai",
        name: { en: "Mango Smoothie", vi: "Sinh Tố Xoài" },
        price: 27000,
        image: null,
      },
    ],
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN").format(price) + " VND";
