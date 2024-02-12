import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "./task.service";
import {catchError, concatMap, filter, of, tap} from "rxjs";
import {NEW_TASK, TaskInterface} from "./task.interface";
import {openAddUpdateTaskDialog} from "../task-add-update/task-add-update.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'edit', 'delete'];
  dataSource!: any;

  constructor(private service: TaskService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  openAddUpdateTaskDialog(task: TaskInterface = NEW_TASK) {
    openAddUpdateTaskDialog(this.dialog, task)
      .pipe(
        filter(val => this.isUpdated(val, task)),
        concatMap(task =>
          task.id ? this.service.update(task) : this.service.add(task)),
        tap(task => this.updateDataSource())
      )
      .subscribe();
  }

  isUpdated = (taskUpdated: TaskInterface, task: TaskInterface) =>
    !!taskUpdated && JSON.stringify(taskUpdated) !== JSON.stringify(task);


  deleteTask(task: TaskInterface) {
    this.service.delete(task)
      .pipe(
        catchError(error => {
          alert(error.error.message)
          return of();
        })
      )
      .subscribe(() => this.updateDataSource());
  }

  private updateDataSource() {
    this.dataSource = this.service.all();
  }

}
