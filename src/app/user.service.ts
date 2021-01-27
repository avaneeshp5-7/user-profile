import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../app/url'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _https:HttpClient) {}
   userRegister(data:any){
    return this._https.post(URL.user_registraion,data);
   }
   userlogin(data:any){
    return this._https.post(URL.user_login,data);
   }
   findUser(data:any){
    return this._https.post(URL.get_user,data);
   }
   updateUser(data:any){
    return this._https.post(URL.update_user,data);
   }
}
