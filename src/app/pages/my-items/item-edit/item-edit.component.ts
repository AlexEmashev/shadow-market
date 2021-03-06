import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CatalogItem } from '../../../shared/catalog-item';
import { CatalogService } from '../../../shared/catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidateImages } from '../../../components/images-edit/images-edit.component';
import { ImageElement, ImageState } from '../../../shared/image_element';
import { UserSettingsService } from '../../../shared/user-settings.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppRoles } from '../../../shared/user-settings';
import { Store } from '@ngrx/store';
import * as fromReducer from '../../../shared/reducers/reducers';

export function ValidatePrice(c: FormControl) {
  return Number.parseFloat(c.value) < 1000 ? null : {ValidatePrice: {valid: false}};
}

@Component({
  selector: 'app-catalog-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit, OnChanges {
  /**
   * Current catalog item.
   */
  item: CatalogItem = {
    id: null,
    user_id: null,
    user_name: '',
    title: null,
    description: null,
    photos: [],
    price: null,
    likes: [],
    views: 0
  };
  placeholderItemTitle: string;
  placeholderDescription: string;
  placeholderPrice: string;
  // Workaround for images edit form control.
  submitClicked = false;

  /**
   * Form groups.
   */
  formItemEdit: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromReducer.State>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userSettings: UserSettingsService,
    private catalogService: CatalogService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => { this.localizeComponents(); });
    this.localizeComponents();
    // If ID is among the parameters, load image. In other case, form in creating mode.
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.getItem(+this.route.snapshot.paramMap.get('id'))
        .subscribe((item) => this.initForm(item));
    } else {
      this.initForm(this.item);
    }

    // When user sign outs redirect them to catalog page.
    this.store.subscribe(state => {
      if (state.user.role === AppRoles.guest) {
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Initializes form with empty values.
   */
  initForm(item: CatalogItem): void {
    // Make a copy of passed object.
    Object.assign(this.item, item);
    this.item.photos = item.photos.map(photo => {
      const newPhoto: ImageElement = {url: photo.url, state: photo.state};
      return newPhoto; });

    this.formItemEdit = this.formBuilder.group({
      title: [this.item.title, [Validators.required, Validators.minLength(4)]],
      description: [this.item.description, [Validators.required, Validators.minLength(10)]],
      photos: [this.item.photos, [ValidateImages]],
      price: [this.item.price, [Validators.required, Validators.min(0), ValidatePrice]]
    });
  }

  /**
   * Correct localize elements when translation changed.
   */
  localizeComponents(): void {
    this.translate.get('catalogItemEdit.itemTitle').subscribe((res: string) => this.placeholderItemTitle = res);
    this.translate.get('catalogItemEdit.description').subscribe((res: string) => this.placeholderDescription = res);
    this.translate.get('catalogItemEdit.price').subscribe((res: string) => this.placeholderPrice = res);
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
    return this.catalogService.getItem(id);
  }

  /**
   * Prepare item to be sent to backend.
   */
  prepareSaveItem(): CatalogItem {
    // Get form data, which were entered by user
    const formData = this.formItemEdit.value;

    const saveItem: CatalogItem = {
      id: this.item.id,
      user_id: this.userSettings.id,
      user_name: this.userSettings.name,
      title: formData.title,
      description: formData.description,
      photos: formData.photos,
      price: formData.price,
      likes: this.item.likes,
      views: this.item.views
    };

    return saveItem;
  }

  /**
   * Allow to user to enter only digits.
   */
  onPriceChanged(value: string) {
    const prev_value = this.formItemEdit.get('price').value;

    if (value === '') {
      this.formItemEdit.get('price').setValue('');
    } else if (/^\d*\.?\d*$/.test(value)) {
      const new_value = (+value).toFixed(2);
      this.formItemEdit.get('price').setValue(new_value);
    } else {
      this.formItemEdit.get('price').setValue(prev_value);
    }
  }

  /**
   * Check user's price input on the fly.
   */
  onPriceKeyDown(e: KeyboardEvent): boolean {
    const new_char: string = e.key;
    const prev_value = this.formItemEdit.get('price').value;
    if (!/\./.test(prev_value) && new_char === '.') { // allow one dot only
      return true;
    } else if (/\d/.test(new_char)) { // Check if this is a digit, then allow it.
      return true;
    } else if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return true;
        } else {
          return false;
        }
  }

  /**
   * Returns to My items.
   */
  cancelClick(): void {
    this.location.back();
  }

  /**
   * Submits the item changes.
   */
  onSubmit(): void {
    this.submitClicked = true;
    if (this.formItemEdit.valid) {
      const newItem: CatalogItem = this.prepareSaveItem();
      if (newItem.id !== null) {
        this.catalogService.updateItem(newItem).subscribe(
          (result: boolean) => {
            if (result) {
              this.location.back();
            } else {
              console.log('🐞 Item hasn\'t been updated. Something went wrong.');
            }
          }
        );
      } else {
        this.catalogService.putItem(newItem).subscribe(
          (id: number) => {
          this.location.back();
          }
        );
      }
    } else {
      console.log('😡 Form is invalid!');
    }
  }

}
