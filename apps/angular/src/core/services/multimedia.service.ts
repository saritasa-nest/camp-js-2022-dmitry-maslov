import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/** Multimedia service. Connects multimedia scripts. */
@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private youTubeApiTag?: HTMLScriptElement;

  public constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  /** Init YouTube player. */
  public initYouTubePlayer(): void {
    if (this.youTubeApiTag === undefined) {
      this.youTubeApiTag = document.createElement('script');
      this.youTubeApiTag.src = 'https://www.youtube.com/iframe_api';
      this.document.body.appendChild(this.youTubeApiTag);
    }
  }
}
