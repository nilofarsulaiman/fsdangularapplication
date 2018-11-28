import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { AlertsService } from 'angular-alert-module';
@Component({


    templateUrl: './addProject.component.html',
    providers: [ProjectService, UserService],
    styles: [`
    `]

})

export class AddProjectComponent {
    projects: any = {

    };
    projectName: string;
    managerName: string;
    search: boolean = false;
    projectList: Array<any> = [];
    projectsList: Array<any> = [];
    message: string;
    title: string = "Add Project";
    id: number;
    userId: number = 0;
    constructor(private alerts: AlertsService, private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.alerts.setConfig('warn', 'icon', 'warning');
        this.getProjects();

    }

    ngOnChanges() {
        this.getProjects();

    }

    addProject() {
        this.projectService.createProject(this.createPayload())
            .then(res => {
                if (res.status == 200) {
                    this.handleError(res);
                    this.message = res.projectId;
                    if (this.userId != 0) {
                        this.updateUserTable(this.projects.projectId);
                    }
                    this.resetForm(this.projects);
                    this.ngOnChanges();
                } else {
                    this.handleError(res);
                }

            })
    }


    handleError(err) {
        this.alerts.setMessage('All the fields are required', err.message);

    }

    handleGetError(err) {
        this.alerts.setMessage('Service failure please check the logs', err.message);

    }
    handleUpdateError(err) {
        this.alerts.setMessage('Error occured while updating', err.message);

    }

    updateUserTable(projectId) {
        this.userService.updateUserProject(this.createUserPayload())
            .then(res => {
                if (res.status == 200) {
                    this.ngOnChanges();
                }
                else {
                    this.handleUpdateError(res);
                }
            })
    }



    resetForm(projects) {
        this.projects.project = null;
        this.projects.priority = null;
        this.projects.startDate = null;
        this.projects.endDate = null;
    }

    createPayload() {

        let createPayLoad = {


            "project": this.projects.project,

            "priority": this.projects.priority,

            "startDate": this.projects.startDate,

            "endDate": this.projects.endDate

        };
        return createPayLoad;
    }

    createUserPayload() {

        let createUserPayLoad = {

            "userId": this.userId,
            "project": {

                "projectId": this.projects.projectId

            }

        };
        return createUserPayLoad;
    }


    deleteProject(index) {
        this.projectService.removeProject(index)
            .then(res => {
                if (res.status == 200) {
                    this.getProjects();
                } else {
                    this.handleGetError(res);
                }
            })
    }


    filterProject() {
        this.projectService.filterProject(this.projectName)
            .then(res => {
                this.projectsList = res;

            })
    }

    filterCompletedTask() {
        this.projectService.filterCompletedTask()
            .then(res => {
                this.projectsList = res;

            })
    }

    filterManager() {

        this.userService.filterManager(this.managerName)
            .then(res => {
                this.userId = res.userId;

            })

    }

    sortByStartDate() {
        this.sortProjectList("startDate", "ASC");

    }

    sortByEndDate() {
        this.sortProjectList("endDate", "ASC");

    }

    sortByPriority() {
        this.sortProjectList("priority", "ASC");
    }

    sortProjectList(propName, order: "ASC" | "DESC"): void {
        this.projectsList.sort((a, b) => {
            if (a[propName] < b[propName])
                return -1;
            if (a[propName] > b[propName])
                return 1;
            return 0;
        });
    }



    getProjects() {
        this.projectService.getProjects()
            .then(res => {
                this.projectsList = res;

            })

    }


    goBack() {
        this.location.back();
    }
    refresh() {
        this.ngOnChanges();
    }


}