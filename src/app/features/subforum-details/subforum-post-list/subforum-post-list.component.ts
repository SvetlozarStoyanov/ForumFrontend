import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PostListModel } from '../../../core/models/post-list-model';
import { PostComponent } from '../../../shared/post/post.component';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';
import { PostsQueryModel } from '../../../core/models/posts-query-model';
import { PostOrder } from '../../../core/enums/post-order';
import { SubforumDetailsModel } from '../../../core/models/subforum-details-model';

@Component({
  selector: 'app-subforum-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './subforum-post-list.component.html',
  styleUrl: './subforum-post-list.component.css'
})
export class SubforumPostListComponent implements OnInit {
  @Input() subforum?: SubforumDetailsModel;
  posts: PostListModel[] = [];
  isLoading: boolean = false;
  
  sortOption: string = PostOrder[0];
  @ViewChildren('post') postElements!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;
  private postLimitReached: boolean = false;
  postQueryModel: PostsQueryModel = {
    page: 1,
    order: PostOrder.Newest
  }

  constructor(private readonly postService: PostService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.setupObserver();
  }

  onSortChange(value: number) {
    if (this.postQueryModel.order !== value) {
      this.posts = [];
      this.postQueryModel.order = value;
      this.postQueryModel.page = 1;
      this.loadPosts();
      this.sortOption = PostOrder[value];
    }
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

  private loadPosts() {
    this.isLoading = true;
    this.postService.getPostsFromSubforum(this.subforum?.id!, this.postQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.posts.push(...res);
      } else {
        this.postLimitReached = true;
      }
      this.isLoading = false;
    });
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries.find((entry) => entry.isIntersecting);
      if (lastEntry && !this.isLoading && !this.postLimitReached) {
        this.postQueryModel.page++;
        this.loadPosts();
      }
    });

    this.postElements.changes.subscribe(() => {
      if (this.postElements.last) {
        this.observer.observe(this.postElements.last.nativeElement);
      }
    });
  }
}
