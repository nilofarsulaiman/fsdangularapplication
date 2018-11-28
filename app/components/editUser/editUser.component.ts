import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AlertsService } from 'angular-alert-module';

@Component({

    templateUrl: './editUser.component.html',
    providers: [UserService],
    styles: [`
	`]
})

export class EditUserComponent {
    user: any = {

    };
    message: string;
    title: string = "Update User";
    id: number;

    constructor(private alerts: AlertsService,private userService: UserService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {


        this.alerts.setConfig('warn', 'icon', 'warning');
        const id = +this.route.snapshot.paramMap.get('id');
        if (+id >= 0) {

            this.id = +id;
            this.getUser(this.id);
        }
        
    }

    handleGetError(err) {
        this.alerts.setMessage('Service failure please check the logs', err.message);

    }
    handleUpdateError(err) {
        this.alerts.setMessage('Error occured while updating', err.message);

    }

    editUser() {
        this.userService.updateUser(this.editPayload())
            .then(res => {
                if(res.status==500){
                    this.goBack();
                }else{
                    this.handleUpdateError(res);
                }
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

    getUser(index) {
        this.userService.getUser(index)
            .then(res => {
                if(res.status==500){
                this.user = res;
                }else{
                    this.handleGetError(res);
                }
            })
    }
    goBack() {
        this.location.back();
    }


    resetForm(user) {
        this.user.firstName = null;
        this.user.lastName = null;
        this.user.employeeId = null;
    }

}