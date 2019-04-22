import { Component, OnInit } from '@angular/core';

import { HotelsService } from './../core/hotels.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  starsFilter: Array<any>;


  allStarsFilter: boolean;


  nameFilter: string;

  constructor(private hotelsService: HotelsService) {
    this.initStarsFilter();
    this.allStarsFilter = true;
    this.nameFilter = '';
  }

  ngOnInit() {
  }

  initStarsFilter(): void {
    this.starsFilter = [
      {
        name: '5 stars',
        stars: new Array(5).fill(5),
        isActive: false
      },
      {
        name: '4 stars',
        stars: new Array(4).fill(4),
        isActive: false
      },
      {
        name: '3 stars',
        stars: new Array(3).fill(3),
        isActive: false
      },
      {
        name: '2 stars',
        stars: new Array(2).fill(2),
        isActive: false
      },
      {
        name: '1 stars',
        stars: new Array(1).fill(1),
        isActive: false
      }
    ];
  }


  filterHotelsList(hasAllFilterBeenSelected: boolean = false) {
    if (hasAllFilterBeenSelected) {
      this.unselectAllFilterStars();
    }

    if (this.isAnyStarsSelectedToFilter() || this.nameFilter !== '') {
      this.hotelsService.filterHotels(this.nameFilter, this.getStarsFilterSelected());

      if (this.isAnyStarsSelectedToFilter()) {
        this.allStarsFilter = false;
      } else {
        this.allStarsFilter = true;
      }
    } else {
      this.allStarsFilter = true;
      this.hotelsService.getAllHotels();
    }
  }

  getStarsFilterSelected(): string {
    const starsSelected = Array<number>();

    this.starsFilter.forEach(starFilter => {
      if (starFilter.isActive) {
        starsSelected.push(starFilter.stars.length);
      }
    });

    return starsSelected.join(',');
  }

  isAnyStarsSelectedToFilter(): boolean {
    let isThere = false;

    for (let index = 0; index < this.starsFilter.length; index++) {
      if (this.starsFilter[index].isActive) {
        isThere = true;
        break; 
      }
    }

    return isThere;
  }

  unselectAllFilterStars() {
    this.starsFilter.forEach(starFilter => {
      starFilter.isActive = false;
    });
  }

}
