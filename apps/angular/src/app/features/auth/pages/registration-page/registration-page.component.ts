import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Registration page. */
@Component({
  selector: 'camp-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {}
