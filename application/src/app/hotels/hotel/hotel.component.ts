import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Hotel } from './../../core/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit, AfterViewInit {


  @Input() hotel: Hotel;
  @ViewChild('hotelImage') hotelImage: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  numberOfStars(stars: number): Array<number> {
    return new Array(stars).fill(stars);
  }

  ngAfterViewInit() {
    this.checkHotelImageLoaded();
  }


  checkHotelImageLoaded() {
    const testImage = new Image();

    testImage.onerror = () => {
      this.hotelImage.nativeElement.src = 'assets/images/no-hotel-image.jpg';
    };
    
    testImage.src = this.hotelImage.nativeElement.src;
  }

}
