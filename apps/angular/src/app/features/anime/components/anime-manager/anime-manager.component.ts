import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeType, ANIME_TYPE_READABLE_MAP } from '@js-camp/core/models/anime-type';
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

  public readonly genres$ = this.animeService.getPaginatedGenres();

  /** Anime form. */
  public readonly animeForm = this.formBuilder.group({
    titleEng: ['', []],
    titleJpn: ['', []],
    airedRange: this.formBuilder.group<DateRange>({
      start: null,
      end: null,
    }),
    type: this.formBuilder.nonNullable.control<AnimeType | null>(null),
  });

  /** Anime type readable map. */
  public readonly animeTypeReadableMap = ANIME_TYPE_READABLE_MAP;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly animeService: AnimeService,
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
      });
    }
  }
}
