import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerAmenitiesIcons();
  }

  registerAmenitiesIcons() {
    this.iconRegistry.addSvgIcon(
      'bathrobes',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/bathrobes.svg'));

    this.iconRegistry.addSvgIcon(
      'bathtub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/bathtub.svg'));

    this.iconRegistry.addSvgIcon(
      'beach',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/beach.svg'));

    this.iconRegistry.addSvgIcon(
      'beach-pool-facilities',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/beach-pool-facilities.svg'));

    this.iconRegistry.addSvgIcon(
      'business-center',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/business-center.svg'));

    this.iconRegistry.addSvgIcon(
      'children-club',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/children-club.svg'));

    this.iconRegistry.addSvgIcon(
      'coffe-maker',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/coffe-maker.svg'));

    this.iconRegistry.addSvgIcon(
      'deep-soaking-bathtub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/deep-soaking-bathtub.svg'));

    this.iconRegistry.addSvgIcon(
      'fitness-center',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/fitness-center.svg'));

    this.iconRegistry.addSvgIcon(
      'garden',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/garden.svg'));
      this.iconRegistry.addSvgIcon(
      'kitchen-facilities',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/kitchen-facilities.svg'));

    this.iconRegistry.addSvgIcon(
      'newspaper',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/newspaper.svg'));

    this.iconRegistry.addSvgIcon(
      'nightclub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/nightclub.svg'));

    this.iconRegistry.addSvgIcon(
      'restaurant',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/restaurant.svg'));

    this.iconRegistry.addSvgIcon(
      'safety-box',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/safety-box.svg'));

    this.iconRegistry.addSvgIcon(
      'separate-bredroom',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/separate-bredroom.svg'));

    this.iconRegistry.addSvgIcon(
      'sheets',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/sheets.svg'));

  }
}
