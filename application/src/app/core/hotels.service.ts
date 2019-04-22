import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as isUrl from 'is-url';

import { Hotel } from './hotel.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HotelsService {
  hotels: Array<Hotel>;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.hotels = new Array<Hotel>();

    this.apiUrl = environment.apiUrl;

    this.getAllHotels();
  }

  getAllHotels() {
    this.getHotelsFromAPI(this.apiUrl + 'hotels');
  }

  filterHotels(name: string, stars: string) {

    let filterUrl = '';
    if (name !== '' && stars !== '') {
 
      filterUrl = `${this.apiUrl}hotels?name=${name}&stars=${stars}`;
    } else if (name !== '' && stars === '') {

      filterUrl = `${this.apiUrl}hotels?name=${name}`;
    } else if (name === '' && stars !== '') {

      filterUrl = `${this.apiUrl}hotels?stars=${stars}`;
    }

    this.getHotelsFromAPI(filterUrl);
  }


  getHotelsFromAPI(url: string) {
    this.http.get(url)
      .do(() => {
        this.hotels.length = 0;
      })
      .switchMap((hotels: Array<Hotel>) => hotels)
      .map((hotel: Hotel) => {
        if (!isUrl(hotel.image)) {
          hotel.image = 'assets/images/hotels/' + hotel.image;
        }
        return hotel;
      })
      .subscribe((hotel: Hotel) => {
        this.hotels.push(hotel);
      });
  }

}
