import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'UserDetails';

  users: any;
  ngOnInit(){
    console.log(this.users);
  }

  ngOnChanges(){
    console.log(this.users)
  }

  selectedUsers(event: any){
    console.log(event)
  }
}
