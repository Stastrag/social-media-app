import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  login(email:string, password:string) {
    console.log('Logging in...')

    return this.http.post('http://localhost:3001/auth/login', {email: email, password: password}).pipe(
      shareReplay()
    );
  }

  register(registrationData: any): Observable<any> {
    return this.http.post('http://localhost:3001/auth/register', registrationData).pipe(
      shareReplay()
    );
  }

  setSession(authResult: any) {
    console.log('settingSession')
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('userToken', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }     

  logout() {
    console.log('Logging out');
    localStorage.removeItem("userToken");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  
getExpiration(): moment.Moment | null {
  const expiration = localStorage.getItem("expires_at");
  if (expiration) {
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  return null;
}

}
