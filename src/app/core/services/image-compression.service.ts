import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

  constructor() { }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth = 400, maxHeight = 400) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  compress(file: File): Observable<any> {
    const width = 800; // For scaling relative to width
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create((observer) => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas'); // Use Angular's Renderer2 method
          elem.width = this.calculateAspectRatioFit(img.width, img.height).width;
          elem.height = this.calculateAspectRatioFit(img.width, img.height).height;
          const ctx = elem.getContext('2d') as CanvasRenderingContext2D;
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          ctx.canvas.toBlob(
            blob => { 
              observer.next(
                new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }),
              );
            },
            'image/jpeg',
            1,
          );
        }),
          (reader.onerror = error => observer.error(error));
      };
    });
  }
}