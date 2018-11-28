import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

    transform(users: Array<any>, fieldName: string,  name?: string) {
        if(name){
            let filteredUser: Array<any> = null;
            filteredUser = users.filter(user => {
               return user[fieldName].startsWith(name)
            })
            return filteredUser;
        }
        return users;
    }

}