import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions, MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ContactInterface} from "../contacts/contact.interface";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
    MatLabel
  ],
  templateUrl: './contact-add-update.component.html',
  styleUrl: './contact-add-update.component.scss'
})
export class ContactAddUpdateComponent {
  fb = inject(FormBuilder);
  addOrEdit = 'add';

  constructor(@Inject(MAT_DIALOG_DATA) private contact: ContactInterface,
              private dialogRef: MatDialogRef<ContactAddUpdateComponent>) {
    this.addOrEdit = contact.id ? 'edit' : 'add';
  }

  form = this.fb.group({
    id: [this.contact.id],
    name: [this.contact.name, Validators.required],
    phone: [this.contact.phone, Validators.required],
    email: [this.contact.email, [Validators.required, Validators.email]],
  })

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}

export const openAddUpdateContactDialog = (dialog: MatDialog, contact: ContactInterface) => {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {
    ...contact
  }

  const dialogRef = dialog.open(ContactAddUpdateComponent, config)
  return dialogRef.afterClosed();
}
