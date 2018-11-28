import {NgForm,
    FormGroup,
        FormControl,
                Validators,
    FormBuilder } from '@angular/forms'
export class User{

user:string = "";

userId:number;

projectId:number;

firstName:string = "";

lastName:string = "";

employeeId:string = "";

formUserGroup: FormGroup = null;

constructor(){
        
    var _builder = new FormBuilder();
    this.formUserGroup = _builder.group({}); // Use the builder to create 
  
    this.formUserGroup.
    addControl("FirstNameValidator",
                new FormControl('',Validators.required)
    );
    this.formUserGroup.
    addControl("LastNameValidator",
                new FormControl('',Validators.required)
    );
    this.formUserGroup.
    addControl("EmployeeIdValidator",
                new FormControl('',Validators.required)
    );
      
}

}