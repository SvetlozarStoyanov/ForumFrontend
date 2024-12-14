import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  isLoggedIn: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(res => {
      this.isLoggedIn = res;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isSearchView = this.router.url.startsWith('/search-results');
        if (!isSearchView) {
          this.searchTerm = '';
        }
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(res => {
      window.location.reload();
    });
  }

  myProfileRedirect() {
    const currentUser = this.authService.getCurrentUser();
    this.router.navigate(['/users', currentUser?.username]);
  }

  searchSubmit(searchForm: NgForm) {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm, timestamp: new Date().getTime(), type: 'subforums' },
      queryParamsHandling: 'merge',
    });
  }
}
