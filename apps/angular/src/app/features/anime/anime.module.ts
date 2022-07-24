import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimeListPageComponent } from './pages/anime-list-page/anime-list-page.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent, AnimeListPageComponent],
  imports: [CommonModule, AnimeRoutingModule, MatTableModule],
})
export class AnimeModule {}
