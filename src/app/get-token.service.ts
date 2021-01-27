import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor() { }
  public getToken(): string {
    return localStorage.getItem('currentUser');
  }
}
