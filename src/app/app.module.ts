import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//routing
import { RouterModule, Routes } from '@angular/router';

//importing modules
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChatModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule,

    ToastrModule.forRoot(),

    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
