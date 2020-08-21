import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shimmer',
  templateUrl: './shimmer.component.html',
  styleUrls: ['./shimmer.component.scss']
})
export class ShimmerComponent implements OnInit {

  private colors = {
    PRIMARY: '#919191',
    SECONDARY: '#8e93ad',
    TERTIARY: '#878787'
  };


  @Input() role: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() mode: 'rounded' | 'linear' = 'linear';

  @Input() width: number;
  @Input() height = 30;

  @Input() isFetching: boolean;

  @ViewChild('actualContent') el: HTMLDivElement;

  ngOnInit(): void {
    if (!this.width || !this.height) {
      throw new Error('ShimmerComponent needs a size');
    }
  }

  get color(): string {
    return this.colors[this.role.toUpperCase()];
  }

}
