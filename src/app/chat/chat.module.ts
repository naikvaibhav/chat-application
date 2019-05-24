import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
//routing
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatboxComponent],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      {path:'chat', component:ChatboxComponent}

    ]),
    SharedModule
  ]
})
export class ChatModule { }
