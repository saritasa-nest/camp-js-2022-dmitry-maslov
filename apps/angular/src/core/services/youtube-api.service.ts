import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/** Service turns youtube player on and off. */
@Injectable({
  providedIn: 'root',
})
export class YouTubePlayerService {
  private youTubeApiTag?: HTMLScriptElement;

  public constructor(@Inject(DOCUMENT) private document: Document) {}

  /** On youtube api service. */
  public appendYouTubeApi(): void {
    if (this.youTubeApiTag === undefined) {
      this.youTubeApiTag = document.createElement('script');
      this.youTubeApiTag.src = 'https://www.youtube.com/iframe_api';
      this.document.body.appendChild(this.youTubeApiTag);
    }
  }
}
