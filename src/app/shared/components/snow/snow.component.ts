import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.scss']
})
export class SnowComponent implements OnInit {

  public emojis = ['❄', '❅', '❆', '❉', '❊'];
  public particles = 35;
  public innerWidth = window.innerWidth;

  constructor(
    private renderer: Renderer2,
    public el: ElementRef
  ) {}

  ngOnInit(): void {
    this.createParticles();
  }

  private createParticles() {
    for (let i = 0; i < this.particles; i++) {
      const randomEmoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
      const emojiLeftPosition = (window.innerWidth / this.particles) * i;
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(randomEmoji);
      this.renderer.appendChild(span, text);
      this.renderer.addClass(span, 'snowflake');
      this.renderer.setStyle(span, 'left', `${emojiLeftPosition}px`);
      this.renderer.setStyle(span, 'animation-duration', (this.randomMinMax(3, 5) + 's', this.randomMinMax(3, 5) + 's'));
      this.renderer.setStyle(span, 'animation-delay', this.randomMinMax(0.3, 2));
      this.renderer.appendChild(this.el.nativeElement, span);
    }
  }

  private randomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
