/**
 * Implements internal image set.
 */
export interface ImageElement {
  url: string;
  state: ImageState;
}

/**
 * State of image in collection
 */
export enum ImageState {
  added = 0,
  deleted = 1,
  not_changed = 2
}
