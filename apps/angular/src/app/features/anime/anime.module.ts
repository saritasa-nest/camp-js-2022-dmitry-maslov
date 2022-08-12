import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { SharedModule } from '@js-camp/angular/shared/shared.module';

import { UnauthorizedGuard } from '@js-camp/angular/core/guards/unauthorized.guard';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeListPageComponent } from './pages/anime-list-page/anime-list-page.component';
import { AnimePageComponent } from './pages/anime-page/anime-page.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeManagerComponent } from './components/anime-manager/anime-manager.component';
import { CreateAnimePageComponent } from './pages/create-anime-page/create-anime-page.component';
import { EditAnimePageComponent } from './pages/edit-anime-page/edit-anime-page.component';

const routes: Routes = [
  { path: '', title: 'Anime list', component: AnimeListPageComponent },
  {
    path: 'add',
    title: 'Add anime',
    component: CreateAnimePageComponent,
    canActivate: [UnauthorizedGuard],
  },
  {
    path: ':id',
    title: 'Anime',
    component: AnimePageComponent,
    canActivate: [UnauthorizedGuard],
  },
  {
    path: ':id/edit',
    title: 'Edit Anime',
    component: EditAnimePageComponent,
    canActivate: [UnauthorizedGuard],
  },
];

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    AnimeListPageComponent,
    AnimePageComponent,
    AnimeDetailsComponent,
    AnimeManagerComponent,
    CreateAnimePageComponent,
    EditAnimePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    YouTubePlayerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class AnimeModule {}
