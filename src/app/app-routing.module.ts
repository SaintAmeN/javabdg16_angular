import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarRentalFormComponent } from './car-rental-form/car-rental-form.component';

// Miejsce w którym deklarujemy pod jaką
//  ścieżką co ma się wyświetlić, przykład:
//    http://localhost:4200/home -> component Home
//    http://localhost:4200/cars -> component CarList
const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"home", component: HomeComponent},
  {path:"cars", component: CarListComponent},
  {path:"rent", component: CarRentalFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
