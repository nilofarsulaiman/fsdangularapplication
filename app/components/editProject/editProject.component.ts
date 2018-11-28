import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { AlertsService } from 'angular-alert-module';

@Component({

    templateUrl: './editProject.component.html',
    providers: [ProjectService],
    styles: [`
	`]
})

export class EditProjectComponent {
    projects: any = {

    };
    message: string;
    title: string = "Update Task";
    id: number;

    constructor(private alerts: AlertsService, private projectService: ProjectService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.alerts.setConfig('warn', 'icon', 'warning');
        if (+id >= 0) {

            this.id = +id;
            this.getProject(this.id);
        }
    }

    handleGetError(err) {
        this.alerts.setMessage('Service failure please check the logs', err.message);

    }
    handleUpdateError(err) {
        this.alerts.setMessage('Error occured while updating', err.message);

    }

    editProject() {
        this.projectService.updateProject(this.editPayload())
            .then(res => {
                if (res.status == 200) {
                    this.goBack()
                } else {
                    this.handleUpdateError(res);
                }

            })

    }



    getProject(index) {
        this.projectService.getProject(index)
            .then(res => {
                if (res.status == 200) {
                    this.projects = res;
                }
                else {
                    this.handleGetError(res);
                }
            })
    }
    goBack() {
        this.location.back();
    }

    editPayload() {

        let editPayLoad = {

            "projectId": this.projects.projectId,

            "project": this.projects.project,

            "priority": this.projects.priority,

            "startDate": this.projects.startDate,

            "endDate": this.projects.endDate
        };
        return editPayLoad;
    }


    resetForm(projects) {
        this.projects.project = null;
        this.projects.priority = null;
        this.projects.startDate = null;
        this.projects.endDate = null;
    }

}