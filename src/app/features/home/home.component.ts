import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostListComponent } from "./post-list/post-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
