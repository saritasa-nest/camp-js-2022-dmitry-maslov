import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@js-camp/angular/shared/shared.module';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeListPageComponent } from './pages/anime-list-page/anime-list-page.component';

const routes: Routes = [{ path: '', title: 'Anime list', component: AnimeListPageComponent }];

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent, AnimeListPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    RouterModule.forChild(routes),
  ],
})
export class AnimeModule {}
