import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {NEW_TASK, TaskInterface} from "./task.interface";

const TASKS_URL = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient) {
  }

  all(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(TASKS_URL);
  }

  getOne(id: number): Observable<TaskInterface> {
    return id < 0
      ? of(NEW_TASK)
      : this.http.get<TaskInterface>(TASKS_URL + `/${id}`);
  }

  delete(task: TaskInterface) {
    return this.http.delete(TASKS_URL + `/${task.id}`);
    // return this.http.delete(TASKS_URL + `/33`);
  }

  update(task: TaskInterface) {
    return this.http.put(TASKS_URL + `/${task.id}`, task);
  }

  add(task: TaskInterface) {
    return this.http.post(TASKS_URL, task);
  }}
