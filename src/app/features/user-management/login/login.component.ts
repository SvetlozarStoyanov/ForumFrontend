import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../../core/models/login-model';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel: LoginModel = {
    username: '',
    password: ''
  };

  loginFailed: boolean = false;

  constructor(private readonly authService: AuthService, private router: Router) {

  }


  onSubmit() {
    this.authService.login(this.loginModel).subscribe(res => {
      if (res && res.id && res.username) {
        // Redirect only if id and username are present
        this.router.navigate(['/home']);
      } else {
        this.loginFailed = true;
      }
    })
  }
}
