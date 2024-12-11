import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PostComponent } from '../../../shared/post/post.component';
import { PostService } from '../../../core/services/post.service';
import { Router } from '@angular/router';
import { PostOrder } from '../../../core/enums/post-order';
import { PostListModel } from '../../../core/models/posts/post-list-model';
import { PostsQueryModel } from '../../../core/models/posts/posts-query-model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;
  private postLimitReached: boolean = false;
  postQueryModel: PostsQueryModel = {
    page: 1,
    order: PostOrder.Newest
  }
 
  sortOption: string = PostOrder[0];
  posts: PostListModel[] = [];
  @ViewChildren('post') postElements!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;

  constructor(private readonly postService: PostService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.setupObserver();
  }

  deletePost(deletedPostId: number) {
    this.postService.deletePost(deletedPostId).subscribe(res => {
      this.posts = this.posts.filter(x => x.id !== deletedPostId);
    });
  }

  redirectClick($event: MouseEvent, postId: number) {
    let clickTarget = $event.target as HTMLElement;
    let targetTagName = clickTarget.tagName;
    if (targetTagName !== "BUTTON") {
      this.router.navigate(['/posts/details', postId]);
    }
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

  private loadPosts() {
    this.isLoading = true;
    this.postService.getPosts(this.postQueryModel).subscribe(res => {
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
