import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { SharedModule } from '@js-camp/angular/shared/shared.module';

import { UnauthorizedGuard } from '@js-camp/angular/core/guards/unauthorized.guard';

import { MaterialModule } from '@js-camp/angular/shared/material.module';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeListPageComponent } from './pages/anime-list-page/anime-list-page.component';
import { AnimePageComponent } from './pages/anime-page/anime-page.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';

const routes: Routes = [
  { path: '', title: 'Anime list', component: AnimeListPageComponent },
  { path: ':id', title: 'Anime', component: AnimePageComponent, canActivate: [UnauthorizedGuard] },
];

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    AnimeListPageComponent,
    AnimePageComponent,
    AnimeDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    YouTubePlayerModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class AnimeModule {}
