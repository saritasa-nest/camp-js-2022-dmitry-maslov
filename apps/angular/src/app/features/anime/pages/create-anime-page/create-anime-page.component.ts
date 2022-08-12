import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-create-anime-page',
  templateUrl: './create-anime-page.component.html',
  styleUrls: ['./create-anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAnimePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
