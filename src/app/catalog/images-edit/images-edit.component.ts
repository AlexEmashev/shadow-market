import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ImageElement, ImageState } from './image_element';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Component for adding and removing images on form.
 */
 export interface popo{
   popo?:string,
   zozo: string
 }
@Component({
  selector: 'app-images-edit',
  templateUrl: './images-edit.component.html',
  styleUrls: ['./images-edit.component.scss'],
})
export class ImagesEditComponent implements ControlValueAccessor, OnInit {
  private _onChange: any;
  private _onTouched: any;
  private imageSet: ImageElement[];
  /**
   * Array of images.
   */
  @Input() images: string[];
  /**
   * Fires when image added.
   * Payload: image coded in Base64
   */
  @Output() onImageAdded: EventEmitter<string|number> = new EventEmitter();
  /**
   * Fires when image deleted.
   * Payload: image url on server.
   */
  @Output() onImageDeleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.imageSet = this.initImages(this.images);
  }

  writeValue(obj: any): void {
    this.initImages(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }

  initImages(imagesAry: string[]): ImageElement[] {
    // Construct internal representation of images.
    return imagesAry.map(img_url => {
      return { url: img_url, state: ImageState.not_changed }
    });
  }

  /**
   * Attaches image
   */
  private attachImage(files: any) {
    for (let i = 0; i < files.length; i++) {
      this.getBase64(files[i]);
    }
  }

  /**
   * Removes image from internal presentation collection.
   */
  private onRemoveItemClick(index: number) {
    this.imageSet[index].state = ImageState.deleted;
    // Send event outside, item has been deleted
    this.onImageDeleted.emit(this.imageSet[index].url);

    if (typeof(this._onChange) === 'function') {
      this._onChange(this.imageSet);
    }

    if (typeof(this._onTouched) === 'function') {
      this._onTouched(this.imageSet);
    }
  }

  /**
   * Encodes passed file to Base64
   */
  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSet.unshift({ url: reader.result, state: ImageState.added });
      // Send event outside, item has been added
      this.onImageAdded.emit(reader.result);
      // Trigger element changed.
      if (typeof(this._onChange) === 'function') {
        this._onChange(this.imageSet);
      }

      if (typeof(this._onTouched) === 'function') {
        this._onTouched(this.imageSet);
      }
    };
    reader.onerror = () => { console.log("Base64 image:", reader.result); };
  }
}
