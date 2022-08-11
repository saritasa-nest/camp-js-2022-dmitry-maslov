import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MaterialModule } from '@js-camp/angular/shared/material.module';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeListPageComponent } from './pages/anime-list-page/anime-list-page.component';

const routes: Routes = [{ path: '', title: 'Anime list', component: AnimeListPageComponent }];

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent, AnimeListPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class AnimeModule {}
