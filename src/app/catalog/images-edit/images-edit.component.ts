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
 * At least one image is required.
 */
export function validateImages(c: FormControl) {
  // Control should have at lease one image. This image shouldn't be deleted.
  const presentedElements: ImageElement[] = c.value.filter((item: ImageElement) => {
    return item.state === ImageState.added || item.state === ImageState.not_changed
  });
  return presentedElements.length > 0 ? null :
    {validateImages: {valid: false}};
}

/**
 * Form control for manipulating images.
 * Usage in reactive forms:
  <app-images-edit formControlName="photos"
   (onImageAdded)="imageAdded(base64)"
   (onImageDeleted)="imageDeleted(url)">
  </app-images-edit>
   <mat-error *ngIf="formItemEdit.get('photos').hasError('validateImages')">
     Please provide at least one image
   </mat-error>
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
  }


// Start ControlValueAccessor interface implementation

  writeValue(images: ImageElement[]): void {
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

  /**
   * Attaches image to the item.
   */
  private attachImage(files: any) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
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

  /**
   * Removes image from internal presentation collection.
   */
  private onRemoveItemClick(index: number) {
    //ToDo: If image just has been added we can delete it from collection.
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
}
