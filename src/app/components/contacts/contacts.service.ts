import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactInterface} from "./contact.interface";
import {Observable} from "rxjs";

const URL = 'http://localhost:3000/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private readonly http: HttpClient) {
  }

  all(): Observable<ContactInterface[]> {
    return this.http.get<ContactInterface[]>(URL);
  }

  delete(contact: ContactInterface) {
    return this.http.delete(URL + `/${contact.id}`);
    // return this.http.delete(URL + `/33`);
  }
}
