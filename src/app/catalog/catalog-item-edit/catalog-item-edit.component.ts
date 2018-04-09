import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../catalog-item';
import { CatalogService } from '../catalog.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
    private catalogService: CatalogService ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.catalogService.getItem(id).subscribe( item => this.item = item);
  }

}
