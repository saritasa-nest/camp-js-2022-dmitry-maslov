import { NgModule, Type } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const EXPORTS_MODULE: Type<unknown>[] = [
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatInputModule,
];

/** Shared module. */
@NgModule({
  declarations: [],
  imports: [...EXPORTS_MODULE],
  exports: [...EXPORTS_MODULE],
})
export class MaterialModule {}
