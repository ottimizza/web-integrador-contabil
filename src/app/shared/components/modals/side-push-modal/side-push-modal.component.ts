
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-push-modal',
  templateUrl: './side-push-modal.component.html',
  styleUrls: ['./side-push-modal.component.scss']
})
export class SidePushModalComponent implements OnInit {

  @ViewChild('overlay', { static: true })
  public overlay: ElementRef;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.overlay.nativeElement.addEventListener('click', () => {
      // alert('as');
      // this.close();
    });

    //   // we added this so that when the backdrop is clicked the modal is closed.
    //   this.el.nativeElement.addEventListener('click', () => {
    //     this.close();
    //   });
  }

  close() {
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhidden');
  }

}
