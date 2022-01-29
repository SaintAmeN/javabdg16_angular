import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarRentalOfferModel } from '../car-list/car-list.component';

const EMPTY_CAR_RENTAL_OFFER: CarRentalOfferModel = {
  id: 0,
  economy: 30,
  make: '',
  model: '',
  price: 0,
  type: 'SUV',
};

@Component({
  selector: 'app-car-rental-form',
  templateUrl: './car-rental-form.component.html',
  styleUrls: ['./car-rental-form.component.css'],
})
export class CarRentalFormComponent implements OnInit {
  carRentalObject: CarRentalOfferModel;
  formActive: boolean;
  notification: any;
  clearNotificationInterval: any;

  submitCarOffer() {
    this.formActive = false;

    // Wysyłamy zapytanie o dodanie obiektu do bazy (POST/PUT)
    // http://localhost:8080/offers POST -> dodawanie oferty
    this.http
      .post(`http://localhost:8080/offers`, this.carRentalObject)
      .subscribe((data) => {
        // gdy wywoła się ta metoda, dane zostały wysłane
        this.formActive = true;
        this.clearCarOfferForm();
        this.notification = 'Car Offer has been saved!';

        if (this.clearNotificationInterval !=null){
          clearTimeout(this.clearNotificationInterval);
        }

        this.clearNotificationInterval = setTimeout(
          ()=>{
          this.clearNotification();
        }, 3000);
      });
  }

  clearNotification(){
    this.notification = null;
    this.clearNotificationInterval = null;
  }

  clearCarOfferForm() {
    // Object assign {} - Tworzy kopię obiektu.
    // Metoda `assign` bierze parametr pierwszy (pusty obiekt) i kopiuje do niego wartości z
    //    parametru drugiego. Wynikiem jest nowy obiekt z polami identycznymi do drugiego obiektu.
    //  Jest to metoda JS'owa.
    this.carRentalObject = Object.assign({}, EMPTY_CAR_RENTAL_OFFER);
  }

  constructor(private http: HttpClient) {
    this.carRentalObject = Object.assign({}, EMPTY_CAR_RENTAL_OFFER);
    this.formActive = true;
  }

  ngOnInit(): void {}
}
