import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userid: any;
  userdata: any;
  profile: boolean;
  editPage: boolean;
  faPencilAlt = faPencilAlt;
  errMsg;
  submitted: boolean;
  registrationForm: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder) {
    this.userid = '';
    this.userdata = [];
    this.profile = true;
    this.editPage = false;
    this.registrationForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.userid = JSON.parse(localStorage.getItem('currentUser'));
    this.init();
  }
  init(){
    this.service.findUser({ id: this.userid.user_id }).subscribe(user => {
      this.userdata = user['data'][0]
    });
  }
  editPach() {
    this.profile = false;
    this.editPage = true;
    this.registrationForm.patchValue(this.userdata);
  }
  updateUser() {
    var ids = this.userid.user_id
    this.registrationForm.value.id = ids;
    if (this.registrationForm.valid) {
      this.service.updateUser(this.registrationForm.value).subscribe(updat => {
        if (updat['success'] == true) {
          Swal.fire('Success', 'Profile updated !', 'success');
          this.profile = true;
          this.editPage = false;
          this.init();
        }else{
          this.errMsg=updat['message'];
          Swal.fire('Failed', 'Not updated !', 'error');
        }
      });
    }
  }
}
