import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubforumDetailsModel } from '../../core/models/subforums/subforum-details-model';
import { SubforumService } from '../../core/services/subforum.service';
import { PostListModel } from '../../core/models/posts/post-list-model';
import { PostListComponent } from '../../shared/post-list/post-list.component';
import { PostService } from '../../core/services/post.service';
import { PostsQueryModel } from '../../core/models/posts/posts-query-model';
import { MemberCountPipe } from '../../core/pipes/membercount.pipe';
import { PostOrder } from '../../core/enums/post-order';

@Component({
  selector: 'app-subforum-details',
  standalone: true,
  imports: [PostListComponent, MemberCountPipe],
  templateUrl: './subforum-details.component.html',
  styleUrl: './subforum-details.component.css'
})
export class SubforumDetailsComponent implements OnInit {
  subforumDetails?: SubforumDetailsModel;
  posts: PostListModel[] = [];
  postLimitReached: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly subforumService: SubforumService,
    private readonly postService: PostService) {

  }
  ngOnInit(): void {
    this.subforumDetails = this.activatedRoute.snapshot.data['subforumDetailsModel'];

    const postQueryModel: PostsQueryModel = {
      page: 1,
      order: PostOrder.Newest
    }

    this.loadPosts(postQueryModel);
  }

  joinSubforum($event: MouseEvent) {
    this.subforumService.joinSubforum(this.subforumDetails?.id!).subscribe(res => {
      this.subforumDetails!.userIsMember = true;
    })
  }

  createPostRedirect($event: MouseEvent) {
    this.router.navigate(['/posts/create'], { state: { subforumId: this.subforumDetails!.id } });
  }

  leaveSubforum($event: MouseEvent) {
    this.subforumService.leaveSubforum(this.subforumDetails?.id!).subscribe(res => {
      this.subforumDetails!.userIsMember = false;
    })
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
    this.postService.getPostsFromSubforum(this.subforumDetails?.id!, postQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.posts.push(...res);
      } else {
        this.postLimitReached = true;
      }
    });
  }
}
