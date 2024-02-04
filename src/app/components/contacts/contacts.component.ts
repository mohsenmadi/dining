import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {ContactsService} from "./contacts.service";
import {ContactInterface, emptyContact} from "./contact.interface";
import {catchError, concatMap, filter, of, tap} from "rxjs";
import {openAddUpdateContactDialog} from "../contact-add-update/contact-add-update.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTooltip} from "@angular/material/tooltip";

const ELEMENT_DATA: ContactInterface[] = [
  {id: 1, name: 'sona madi', phone: '1113335555', email: 'sona@madi.com'},
];

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatFabButton,
    MatTooltip
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'edit', 'delete'];
  dataSource!: any;

  constructor(private service: ContactsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  addUpdateContact(contact: ContactInterface = emptyContact) {
    openAddUpdateContactDialog(this.dialog, contact)
      .pipe(
        // filter(val => !!val),
        filter(val => this.isUpdated(val, contact)),
        concatMap(contact =>
          contact.id ? this.service.update(contact) : this.service.add(contact)),
        tap(contact => this.updateDataSource())
      )
      .subscribe();
  }

  isUpdated = (contactUpdated: ContactInterface, contact: ContactInterface) =>
    !!contactUpdated && JSON.stringify(contactUpdated) !== JSON.stringify(contact);

  deleteContact(contact: ContactInterface) {
    this.service.delete(contact)
      .pipe(
        catchError(error => {
          alert(error.error.message)
          return of();
        })
      )
      .subscribe(() => this.updateDataSource());
  }

  private updateDataSource() {
    console.log('=========')
    this.dataSource = this.service.all();
  }
}
