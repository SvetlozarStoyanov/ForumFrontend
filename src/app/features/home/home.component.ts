import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostListModel } from '../../core/models/posts/post-list-model';
import { PostsQueryModel } from '../../core/models/posts/posts-query-model';
import { PostService } from '../../core/services/post.service';
import { PostListComponent } from '../../shared/post-list/post-list.component';
import { PostOrder } from '../../core/enums/post-order';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  postLimitReached: boolean = false;
  posts: PostListModel[] = [];

  constructor(private readonly postService: PostService) {

  }

  ngOnInit(): void {
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
    this.postService.getPosts(postQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.posts.push(...res);
      } else {
        this.postLimitReached = true;
      }
    });
  }
}
