import { Routes } from '@angular/router';
import {ContactsComponent} from "./components/contacts/contacts.component";
import {ContactAddUpdateRouteComponent} from "./components/contact-add-update-route/contact-add-update-route.component";

export const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    title: 'main page'
  },
  {
    path: 'auForm/:id',
    component: ContactAddUpdateRouteComponent,
    title: 'update form'
  },
  {
    path: 'auForm',
    component: ContactAddUpdateRouteComponent,
    title: 'add form'
  },

];
