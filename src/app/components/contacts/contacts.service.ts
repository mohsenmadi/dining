import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactInterface, emptyContact} from "./contact.interface";
import {Observable, of} from "rxjs";

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

  getOne(id: number): Observable<ContactInterface> {
    return id < 0
      ? of(emptyContact)
      : this.http.get<ContactInterface>(URL + `/${id}`);
  }

  delete(contact: ContactInterface) {
    return this.http.delete(URL + `/${contact.id}`);
    // return this.http.delete(URL + `/33`);
  }

  update(contact: ContactInterface) {
    return this.http.put(URL + `/${contact.id}`, contact);
  }

  add(contact: ContactInterface) {
    return this.http.post(URL, contact);
  }
}
