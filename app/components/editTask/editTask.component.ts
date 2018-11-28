import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AlertsService } from 'angular-alert-module';

@Component({

    templateUrl: './editTask.component.html',
    providers: [TaskService],
    styles: [`
	`]
})

export class EditTaskComponent {
    task: any = {

    };
    message: string;
    title: string = "Update Task";
    id: number;

    constructor(private alerts: AlertsService, private taskService: TaskService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.alerts.setConfig('warn', 'icon', 'warning');
        if (+id >= 0) {

            this.id = +id;
            this.getTask(this.id);
        }
    }

    handleGetError(err) {
        this.alerts.setMessage('Service failure please check the logs', err.message);

    }
    handleUpdateError(err) {
        this.alerts.setMessage('Error occured while updating', err.message);

    }

    editTask() {
        this.taskService.updateTask(this.editPayload())
            .then(res => {
                if (res.status == 200) {
                    this.goBack();
                } else {
                    this.handleUpdateError(res);
                }

            })

    }



    getTask(index) {
        this.taskService.getTask(index)
            .then(res => {
                if (res.status == 200) {
                    this.task = res;
                } else {
                    this.handleGetError(res);
                }
            })
    }
    goBack() {
        this.location.back();
    }

    editPayload() {

        let editPayLoad = {

            "taskId": this.id,

            "task": this.task.task,

            "priority": this.task.priority,

            "startDate": this.task.startDate,

            "endDate": this.task.endDate,

            "parentTask": {

                " id ": this.task.parentTask

            }
        };
        return editPayLoad;
    }

}