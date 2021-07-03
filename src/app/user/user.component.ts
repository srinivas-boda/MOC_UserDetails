import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';

import { UserDetailService } from '../services/userdetails.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  selectedUsers: any;
  constructor(private userDetailService: UserDetailService) { }

  ngOnInit(): void {
      }

  ngOnDestroy(){
   
  }

  usersSelected(event: any){
    console.log("in child ")
    this.selectedUsers = event;
  }

}
