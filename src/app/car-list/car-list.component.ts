import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Odzwierciedla budowę klasy CarRentalOffer na backendzie:
//
// private String make;
// private String model;
// private CarBodyType type;
// private double economy;
// private double price;
export type CarRentalOfferModel = {
  id: number;
  make: string;
  model: string;
  type: string;
  economy: number;
  price: number;
};

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: CarRentalOfferModel[];

  deleteCarOffer(carOffer: CarRentalOfferModel) {
    console.log(`Delete ${carOffer.id}`);
    // http://localhost:8080/offers/${carOffer.id} DELETE -> usunięcie oferty
    // Po usunięciu elementu musimy pozbyć się elementu z naszej lokalnej
    //  listy `this.cars`. Mamy dwie opcje:
    this.http
      .delete(`http://localhost:8080/offers/${carOffer.id}`)
      .subscribe((data) => {
        //    opcja 1 - pobranie ponownie listy bez elementu
        //    może być wykonana gdy zapytanie delete zostanie wykonane w całości
        // this.refreshCarOfferList();
      });

    //    opcja 2 - usunięcie elementu z listy bez wysyłania kolejnego zapytania
    //    zamiast wykonywać zbędne zapytanie do bazy usuwamy u siebie element z listy
    let indexOfRemovedCar = this.cars.indexOf(carOffer);
    if(indexOfRemovedCar !== -1){
      this.cars.splice(indexOfRemovedCar, 1);
    }
  }

  refreshCarOfferList() {
    // http://localhost:8080/offers GET -> lista ofert
    this.http.get('http://localhost:8080/offers').subscribe((data) => {
      let listOfOffers = data as CarRentalOfferModel[];
      this.cars = listOfOffers;
    });
  }

  constructor(private http: HttpClient) {
    this.cars = [];
  }

  ngOnInit(): void {
    this.refreshCarOfferList();
  }
}
