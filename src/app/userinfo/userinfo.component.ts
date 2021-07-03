import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserDetailService } from '../services/userdetails.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit, OnDestroy {

  userDetails: any;
  selectedUsers: any = [];
  userDetailSubscription: Subscription = new Subscription();
  rowsPerPage:any = [];
  pagedData: any;
  pageStartIndex: number = 0;
  pageEndIndex: number = 0;
  currentPage: number = 0;
  rowsPerPageSelected: number = 3;
  @Output() usersSelected: EventEmitter<any> = new EventEmitter();
  constructor(private userDetailService: UserDetailService) { }

  ngOnInit(): void {
    this.userDetailSubscription = this.userDetailService.userInfoSubject.subscribe(
      userData => {
        this.userDetails = userData;
        const totalUsers = this.userDetails.length;
        for(let i = this.rowsPerPageSelected; i<= totalUsers; i+=this.rowsPerPageSelected){
          this.rowsPerPage.push(i);
        }
        if(this.rowsPerPage.length !== Math.ceil(this.userDetails.length/this.rowsPerPageSelected)){
          this.rowsPerPage.push(this.userDetails.length);
        }
        this.pageStartIndex = 0;
        this.pageEndIndex = this.rowsPerPageSelected;
        this.getPagedData(this.pageStartIndex, this.pageEndIndex);
      }
    );
    this.userDetailService.getUserInfo();
  }

  ngOnDestroy(){
    this.userDetailSubscription.unsubscribe();
  }

  getPagedData(startIndex: number, endIndex: number){
    this.pagedData = this.userDetails.slice(startIndex, endIndex)
  }

  rowsPerPageChanged(event: any){
    this.rowsPerPageSelected = +event.target.value;
    this.pageStartIndex = this.rowsPerPageSelected * this.currentPage;
    if(this.pageStartIndex >= this.userDetails.length){
      this.pageStartIndex = 0;
      this.currentPage = 0;
    }
    this.pageEndIndex = this.pageStartIndex + this.rowsPerPageSelected;
    if(this.pageEndIndex > this.userDetails.length){
      this.pageEndIndex = this.userDetails.length;
    }
    this.getPagedData(this.pageStartIndex, this.pageEndIndex);
  }

  nextPagedData(){
    this.currentPage = this.currentPage + 1;
    this.pageStartIndex = this.rowsPerPageSelected * this.currentPage;
    if(this.pageStartIndex > this.userDetails.length){
      this.pageStartIndex = 0;
      this.currentPage = 0;
    }
    this.pageEndIndex = this.pageStartIndex + this.rowsPerPageSelected;
    if(this.pageEndIndex > this.userDetails.length){
      this.pageEndIndex = this.userDetails.length;
    }
    this.getPagedData(this.pageStartIndex, this.pageEndIndex);
  }

  previousPagedData(){
    this.currentPage = this.currentPage - 1;
    this.pageStartIndex = this.rowsPerPageSelected * this.currentPage;
    if(this.pageStartIndex > this.userDetails.length){
      this.pageStartIndex = 0;
      this.currentPage = 0;
    }
    this.pageEndIndex = this.pageStartIndex + this.rowsPerPageSelected;
    if(this.pageEndIndex > this.userDetails.length){
      this.pageEndIndex = this.userDetails.length;
    }
    this.getPagedData(this.pageStartIndex, this.pageEndIndex);
  }

  selectedUser(event: any, isHeaderClicked: boolean, isAllUsersSelected: boolean){
      const selectedUsers:any = document.getElementsByName('userInfo');
      const toggleUsers: any = document.getElementsByName('toggleAllUsers')[0];
      console.log(this.rowsPerPage.length, this.pageStartIndex, this.pageEndIndex)
      this.selectedUsers = this.selectedUsers.length > 0 ? this.selectedUsers : [];
      if(isHeaderClicked){
        if(isAllUsersSelected){
          this.selectedUsers = [...this.userDetails];
        }
        else{
          this.selectedUsers = [];
        }
      }
      else{
        const rowIndex = event.target.parentNode.parentNode.rowIndex;
        const selectedUserIndex = (this.currentPage * this.rowsPerPageSelected) + rowIndex;
        
        this.userDetails[selectedUserIndex]['isSelected'] = event.target.checked;
        if(event.target.checked){
          this.selectedUsers.push(this.userDetails[selectedUserIndex]);
        }
        else{
          for(let i=0; i<this.selectedUsers.length; i++){
            if(this.selectedUsers[i].id === this.userDetails[selectedUserIndex].id){
              this.selectedUsers.splice(i,1);
            }
          }
        }
      
      let userNotSelected:boolean =  false;
      userNotSelected = this.userDetails.some((item: any, index:number) => {
        return !item.isSelected;
      });
      if(userNotSelected){
        toggleUsers.checked = false;
      }
    }
    this.usersSelected.emit(this.selectedUsers);
  }

  selectAllusers(event: any){
    const checked = event.target.checked;
    for(let i=0; i<this.userDetails.length; i++){
      this.userDetails[i]['isSelected'] = checked;
    }
    this.selectedUser(event, true, checked);
  }
}
