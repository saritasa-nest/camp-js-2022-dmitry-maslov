import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent],
  imports: [CommonModule, AnimeRoutingModule, MatTableModule, MatPaginatorModule],
})
export class AnimeModule {}
