import axios from "@/lib/axios";
import { Category, MenuItem } from "@/types";

interface MenuItemResponse {
  id: number;
  identifier: string;
  name: string; // JSON string {en: "...", vn: "..."}
  price: number;
  image: string | null;
  tags: string | null; // JSON string or null
  categoryId: number;
  isActive: boolean;
  category: {
    id: number;
    name: string; // JSON string {en: "...", vn: "..."}
  };
}

interface CategoryResponse {
  id: number;
  name: string; // JSON string {en: "...", vn: "..."}
  products: MenuItemResponse[];
}

const parseName = (nameString: string): { en: string; vn: string } => {
  try {
    return JSON.parse(nameString);
  } catch {
    return { en: nameString, vn: nameString };
  }
};

const parseTags = (tagsString: string | null): string[] => {
  if (!tagsString) return [];
  try {
    return JSON.parse(tagsString);
  } catch {
    return [];
  }
};

const transformMenuItem = (menuItem: MenuItemResponse): MenuItem => ({
  id: menuItem.identifier,
  name: parseName(menuItem.name),
  price: menuItem.price,
  image: menuItem.image,
  tags: parseTags(menuItem.tags) as any,
});

const transformCategory = (category: CategoryResponse): Category => ({
  id: `category-${category.id}`,
  en: parseName(category.name).en,
  vn: parseName(category.name).vn,
  items: category.products
    .filter((menuItem) => menuItem.isActive)
    .map(transformMenuItem),
});

export const menuService = {
  async getAllCategories(): Promise<Category[]> {
    const response = await axios.get<CategoryResponse[]>("/categories");
    return response.data.map(transformCategory);
  },

  async getAllMenuItems(): Promise<MenuItem[]> {
    const response = await axios.get<MenuItemResponse[]>("/products");
    return response.data
      .filter((menuItem) => menuItem.isActive)
      .map(transformMenuItem);
  },
};
