import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeComponent } from './like.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { UserLoginModule } from '../user-login/user-login.module';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    UserLoginModule
  ],
  declarations: [ LikeComponent ],
  exports: [ LikeComponent ]
})
export class LikeModule { }
