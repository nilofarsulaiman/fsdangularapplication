import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertsService } from 'angular-alert-module';

@Component({
	styles: [`
	`],
	templateUrl:'./viewTask.component.html',
    providers: [ProjectService,TaskService]
})

export class ViewTaskComponent implements OnInit {
    tasks:Array<any>=[];
    projectsList: Array<any> = [];
     id: number;
     projectName: string;
     projectId:number=0;
     constructor(private alerts: AlertsService,private taskService: TaskService, private projectService: ProjectService,private route: ActivatedRoute, private location: Location ){ }
 
	ngOnInit() {
        this.getTasks();
    }

    ngOnChange() {
        if(this.projectId !=0){
        this.getTasksByProject();
        }
    }

    handleGetError(err) {
        this.alerts.setMessage('Service failure please check the logs', err.message);

    }
    deleteTask(index) {
        this.taskService.removeTask(index)
            .then(res => {
                    this.getTasks();
            })
    }

    getTasks() {
        this.taskService.getTasks()
            .then(res => {
                    this.tasks = res;
            })

    }

    getTasksByProject() {
        this.taskService.getTasksByProject(this.projectId)
            .then(res => {
                    this.tasks = res;
            })

    }

    filterProject() {
        this.projectService.filterProject(this.projectName)
            .then(res => {         
                this.projectId = res.projectId;
                this.ngOnChange();
            })
    }

    filterCompletedTask() {
        this.taskService.filterCompletedTask()
            .then(res => {
                this.tasks = res;            
            })
    }

    sortByStartDate() {
        this.sortTasks("startDate", "ASC");

    }

    sortByEndDate() {
        this.sortTasks("endDate", "ASC");

    }

    sortByPriority() {
        this.sortTasks("priority", "ASC");
    }

    sortTasks(propName, order: "ASC" | "DESC"): void {
        this.tasks.sort((a, b) => {
            if (a[propName] < b[propName])
                return -1;
            if (a[propName] > b[propName])
                return 1;
            return 0;
        });
    }


    goBack(){
        this.location.back();
    }

   

}