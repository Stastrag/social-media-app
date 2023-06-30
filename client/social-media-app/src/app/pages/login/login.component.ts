import { Component,OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { LoginFormComponent } from 'src/app/sharedcomponents/login-form/login-form.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private loginSheet: MatBottomSheet) {}

  ngOnInit(): void {

  }

  onGetStartedClick(){
    this.loginSheet.open(LoginFormComponent);
  }
 
}
