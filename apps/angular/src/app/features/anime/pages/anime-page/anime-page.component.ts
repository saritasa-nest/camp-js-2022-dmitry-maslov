import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime Page. */
@Component({
  selector: 'camp-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent {}
