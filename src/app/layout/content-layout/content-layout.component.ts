import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }

  public ngOnInit() {
    // this.route.queryParamMap.subscribe(queryParams => {
    //   console.log(queryParams);
    // });
  }
}
