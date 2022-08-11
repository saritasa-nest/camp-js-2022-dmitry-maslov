import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MultimediaService } from '@js-camp/angular/core/services/multimedia.service';
import { MONTH_YEAR_FORMAT } from '@js-camp/angular/shared/constants/dateFormats';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studios';
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

  /** Anime. */
  @Input()
  public anime$: Observable<Anime> | null = null;

  public constructor(private readonly multimediaService: MultimediaService) {}

  /** @inheritdoc */
  public trackByGenreId(_index: number, genre: Genre): Genre['id'] {
    return genre.id;
  }

  /** @inheritdoc */
  public trackByStudioId(_index: number, studio: Studio): Studio['id'] {
    return studio.id;
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.multimediaService.initYouTubePlayer();
  }
}
