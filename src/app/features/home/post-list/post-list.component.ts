import { Component, OnInit } from '@angular/core';
import { PostListService } from './services/post-list.service';
import { PostComponent } from '../../../shared/post/post.component';
import { PostListModel } from '../../../core/models/post-list-model';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  posts: PostListModel[] = [];
  constructor(private readonly postListService: PostListService,
    private readonly postService: PostService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.postListService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  deletePost(deletedPostId: number) {
    this.postService.deletePost(deletedPostId).subscribe(res => {
      this.posts = this.posts.filter(x => x.id !== deletedPostId);
    });
  }

  redirectClick($event: MouseEvent, postId: number) {
    let clickTarget = $event.target as HTMLElement;
    let targetTagName = clickTarget.tagName;
    console.log(targetTagName);
    if (targetTagName !== "BUTTON") {
      this.router.navigate(['/posts/details', postId]);
    }
  }
}
