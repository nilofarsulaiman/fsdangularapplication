import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AlertsService } from 'angular-alert-module';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({

    templateUrl: './addTask.component.html',
    providers: [TaskService,ProjectService,UserService],
    styles: [`
	`]
})

export class AddTaskComponent {
    task: any = {

    };
    message: string;
    title: string = "Create Task";
    id: number;
    userName:string;
    userId:number;
    constructor(private alerts: AlertsService,  private projectService: ProjectService, private userService: UserService,private taskService: TaskService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.alerts.setConfig('warn', 'icon', 'warning');

    }


    filterManager() {
        
                this.userService.filterManager(this.userName)
                    .then(res => {
                        this.userId = res.userId;
        
                    })
        
            }

    handleError(err) {
        this.alerts.setMessage('All the fields are required', err.message);

    }
    addTask() {
        this.taskService.createTask(this.createPayload())
            .then(res => {
                    this.goBack();
            })
    }



    goBack() {
        this.location.back();
    }
    resetForm(task) {
        this.task.task = null;
        this.task.priority = null;
        this.task.parentTask.parentTask = null;
        this.task.startDate = null;
        this.task.endDate = null;
    }

    createPayload() {

        let createPayLoad = {


            "task": this.task.task,

            "priority": this.task.priority,

            "startDate": this.task.startDate,

            "endDate": this.task.endDate,

            "parentTask": {

                "id": this.task.parentTask

            }
        };
        return createPayLoad;
    }



}