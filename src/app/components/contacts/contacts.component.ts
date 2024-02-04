import {Component} from '@angular/core';
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
import {MatIconButton} from "@angular/material/button";

export interface Contact {
  id?: number,
  name: string;
  phone: string;
  email: string;
}

const ELEMENT_DATA: Contact[] = [
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
    MatIconButton
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  displayedColumns: string[] = ['name', 'phone', 'email', 'edit', 'delete'];
  dataSource = ELEMENT_DATA;

  updateContact(contact: Contact) {

  }

  deleteContact(contact: Contact) {

  }
}
