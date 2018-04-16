import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ImageElement, ImageState } from './image_element';

/**
 * Component for adding and removing images on form.
 */
@Component({
  selector: 'app-images-edit',
  templateUrl: './images-edit.component.html',
  styleUrls: ['./images-edit.component.scss']
})
export class ImagesEditComponent implements OnInit {
  /**
   * Array of images.
   */
  @Input() images: string[];
  @ViewChild('imagesContainer') imagesContainer: ElementRef;
  /**
   * Internal representation of images.
   */
  imageSet: ImageElement[];

  constructor() {
  }

  ngOnInit() {
    // Construct internal representation of images.
    this.imageSet = this.images.map(img_url => {
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
  }

  /**
   * Encodes passed file to Base64
   */
  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSet.push({ url: reader.result, state: ImageState.added });
    };
    reader.onerror = () => { console.log("Base64 image:", reader.result); };
  }

  /**
   * Scrolls image container to the right.
   */
  scrollContainer() {

  }
}
