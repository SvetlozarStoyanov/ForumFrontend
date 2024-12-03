import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../core/models/register-model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerModel: RegisterModel = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }

  onSubmit() {
    this.authService.register(this.registerModel).subscribe(res => {
      this.router.navigate(['/home'])
    });

  }
}
