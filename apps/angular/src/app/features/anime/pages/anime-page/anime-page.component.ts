import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

/** Anime Page. */
@Component({
  selector: 'camp-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent {
  /** Anime ID. */
  public readonly animeId$: Observable<number>;

  public constructor(route: ActivatedRoute) {
    this.animeId$ = route.paramMap.pipe(
      map(paramMap => parseInt(paramMap.get('id') ?? '', 10)),
    );
  }
}
