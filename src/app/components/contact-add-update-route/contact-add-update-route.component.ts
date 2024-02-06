import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {ContactsService} from "../contacts/contacts.service";
import {ContactInterface} from "../contacts/contact.interface";
import {Location, NgIf} from "@angular/common";
import {take} from "rxjs";

@Component({
  selector: 'app-contact-add-update',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatLabel,
    NgIf
  ],
  templateUrl: './contact-add-update-route.component.html',
  styleUrl: './contact-add-update-route.component.scss'
})
export class ContactAddUpdateRouteComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  contact!: ContactInterface;

  location = inject(Location);
  fb = inject(FormBuilder);
  addOrEdit = 'add';
  form!: any;

  constructor(private readonly service: ContactsService) {
    const contactId = Number(this.route.snapshot.params['id']) || -1;
    this.service.getOne(contactId)
      .subscribe(contact => {
        this.form = this.fb.group({
          id: [contact.id],
          name: [contact.name, Validators.required],
          phone: [contact.phone, Validators.required],
          email: [contact.email, [Validators.required, Validators.email]],
        })
        this.addOrEdit = contact.id ? 'edit' : 'add';
      })
  }

  back() {
    this.location.back()
  }

  save() {
    const contact = this.form.value as ContactInterface;
    let obs;
    if (contact.id) {
      obs = this.service.update(contact)
    } else {
      obs = this.service.add(contact)
    }
    obs
      .subscribe();
  }
}

// https://angular.io/guide/http-test-requests
