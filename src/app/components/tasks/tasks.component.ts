import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "./task.service";
import {catchError, concatMap, filter, map, of, take, tap} from "rxjs";
import {NEW_TASK, TaskInterface} from "./task.interface";
import {openAddUpdateTaskDialog} from "../task-add-update/task-add-update.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {DatePipe} from "@angular/common";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {TreeItemComponent} from "../tree-item/tree-item.component";

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
    MatTable,
    MatFabButton,
    MatTooltip,
    MatHeaderCellDef,
    DatePipe,
    MatSort,
    MatLabel,
    MatTableModule, MatSortModule, MatFormField, MatInput, TreeItemComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'completed', 'createdAt', 'updatedAt', 'edit', 'delete'];
  // dataSource!: any;
  dataSource = new MatTableDataSource<TaskInterface>([])

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: TaskService, private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.updateDataSource();
  }

  openAddUpdateTask(task: TaskInterface = NEW_TASK) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private updateDataSource() {
    this.service.all()
      .pipe(
        take(1),
        tap(data => data.map(item => item.expanded = false))
      )
      .subscribe(data => {
          console.log(data);
          this.dataSource.data = data
        }
      )
  }

  taskInFocus!:TaskInterface;

  showDetail(task: TaskInterface) {
    this.taskInFocus = task;
  }
}
