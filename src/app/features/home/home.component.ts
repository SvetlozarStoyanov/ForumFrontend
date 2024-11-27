import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostComponent } from "./post-list/post/post.component";
import { PostListComponent } from "./post-list/post-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the authStatus$ observable to track authentication status
    this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}
