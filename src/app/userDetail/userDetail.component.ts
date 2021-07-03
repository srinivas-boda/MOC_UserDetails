import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy, OnChanges {

  @Input() users: any;
  constructor() { }

  userDetailsList: any;
  ngOnChanges(){
    console.log(this.users);
    this.userDetailsList = this.users;
  }
  ngOnInit(): void {
    console.log(this.users);
  }

  ngOnDestroy(){
    
  }

}
