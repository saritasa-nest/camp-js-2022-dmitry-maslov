import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Anime } from '@js-camp/core/models/anime';

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

  /** Anime form. */
  public readonly animeForm = this.formBuilder.group({
    titleEng: ['', []],
    titleJpn: ['', []],
    airedRange: this.formBuilder.group<{
      start: Date | null;
      end: Date | null;
    }>({
      start: null,
      end: null,
    }),
  });

  public constructor(private readonly formBuilder: FormBuilder) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    if (this.anime !== null) {
      this.animeForm.setValue({
        titleEng: this.anime.titleEng,
        titleJpn: this.anime.titleJpn,
        airedRange: {
          start: this.anime.airedRange.airedStart,
          end: this.anime.airedRange.airedFinish,
        },
      });
    }
  }

}
