import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { validateImages } from '../images-edit/images-edit.component';
import { ImageElement, ImageState } from '../images-edit/image_element';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-catalog-item-edit',
  templateUrl: './catalog-item-edit.component.html',
  styleUrls: ['./catalog-item-edit.component.scss']
})
export class CatalogItemEditComponent implements OnInit, OnChanges {
  /**
   * Current catalog item.
   */
  item: CatalogItem;

  /**
   * Form groups.
   */
  formItemEdit: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userSettings: UserSettingsService,
    private catalogService: CatalogService ) { }

    /**
     * Initializes form.
     */
    ngOnInit(): void {
      // ToDo: actually get user id, not set it to null.
      // If ID is among the parameters, load image. In other case, form in creating mode.
      if (this.route.snapshot.paramMap.get('id') !== null) {
        this.getItem(+this.route.snapshot.paramMap.get('id'))
          .subscribe((item) => this.initForm(item));

      } else {
        const new_item = {
          id: null,
          user_id: null,
          title: null,
          description: null,
          photos: [],
          price: 0,
          likes: 0,
          views: 0
        }
        this.initForm(new_item);
      }
    }

  /**
   * Initializes form with empty values.
   */
  initForm(item): void {
    this.item = item;
    this.formItemEdit = this.formBuilder.group({
      title: [this.item.title, [Validators.required, Validators.minLength(4)]],
      description: [this.item.description, [Validators.required, Validators.minLength(10)]],
      photos: [this.item.photos, [validateImages]],
      price: [this.item.price, [Validators.min(0)]]
    });
  }

  /**
   * Updates form with current item values.
   */
  updateFormData(): void {
    this.formItemEdit.reset(
      {
        title: this.item.title,
        description: this.item.description,
        price: this.item.price,
        photos: this.item.photos
      });
    // this.setPhotos(this.item.photos);
  }

  /**
   * Happens when form edited.
   */
  ngOnChanges() {
    this.updateFormData();
  }

  /**
   * Returns item for editing.
   */
  getItem(id): Observable<CatalogItem> {
    return this.catalogService.getItem(id).pipe(map(item => this.item = item));
  }

  /**
   * Prepare item to be sent to backend.
   */
  prepareSaveItem(): CatalogItem {
    // Get form data, which were entered by user
    const formData = this.formItemEdit.value;

    const saveItem: CatalogItem = {
      id: this.item.id,
      user_id: this.item.user_id,
      title: formData.title,
      description: formData.description,
      photos: formData.photos,
      price: formData.price,
      likes: this.item.likes,
      views: this.item.views
    }

    return saveItem;
  }

  /**
   * Handler for adding image.
   */
  imageAdded(base64: string): void {
    // ToDo: imlement logic.
    // ToDo: Think through what to do, when item is in creating mode.
  }

  /**
   * Handler for deleting image.
   */
  imageDeleted(url: string): void {
    // ToDo: imlement logic.
    // ToDo: Think through what to do, when item is in creating mode.
  }

  /**
   * Allow to user to enter only digits.
   */
  onPriceChanged(value: string) {
    console.log("Key has been pressed",value);
    if (value === "") {
      this.formItemEdit.get('price').setValue(0);
    }
  }

  /**
   * Submits the item changes.
   */
  onSubmit() {
    this.prepareSaveItem();
  }

}
