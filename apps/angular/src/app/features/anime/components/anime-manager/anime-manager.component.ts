import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-anime-manager',
  templateUrl: './anime-manager.component.html',
  styleUrls: ['./anime-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeManagerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
