import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
