import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {registrationForm: FormGroup;
  userData:any;
  submitted:boolean;
  constructor( private fb: FormBuilder,private _user: UserService,private rout:Router) {
    this.userData=[];
    this.submitted=false;
    this.registrationForm = fb.group({
      fname: ['', Validators.required],
      lname: ['' ,Validators.required],
      email: ['' ,[Validators.required,Validators.email]],
      address: ['' ,Validators.required],
      password: ['' ,Validators.required],
      confirmPass: ['' ,Validators.required],
      mobile: ['' ,Validators.required],
      pincode: ['' ,Validators.required]
  });
   }

  ngOnInit(): void {
  }
 userRegistration(){
  this.submitted=true;
  if(this.registrationForm.valid){
    this._user.userRegister(this.registrationForm.value).subscribe(dt => {
      console.log(dt);
        this.userData = dt;
        console.log(this.userData['success']);
        if (this.userData['success'] === true) {
            alert(this.userData['message']);
            this.rout.navigateByUrl('/');
        } else {
            alert(this.userData['message']);
        }
    });
}
 }
}
