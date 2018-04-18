import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  forwardRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageElement, ImageState } from './image_element';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Validates ImagesEditComponent.
 */
export function validateImages(c: ImagesEditComponent) {
  // Control should have at lease one image. This image shouldn't be deleted.
  const presentedElements: ImageElement[] = c.value.filter((item: ImageElement) => {
    return item.state === ImageState.added || item.state === ImageState.not_changed
  });
  console.log('Validation starts: ', presentedElements.length);
  console.log('Form value:', c.value);
  return presentedElements.length > 0 ? null :
    {validateImages: {valid: false}};
}

/**
 * Form control for manipulating with images.
 */
@Component({
  selector: 'app-images-edit',
  templateUrl: './images-edit.component.html',
  styleUrls: ['./images-edit.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImagesEditComponent),
    multi: true
  }]
})
export class ImagesEditComponent implements ControlValueAccessor, OnInit {
  private _onChange: any;
  private _onTouched: any;
  private isDisabled: boolean;
  /**
   * Represents current set of images
   */
  value: ImageElement[];
  /**
   * Array of images.
   */
  @Input() images: string[];
  /**
   * Fires when image added.
   * Payload: image coded in Base64
   */
  @Output() onImageAdded: EventEmitter<string> = new EventEmitter();
  /**
   * Fires when image deleted.
   * Payload: image url on server.
   */
  @Output() onImageDeleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.isDisabled = false;
    //this.value = this.initImages(this.images);
  }


// Start ControlValueAccessor interface implementation

  writeValue(images: ImageElement[]): void {
    console.log('!!! writeValue', images);
    this.value = images;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
// End ControlValueAccessor interface implementation


  // private initImages(imagesAry: string[]): ImageElement[] {
  //   // Construct internal representation of images.
  //   return imagesAry.map(img_url => {
  //     return { url: img_url, state: ImageState.not_changed }
  //   });
  // }

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
    this.value[index].state = ImageState.deleted;
    // Send event outside, item has been deleted
    this.onImageDeleted.emit(this.value[index].url);

    if (typeof(this._onChange) === 'function') {
      this._onChange(this.value);
    }

    if (typeof(this._onTouched) === 'function') {
      this._onTouched(this.value);
    }
  }

  /**
   * Encodes passed file to Base64
   */
  private getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.value.unshift({ url: reader.result, state: ImageState.added });
      // Send event outside, item has been added
      this.onImageAdded.emit(reader.result);
      // Trigger element changed.
      if (typeof(this._onChange) === 'function') {
        this._onChange(this.value);
      }

      if (typeof(this._onTouched) === 'function') {
        this._onTouched(this.value);
      }
    };
    reader.onerror = () => { console.log("Base64 image:", reader.result); };
  }
}
