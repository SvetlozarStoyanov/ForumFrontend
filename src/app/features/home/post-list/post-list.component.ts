import { Component, OnInit } from '@angular/core';
import { PostListService } from './services/post-list.service';


import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { PostComponent } from '../../../shared/post/post.component';
import { PostListModel } from '../../../core/models/post-list-model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, AsyncPipe, NgIf],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts$?: Observable<PostListModel[]>;
  constructor(private readonly postListService: PostListService) {

  }
  ngOnInit(): void {
    this.posts$ = this.postListService.getPosts();
  }


}
