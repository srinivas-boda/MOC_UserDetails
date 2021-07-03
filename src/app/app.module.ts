import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserDetailService } from './services/userdetails.service';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './userDetail/userDetail.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    UserDetailComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
