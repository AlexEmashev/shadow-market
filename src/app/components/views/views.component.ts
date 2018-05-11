import { Component, OnInit, Input } from '@angular/core';
import { CatalogItem } from '../../shared/catalog-item';
import { CatalogService } from '../../shared/catalog.service';


@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  @Input() catalogItem: CatalogItem;
  @Input() bump: boolean;

  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
    if (this.bump) {
      this.catalogService.bumpView(this.catalogItem.id).subscribe();
    }
  }

}
