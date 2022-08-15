import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Anime } from '@js-camp/core/models/anime';
import {
  AnimeRating,
  ANIME_RATING_READABLE_MAP,
} from '@js-camp/core/models/anime-rating';
import { AnimeSeason, ANIME_SEASON_READABLE_MAP } from '@js-camp/core/models/anime-season';
import { AnimeSource, ANIME_SOURCE_READABLE_MAP } from '@js-camp/core/models/anime-source';
import {
  AnimeStatus,
  ANIME_STATUS_READABLE_MAP,
} from '@js-camp/core/models/anime-status';
import {
  AnimeType,
  ANIME_TYPE_READABLE_MAP,
} from '@js-camp/core/models/anime-type';
import { DateRange } from '@js-camp/core/models/date-range';

/** Anime manager component. */
@Component({
  selector: 'camp-anime-manager',
  templateUrl: './anime-manager.component.html',
  styleUrls: ['./anime-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeManagerComponent implements OnInit {
  /** Anime to edit. */
  @Input()
  public anime: Anime | null = null;

  // public readonly genres$ = this.animeService.getPaginatedGenres();

  /** Anime form. */
  public readonly animeForm = this.formBuilder.group({
    titleEng: ['', []],
    titleJpn: ['', []],
    airedRange: this.formBuilder.group<DateRange>({
      start: null,
      end: null,
    }),
    type: this.formBuilder.control<AnimeType | null>(null, [Validators.required]),
    rating: this.formBuilder.control<AnimeRating | null>(null, [Validators.required]),
    status: this.formBuilder.control<AnimeStatus | null>(null, [Validators.required]),
    source: this.formBuilder.control<AnimeSource | null>(null, [Validators.required]),
    season: this.formBuilder.control<AnimeSeason | null>(null, [Validators.required]),
    synopsis: ['', [Validators.required]],
    youTubeTrailerId: '',
  });

  /** Anime type readable map. */
  public readonly animeTypeReadableMap = ANIME_TYPE_READABLE_MAP;

  /** Anime status readable map. */
  public readonly animeStatusReadableMap = ANIME_STATUS_READABLE_MAP;

  /** Anime rating readable map. */
  public readonly animeRatingReadableMap = ANIME_RATING_READABLE_MAP;

  /** Anime source readable map. */
  public readonly animeSourceReadableMap = ANIME_SOURCE_READABLE_MAP;

  /** Anime season readable map. */
  public readonly animeSeasonReadableMap = ANIME_SEASON_READABLE_MAP;

  public constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    if (this.anime !== null) {
      this.animeForm.setValue({
        titleEng: this.anime.titleEng,
        titleJpn: this.anime.titleJpn,
        airedRange: {
          start: this.anime.airedRange.start,
          end: this.anime.airedRange.end,
        },
        type: this.anime.type,
        status: this.anime.status,
        synopsis: this.anime.synopsis,
        youTubeTrailerId: this.anime.youTubeTrailerId,
        rating: this.anime.rating,
        source: this.anime.source,
        season: this.anime.season,
      });
    }
  }
}
