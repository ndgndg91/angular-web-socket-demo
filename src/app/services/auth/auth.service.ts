import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) { }

  isAuthenticated(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    const expired = this.jwtHelperService.isTokenExpired(jwt);
    if (!expired) {
      localStorage.setItem('my-new-a', jwt);
    }

    return new Observable<boolean>(subscriber => {
      subscriber.next(!expired);
    });
  }
}
