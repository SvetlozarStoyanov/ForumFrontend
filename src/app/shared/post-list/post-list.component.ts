import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { PostListModel } from '../../core/models/posts/post-list-model';
import { PostsQueryModel } from '../../core/models/posts/posts-query-model';
import { PostOrder } from '../../core/enums/post-order';

@Component({
    selector: 'app-post-list',
    standalone: true,
    imports: [PostComponent],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.css'
})
export class PostListComponent implements AfterViewInit {
    @Input() posts: PostListModel[] = [];
    @Output() deletePostEvent = new EventEmitter<number>();
    @Output() loadMorePostsEvent = new EventEmitter<PostsQueryModel>();
    @Output() sortChangeEvent = new EventEmitter<PostsQueryModel>();
    isLoading: boolean = false;

    @ViewChildren('post') postElements!: QueryList<ElementRef>;
    private observer!: IntersectionObserver;
    private postLimitReached: boolean = false;
    postsQueryModel: PostsQueryModel = {
        page: 1,
        order: PostOrder.Newest
    }
    sortOption: string = PostOrder[0];


    constructor(private readonly router: Router) {
    }

    ngAfterViewInit() {
        this.setupObserver();
    }

    deletePost(postId: number) {
        this.deletePostEvent.emit(postId);
    }

    redirectClick($event: MouseEvent, postId: number) {
        let clickTarget = $event.target as HTMLElement;
        let targetTagName = clickTarget.tagName;
        if (targetTagName !== "BUTTON") {
            this.router.navigate(['/posts/details', postId]);
        }
    }
    onSortChange(value: number) {
        if (this.postsQueryModel.order !== value) {
            this.postsQueryModel.order = value;
            this.postsQueryModel.page = 1;
            this.sortOption = PostOrder[value];
            this.sortChangeEvent.emit(this.postsQueryModel);
        }
    }

    private setupObserver(): void {
        this.observer = new IntersectionObserver((entries) => {
            const lastEntry = entries.find((entry) => entry.isIntersecting);
            if (lastEntry && !this.isLoading && !this.postLimitReached) {
                this.postsQueryModel.page++;
                this.loadMorePostsEvent.emit(this.postsQueryModel);
            }
        });

        this.postElements.changes.subscribe(() => {
            if (this.postElements.last) {
                this.observer.observe(this.postElements.last.nativeElement);
            }
        });
    }
}
