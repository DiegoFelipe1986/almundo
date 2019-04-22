import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { HotelComponent } from './hotel/hotel.component';
import { HotelsListComponent } from './hotels-list/hotels-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    HotelComponent,
    HotelsListComponent
  ],
  exports: [HotelsListComponent]
})
export class HotelsModule { }
