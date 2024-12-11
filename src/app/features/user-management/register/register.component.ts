import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterModel } from '../../../core/models/user-management/register/register-model';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { NameNotTakenDirective } from '../../../core/directives/name-not-taken.directive';
import { PasswordMatchDirective } from '../../../core/directives/password-match.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NameNotTakenDirective, PasswordMatchDirective, RouterLink, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  allUsernames: string[] = [];

  registerModel: RegisterModel = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAllUsernames().subscribe(res => {
      this.allUsernames = res;
    });
  }

  onSubmit() {
    this.authService.register(this.registerModel).subscribe(res => {
      if (res && res.id && res.username) {
        // Redirect only if id and username are present
        this.router.navigate(['/home']);
      }
    });

  }
}
