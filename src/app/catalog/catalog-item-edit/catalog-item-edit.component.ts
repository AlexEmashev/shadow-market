import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog-item-edit',
  templateUrl: './catalog-item-edit.component.html',
  styleUrls: ['./catalog-item-edit.component.scss']
})
export class CatalogItemEditComponent implements OnInit {
  /**
   * Current catalog item.
   */
  item: CatalogItem;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private catalogService: CatalogService ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.catalogService.getItem(id).subscribe(
      item => this.item = item,
      error => console.error("Error occured", error),
      () => (!this.item)? this.navigateToNotAllowed():console.log('Completed!')
    );
  }

  navigateToNotAllowed(): void {
    this.router.navigate(['/not-allowed']);
    // this.location.go('/not-allowed');
  }

}
