import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatFormField, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ContactsComponent} from "./components/contacts/contacts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ContactsComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngapicrud';
}
