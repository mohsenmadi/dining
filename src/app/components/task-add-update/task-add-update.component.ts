import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions, MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {TaskInterface} from "../tasks/task.interface";

@Component({
  selector: 'app-task-add-update',
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
  templateUrl: './task-add-update.component.html',
  styleUrl: './task-add-update.component.scss'
})
export class TaskAddUpdateComponent {
  fb = inject(FormBuilder);
  addOrEdit = 'add';

  constructor(@Inject(MAT_DIALOG_DATA) private task: TaskInterface,
              private dialogRef: MatDialogRef<TaskAddUpdateComponent>) {
    this.addOrEdit = task.id ? 'edit' : 'add';
  }

  form = this.fb.group({
    id: [this.task.id],
    title: [this.task.title, Validators.required],
    completed: [this.task.completed, Validators.required],
    createdAt: [this.task.createdAt],
    updatedAt: [this.task.updatedAt],
  })

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}

export const openAddUpdateTaskDialog = (dialog: MatDialog, task: TaskInterface) => {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {
    ...task
  }

  const dialogRef = dialog.open(TaskAddUpdateComponent, config)
  return dialogRef.afterClosed();
}
