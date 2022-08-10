import { Injectable } from '@angular/core';

/** Service turns youtube player on and off. */
@Injectable({
  providedIn: 'root',
})
export class YouTubePlayerService {
  private youTubeApiTag?: HTMLScriptElement;

  /** On youtube api service. */
  public onYouTubeApi(): void {
    this.youTubeApiTag = document.createElement('script');
    this.youTubeApiTag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(this.youTubeApiTag);
  }

  /** Off youtube api service. */
  public offYouTubeApi(): void {
    if (this.youTubeApiTag !== undefined) {
      document.body.removeChild(this.youTubeApiTag);
    }
  }
}
