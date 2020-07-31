import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to True North';
  location: Location;
  selectedMarker: Marker;
  markerNumber: number = 1;

  public directions: any = [];
  public done = false;

  public cityRoutes = [];
  markers = [
    {
      id: 1,
      position: {
        lat: 19.22139728328623,
        lng: 72.98370667968751,
      },
      title: 'Thane',
      order: 1
    },
    {
      id: 2,
      position: {
        lat: 19.2094,
        lng: 73.0939,
      },
      title: 'Dombivali',
      order: 2
    },
    {
      id: 3,
      position: {
        lat: 19.0790,
        lng: 72.908,
      },
      title: 'Ghatkoper',
      order: 3
    },
    {
      id: 4,
      position: {
        lat: 19.166784,
        lng: 73.236794,
      },
      title: 'Badalapur',
      order: 4
    }
    ];

  ngOnInit() {
    // init the map
    this.initMap();
  }

  initMap() {
    //1. initialize the map
    this.location = {
      latitude: 19.0458547,
      longitude: 72.8637616,
      mapType: 'satelite',
      zoom: 10,
      markers: []
    };

    //2. Place the markers on map
    this.markers.forEach((item, key) => {
      const markerItem = {
        id: item.id,
        lat: item.position.lat,
        lng: item.position.lng,
        label: '',
        order: key + 1,
        title: item.title
      };

      this.location.markers.push(markerItem);
    });
  };

  addMarker($event: MouseEvent) {
    console.log($event.coords.lat);
    /*this.location.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: String(this.markerNumber++)
    });*/
  }

  selectMarker(event, id: any) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  onMarkerRightClick(event, id: any) {
    // set the route order by setting order and label

    let locationMarker = this.location.markers.find(item => {
      return item.id === id;
    });

    console.log('--> | locationMarker ', locationMarker);
    locationMarker.order = this.markerNumber++;
    locationMarker.label = String(locationMarker.order);
  };

  markerDragEnd(coords: any, $event: MouseEvent) {
    console.log('--> | coords ', coords);
    console.log('--> | $event ', $event);
    this.location.latitude = coords.lat;
    this.location.longitude = coords.lng;
  }

  getRoute() {

    //1. Sort markers by route order
    this.location.markers = this.sortByAsc(this.location.markers, 'order');

    //2. Set the origin and destination on route
    this.location.markers.forEach((item, index) => {
      if (index !== this.location.markers.length - 1) {
        const route = {
          origin: {
            lat: item.lat,
            lng: item.lng,
          },
          destination: {
            lat: this.location.markers[index + 1].lat !== undefined ? this.location.markers[index + 1].lat : item.lat,
            lng: this.location.markers[index + 1].lng !== undefined ? this.location.markers[index + 1].lng : item.lng,
          }
        };

        this.cityRoutes.push(route);
      }
    });

    //3. Plot the city routes
    this.directions = this.cityRoutes;
  }

  /**
   * Common Sort function
   * @param array
   * @param attr
   * @returns {any}
   */
  sortByAsc(array, attr) {
    return array.sort((a, b) => {
      return a[attr] - b[attr];
    });
  };
}

interface Marker {
  id?: number;
  lat: number;
  lng: number;
  label?: string;
  order?: number;
}

interface Location {
  latitude: number;
  longitude: number;
  mapType: string;
  zoom: number;
  markers: Array<Marker>;
}
