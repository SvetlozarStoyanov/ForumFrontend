import { Component, Input } from '@angular/core';
import { PostListModel } from '../../../core/models/post-list-model';
import { PostComponent } from '../../../shared/post/post.component';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subforum-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './subforum-post-list.component.html',
  styleUrl: './subforum-post-list.component.css'
})
export class SubforumPostListComponent {
  @Input() posts: PostListModel[] = [];

  constructor(private readonly postService: PostService,
    private readonly router: Router) {
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
