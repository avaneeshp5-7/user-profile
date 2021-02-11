import { Component, OnInit,OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faArrowAltCircleRight,faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  newForm: FormGroup;
  userData:any;
  submitted:boolean;
  hidebtn:boolean;
  faArrowLeft=faArrowAltCircleRight;
  faSpinner=faSpinner;
  constructor( private fb: FormBuilder,private _user: UserService,private rout:Router) {
    this.userData=[];
    this.submitted=false;
    this.hidebtn=false;
    this.registrationForm = fb.group({
      fname: ['', Validators.required],
      lname: ['' ,Validators.required],
      email: ['' ,[Validators.required,Validators.email]],
      address: ['' ,Validators.required],
      mobile: ['' ,Validators.required],
      pincode: ['' ,Validators.required],
      password: ['' ,Validators.required],
      confirmPass: ['' ,Validators.required]
  });
  this.newForm=fb.group({
    name:[''],
    job:['']
  });
   }

  ngOnInit(): void {
   
  }
  
 userRegistration(){
  this.submitted=true;
  setTimeout(() => {
    if(this.registrationForm.valid){
      this._user.userRegister(this.registrationForm.value).subscribe(dt => {
        console.log(dt);
          this.userData = dt;
          console.log(this.userData['success']);
          if (this.userData['success'] === true) {
            Swal.fire('Success', 'User Sign Up  !', 'success').then((result) => {
              if (result.value == true) {
                this.rout.navigateByUrl('/');
              } else {
                result;
              }
            });
          } else {
            Swal.fire('Fail !', this.userData['message'], 'error');
            this.submitted=false;
          }
      });
  }
  },3000)
 }
}
