/**
 * Describes single catalog item.
 */
export interface CatalogItem {
  id: number;
  user_id: number;
  title: string;
  description: string;
  photo_link: string;
  cost: number;
  likes: number;
  views: number;
}
