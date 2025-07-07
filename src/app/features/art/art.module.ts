import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtRoutingModule } from './art-routing.module';
import { ArtComponent } from './art/art.component';
import { ArtListComponent } from './art-list/art-list.component';
import { ArtDetailsComponent } from './art-details/art-details.component';


@NgModule({
  declarations: [
    ArtComponent,
    ArtListComponent,
    ArtDetailsComponent
  ],
  imports: [
    CommonModule,
    ArtRoutingModule
  ]
})
export class ArtModule { }
