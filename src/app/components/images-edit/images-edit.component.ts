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
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ImageElement, ImageState } from '../../shared/image_element';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Validates ImagesEditComponent.
 * At least one image is required.
 */
export function ValidateImages(c: FormControl) {
  // Control should have at lease one image. This image shouldn't be deleted.
  const presentedElements: ImageElement[] = c.value.filter((item: ImageElement) => {
    return item.state === ImageState.added || item.state === ImageState.not_changed;
  });
  return presentedElements.length > 0 ? null :
    {ValidateImages: {valid: false}};
}

/**
 * Form control for manipulating images.
 * Usage in reactive forms:
  <app-images-edit formControlName="photos"
   (imageAdded)="imageAdded(base64)"
   (imageDeleted)="imageDeleted(url)">
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
  }
]
})
export class ImagesEditComponent implements ControlValueAccessor, OnInit {
  @Input() disabled = false;

  /**
   * Represents current set of images
   */
  value: ImageElement[];

  /**
   * Fires when image added.
   * Payload: image coded in Base64
   */
  @Output() imageAdded: EventEmitter<string> = new EventEmitter();
  /**
   * Fires when image deleted.
   * Payload: image url on server.
   */
  @Output() imageDeleted: EventEmitter<string> = new EventEmitter();

  private onChange = (value: ImageElement[]) => {};
  private onTouched = () => {} ;

  constructor() { }

  ngOnInit() {
    this.disabled = false;
  }


///////// Start ControlValueAccessor interface implementation

  writeValue(images: ImageElement[]): void {
    this.value = images;
  }

  registerOnChange(fn: (value: ImageElement[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  touchControl() {
    this.onTouched();
  }
//////////////// End ControlValueAccessor interface implementation

  /**
   * Attaches image to the item.
   */
  public attachImage(files: any) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        this.value.unshift({ url: reader.result.toString(), state: ImageState.added });
        // Send image added event outside.
        this.imageAdded.emit(reader.result.toString());
        // Trigger element changed.
        this.onChange(this.value);
      };
      reader.onerror = () => { console.log('Base64 image:', reader.result); };
    }
  }

  /**
   * Removes image from internal presentation collection.
   */
  private onRemoveItemClick(index: number) {
    this.value[index].state = ImageState.deleted;
    this.imageDeleted.emit(this.value[index].url);
    this.onChange(this.value);
    this.onTouched();
  }
}
