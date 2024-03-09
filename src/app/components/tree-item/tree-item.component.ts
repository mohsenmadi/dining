import {Component, Input} from '@angular/core';
import {TaskInterface} from "../tasks/task.interface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss'
})
export class TreeItemComponent {

  @Input() task!: TaskInterface;

}
