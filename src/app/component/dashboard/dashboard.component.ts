import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {
    this.taskObj = new Task();
  }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: res => {
        this.taskArr = res;
      },
      error: err => {
        alert("Unable to get list of tasks");
      }
    });
  }

  addTask() {
    if (!this.addTaskValue) {
      alert("Please enter a task description.");
      return;
    }

    if (this.taskArr.find(task => task.task_name === this.addTaskValue)) {
      alert("This task already exists in the list.");
      return;
    }

    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: res => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: err => {
        alert(err);
      }
    });
  }

  editTask() {
    if (!this.editTaskValue) {
      alert("Please enter a task description.");
      return;
    }

    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: res => {
        this.ngOnInit();
      },
      error: err => {
        alert("Failed to update task");
      }
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: res => {
        this.ngOnInit();
      },
      error: err => {
        alert("Failed to delete task");
      }
    });
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }


}




