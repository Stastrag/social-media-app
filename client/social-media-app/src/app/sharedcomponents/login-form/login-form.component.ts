import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  state =AuthenticatorCompState.LOGIN;

  email = "";
  password = "";
  errorMsg = "";
  confirmPassword = "";
  username = "";
  firstName = "";
  lastName = "";  
  //router: Router;// maybe i should erase that afterwards

  constructor(private auth:AuthService, private router: Router, private bottomSheetRef: MatBottomSheetRef<LoginFormComponent>) {}

  ngOnInit(): void {
  }

  closeLoginForm() {
    this.bottomSheetRef.dismiss();
  }

  login(){
    if (this.email.trim().length===0){
      this.errorMsg = "Email is required";
    } else if (this.password.trim().length === 0){
      this.errorMsg = "Password is required";
    } else {
      this.errorMsg = "";
      let res = this.auth.login(this.email, this.password)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.auth.setSession(response);
          // Login successful, handle the response as needed
          this.router.navigate(['home']);
          this.closeLoginForm();
        },
        (error) => {
          // Login failed, handle the error
          this.errorMsg = "Login failed. Please try again.";
        }
      );
    }
  }


  register() {
    if (this.email.trim().length === 0) {
      this.errorMsg = "Email is required";
    } else if (this.password.trim().length === 0) {
      this.errorMsg = "Password is required";
    } else if (this.password !== this.confirmPassword) {
      this.errorMsg = "Passwords do not match";
    } else {
      this.errorMsg = "";
      const registrationData = {
        email: this.email,
        password: this.password,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      this.auth.register(registrationData)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.auth.setSession(response);
            // Registration successful, handle the response as needed
            this.router.navigate(['home']);
            this.closeLoginForm();
          },
          (error) => {
            // Registration failed, handle the error
            this.errorMsg = "Registration failed. Please try again.";
          }
        );
    }
  }
  
  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;

  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;

  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisteredState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
        case AuthenticatorCompState.REGISTER:
        return "Register";
        case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
      
    }
  }

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}