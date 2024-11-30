import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private readonly authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  logout() {
    this.authService.logout().subscribe(rest => {
      
    });
  }
}
