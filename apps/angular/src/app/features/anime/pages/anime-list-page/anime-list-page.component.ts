import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime List Page. */
@Component({
  selector: 'camp-anime-list-page',
  templateUrl: './anime-list-page.component.html',
  styleUrls: ['./anime-list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeListPageComponent {}
