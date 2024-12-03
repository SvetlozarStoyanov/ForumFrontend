import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../../core/models/login-model';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel: LoginModel = {
    username: '',
    password: ''
  };

  constructor(private readonly authService: AuthService, private router: Router) {

  }


  onSubmit() {
    this.authService.login(this.loginModel).subscribe(res => {
      this.router.navigate(['/home']);
    })
  }
}
