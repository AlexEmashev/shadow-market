import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-route-not-allowed',
  templateUrl: './route-not-allowed.component.html',
  styleUrls: ['./route-not-allowed.component.scss']
})
export class RouteNotAllowedComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
