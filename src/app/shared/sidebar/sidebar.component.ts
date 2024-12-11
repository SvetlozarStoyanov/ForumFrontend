import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private readonly authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(res => {
      this.isLoggedIn = res;
    })
  }
}
