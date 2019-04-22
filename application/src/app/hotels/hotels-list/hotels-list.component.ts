import { Component, OnInit } from '@angular/core';

import { HotelsService } from './../../core/hotels.service';
import { Hotel } from './../../core/hotel.model';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {

  hotels: Array<Hotel>;

  constructor(private hotelsService: HotelsService) {
    this.hotels = this.hotelsService.hotels;
  }

  ngOnInit() {
  }

}
