import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';

import { AnimeComponent } from './anime.component';
import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent],
  imports: [CommonModule, AnimeRoutingModule, MatTableModule],
})
export class AnimeModule {}
