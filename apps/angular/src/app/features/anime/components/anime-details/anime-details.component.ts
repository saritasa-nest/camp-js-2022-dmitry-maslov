import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MultimediaService } from '@js-camp/angular/core/services/multimedia.service';
import { MONTH_YEAR_FORMAT } from '@js-camp/angular/shared/constants/dateFormats';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { Observable } from 'rxjs';

/** Anime Detail Component. */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
  /** Month year format. */
  public readonly monthYearFormat = MONTH_YEAR_FORMAT;

  /** Anime status. */
  public readonly animeStatus = AnimeStatus;

  /** Anime type. */
  public readonly animeType = AnimeType;

  /** Anime id. */
  @Input()
  public animeId!: number;

  /** Anime. */
  public anime$?: Observable<Anime>;

  public constructor(
    private animeService: AnimeService,
    private youTubePlayerService: MultimediaService,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.anime$ = this.animeService.getAnime(this.animeId);
    this.youTubePlayerService.initYouTubePlayer();
  }
}
