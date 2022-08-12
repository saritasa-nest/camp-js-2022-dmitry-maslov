import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-edit-anime-page',
  templateUrl: './edit-anime-page.component.html',
  styleUrls: ['./edit-anime-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAnimePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
