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
  allUsers: any
  userdata: any;
  profile: boolean;
  editPage: boolean;
  showUser: boolean;
  faPencilAlt = faPencilAlt;
  errMsg;
  submitted: boolean;
  registrationForm: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder) {
    this.userid = '';
    this.userdata = [];
    this.profile = true;
    this.showUser = false;
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
    if (localStorage.getItem('currentUser') != null) {
      this.userid = JSON.parse(localStorage.getItem('currentUser'));
      this.init();
    }
  }
  init() {
    this.service.findUser({ id: this.userid.user_id }).subscribe(user => {
      this.userdata = user['data'][0]
    });
  }
  editPach() {
    this.profile = false;
    this.editPage = true;
    this.registrationForm.patchValue(this.userdata);
  }
  cancelUpadte() {
    this.profile = true;
    this.editPage = false;
  }
  updateUser() {
    var ids = this.userdata.user_id ? this.userdata.user_id : this.userid.user_id
    this.registrationForm.value.id = ids;
    if (this.registrationForm.valid) {
      this.service.updateUser(this.registrationForm.value).subscribe(updat => {
        if (updat['success'] == true) {
          Swal.fire('Success', 'Profile updated !', 'success').then((result) => {
            console.log(result)
            if (result.value == true) {
              this.profile = true;
              this.editPage = false;
              this.getAllUser();
            } else {
              return;
            }
          })
        } else {
          this.errMsg = updat['message'];
          Swal.fire('Failed', 'Not updated !', 'error');
        }
      });
    }
  }
  getAllUser() {
      this.service.findAllUsers().subscribe(users => {
        this.allUsers = users['data'];
        this.showUser = true;
        if (this.allUsers.length === 0) {
          localStorage.removeItem('currentUser');
        }
      });
  }
  closeAllUsers() {
    this.showUser = false;
  }
  selctedUser(user: any) {
    this.userdata = user;
  }
  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it !',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUser({ id: id }).subscribe(dt => {
          if (dt['success'] == true) {
            Swal.fire(
              'Deleted!',
              'User has been deleted !',
              'success'
            ).then((result) => {
              if (result.value == true) {
                this.getAllUser();
              }
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User is safe :)',
          'error'
        )
      }
    })
  }
}

