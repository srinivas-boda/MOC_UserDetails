import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable()
export class UserDetailService{

    constructor(private http: HttpClient){}

    userInfoSubject = new Subject();
    public getUserInfo() {
        this.http.get('./assets/userdetails.json').subscribe(
            userInfo => {
                console.log(userInfo)
                this.userInfoSubject.next(userInfo);
            }
        )
    }
}