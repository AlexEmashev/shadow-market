import { ImageElement, ImageState } from './images-edit/image_element';

/**
 * Describes single catalog item.
 */
export interface CatalogItem {
  /** Id of an item */
  id: number;
  /** Id of item owner */
  user_id: number;
  /** Name of item */
  title: string;
  /** Item description */
  description: string;
  /** Links to item photos */
  photos: ImageElement[];
  /** Item price */
  price: number;
  /** Likes count of item */
  likes: number;
  /** Number of views of item */
  views: number;
}
