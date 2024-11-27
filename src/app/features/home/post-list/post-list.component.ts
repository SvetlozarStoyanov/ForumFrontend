import { Component, OnInit } from '@angular/core';
import { PostListService } from './services/post-list.service';
import { PostListModel } from './models/post-list-model';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: PostListModel[] = [];
  constructor(private readonly postListService: PostListService) {

  }
  ngOnInit(): void {
    this.postListService.getPosts().subscribe(res => {
      this.posts = res;
    })
  }


}
