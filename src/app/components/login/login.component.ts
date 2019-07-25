import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/loginService/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails: {}
  constructor(private loginService: LoginService) { }

  updateFormObject = (value) => {
   return this.loginDetails = Object.assign( {...this.loginDetails}, value);
  }

  collectUserName = (data) => {
    this.updateFormObject( {email: data});
  }
  collectPassword = (data) => {
    this.updateFormObject( {password: data});
  }
    submit = () => {
      this.loginService.mutationSendLoginCreds(this.updateFormObject);
    }
  ngOnInit() {
  }

}
