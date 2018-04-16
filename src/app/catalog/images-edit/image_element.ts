/**
 * Implements internal image set.
 */
export interface ImageElement {
  url: string,
  state: ImageState
}

/**
 * State of image in collection
 */
export enum ImageState {
  added,
  deleted,
  not_changed
}
