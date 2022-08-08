import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

/** Anime Detail Component. */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {

  /** Anime id. */
  @Input()
  public animeId!: number;

  /** Anime. */
  public anime$?: Observable<Anime>;

  public constructor(private animeService: AnimeService) {}

  /** Init anime. */
  public ngOnInit(): void {
    this.anime$ = this.animeService.getAnime(this.animeId);
  }
}
