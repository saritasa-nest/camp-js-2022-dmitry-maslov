import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

/** Anime Page. */
@Component({
  selector: 'camp-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent {
  /** Anime. */
  public readonly anime$: Observable<Anime>;

  public constructor(route: ActivatedRoute, animeService: AnimeService) {
    this.anime$ = route.paramMap
      .pipe(map(paramMap => parseInt(paramMap.get('id') ?? '', 10)))
      .pipe(switchMap(id => animeService.getAnime(id)));
    catchError((err: unknown) => of(err));
  }
}
