import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { map, Observable, switchMap, tap } from 'rxjs';

/** Edit anime page component. */
@Component({
  selector: 'camp-edit-anime-page',
  templateUrl: './edit-anime-page.component.html',
  styleUrls: ['./edit-anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAnimePageComponent {
  /** Anime. */
  public readonly anime$: Observable<Anime>;

  public constructor(route: ActivatedRoute, animeService: AnimeService) {
    this.anime$ = route.paramMap.pipe(
      map(paramMap => parseInt(paramMap.get('id') ?? '', 10)),
      switchMap(id => animeService.getAnime(id)),
    );
  }
}
