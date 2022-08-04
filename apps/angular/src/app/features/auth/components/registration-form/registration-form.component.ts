import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
