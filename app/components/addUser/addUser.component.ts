import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AlertsService } from 'angular-alert-module';

@Component({


    templateUrl: './addUser.component.html',
    providers: [UserService],
    styles: [`
    `]

})

export class AddUserComponent {
    user: any = {

    };
    users: Array<any> = [];
    message: string;
    title: string = "Add User";
    id: number;
    editField: string;
    searchField: string = 'firstName'
    constructor(private alerts: AlertsService, private userService: UserService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {

        this.alerts.setConfig('warn', 'icon', 'warning');
        const id = +this.route.snapshot.paramMap.get('id');
        this.getUsers();

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

    ngOnChanges() {
        this.getUsers();

    }

    addUser() {
        this.userService.createUser(this.createPayload())
            .then(res => {
                if (res.status == 200) {
                    this.resetForm(this.user);
                    this.ngOnChanges();
                }
                else {
                    this.handleError(res);
                }
            })
    }



    resetForm(user) {
        this.user.firstName = null;
        this.user.lastName = null;
        this.user.employeeId = null;
    }

    createPayload() {

        let createPayLoad = {


            "firstName": this.user.firstName,

            "lastName": this.user.lastName,

            "employeeId": this.user.employeeId

        };
        return createPayLoad;
    }


    deleteUser(index) {
        this.userService.removeUser(index)
            .then(res => {
                if (res.status == 200) {
                    this.getUsers();
                } else {
                    this.handleGetError(res);
                }
            })
    }


    editUser(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.users[id][property] = editField;
        this.user = this.users[id];
        this.userService.updateUser(this.editPayload())
            .then(res => {
                if (res.status == true) {
                    this.goBack();
                } else {
                    this.handleUpdateError(res)
                        ;
                }
            })

    }
    getUsers() {
        this.userService.getUsers()
            .then(res => {
                    this.users = res;
                
                })

    }



    editPayload() {

        let editPayLoad = {

            "userId": this.user.userId,

            "firstName": this.user.firstName,

            "lastName": this.user.lastName,

            "employeeId": this.user.employeeId

        };
        return editPayLoad;
    }

    changeValue(id: number, property: string, event: any) {
        this.editField = event.target.textContent;
    }

    goBack() {
        this.location.back();
    }
    refresh() {
        this.ngOnChanges();
    }


}