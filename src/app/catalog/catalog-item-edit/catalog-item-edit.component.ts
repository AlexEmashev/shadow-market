import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
    private catalogService: CatalogService ) {

    }

  /**
   * Initializes form with empty values.
   */
  initForm(): void {
    this.formItemEdit = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      photos: this.formBuilder.array([]),
      price: [0, [Validators.min(0)]]
    });
  }

  /**
   * Updates form with current item values.
   */
  updateFormData(): void {
    console.log('New change: ', this.item);
    this.formItemEdit.reset(
      {
        title: this.item.title,
        description: this.item.description,
        price: this.item.price
      });
    this.setPhotos(this.item.photos);
  }

  /**
   * Adds photos to the form.
   */
  setPhotos(photos: string[]): void {
    const photosFGs = photos.map(photo => this.formBuilder.group({"photo": photo}));
    const photoFormArray = this.formBuilder.array(photosFGs);
    this.formItemEdit.setControl('photos', photoFormArray);
  }

  /**
   * Initializes form.
   */
  ngOnInit(): void {
    this.initForm();
    this.getItem();
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
  getItem(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.catalogService.getItem(id)
      .pipe(map(item => this.item = item))
      .subscribe(item => this.updateFormData());
  }

  /**
   * Prepare item to be sent to backend.
   */
  prepareSaveItem(): CatalogItem {
    // Get form data, which were entered by user
    const formData = this.formItemEdit.value;
    console.log('Form data:', formData);
    const photos: string[] = formData.photos;

    const saveItem: CatalogItem = {
      id: this.item.id,
      user_id: this.item.user_id,
      title: formData.title,
      description: formData.description,
      photos: photos,
      price: formData.price,
      likes: this.item.likes,
      views: this.item.views
    }

    return saveItem;
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
    console.log("On Submit clicked!");
  }

}
