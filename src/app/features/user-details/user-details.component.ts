import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UserDetailsModel } from '../../core/models/users/user-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostListModel } from '../../core/models/posts/post-list-model';
import { PostService } from '../../core/services/post.service';
import { PostsQueryModel } from '../../core/models/posts/posts-query-model';
import { PostOrder } from '../../core/enums/post-order';
import { PostListComponent } from '../../shared/post-list/post-list.component';
import { GeneralCountPipe } from '../../core/pipes/general-count.pipe';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [PostListComponent, GeneralCountPipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  postLimitReached: boolean = false;
  user?: UserDetailsModel;
  posts: PostListModel[] = [];

  constructor(private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['userDetailsModel'];

    const postQueryModel: PostsQueryModel = {
      page: 1,
      order: PostOrder.Newest
    }

    this.loadPosts(postQueryModel);
  }

  loadMorePosts(postsQueryModel: PostsQueryModel) {
    this.loadPosts(postsQueryModel);
  }

  sortChange(postsQueryModel: PostsQueryModel) {
    this.posts = [];
    this.loadPosts(postsQueryModel);
  }

  deletePost(deletedPostId: number) {
    this.postService.deletePost(deletedPostId).subscribe(res => {
      this.posts = this.posts.filter(x => x.id !== deletedPostId);
    });
  }

  private loadPosts(postQueryModel: PostsQueryModel) {
    this.postService.getPostsFromUser(this.user?.username!, postQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.posts.push(...res);
      } else {
        this.postLimitReached = true;
      }
    });
  }
}
