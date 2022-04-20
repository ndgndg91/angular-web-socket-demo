import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInEndpoint = environment.signInEndpoint;
  constructor(private jwtHelperService: JwtHelperService, private client: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    const expired = this.jwtHelperService.isTokenExpired(jwt);

    return new Observable<boolean>(subscriber => {
      subscriber.next(!expired);
    });
  }

  signIn(username: string, password: string): void {
    this.client.post<LoginCompleteResponse>(this.signInEndpoint, new SignInRequest(username, password)).toPromise()
      .then(resp => {
        localStorage.setItem('token', resp.accessToken);
        console.log(resp);
        window.location.href = 'dashboard';
      })
      .catch(err => console.log(err));
  }
}

class SignInRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

interface LoginCompleteResponse {
  username: string;
  accessToken: string;
}
