import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean;
  userData:any;
  constructor( private fb: FormBuilder,private _user: UserService,private rout:Router) {
    this.userData=[];
    this.submitted=false
    this.loginForm = fb.group({
      email: ['' ,[Validators.required,Validators.email]],
      password: ['' ,Validators.required],
  });
   }

  ngOnInit(): void {
  }
  goRegistration(){
    this.rout.navigateByUrl('/user-registration');
  }
 userLogin(){
  this.submitted=true;
  if(this.loginForm.valid){
    this._user.userlogin(this.loginForm.value).subscribe(dt => {
        this.userData = dt;
        if (this.userData['success'] === true) {
           localStorage.setItem('currentUser',JSON.stringify(this.userData['data'][0]));
            this.rout.navigateByUrl('/user-profile');
        } else {
            alert(this.userData['message']);
        }
    });
}
 }
}
