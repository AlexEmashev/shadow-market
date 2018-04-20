import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  documentURL: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.documentURL = document.location.href;
   }

  ngOnInit() {
  }

}
