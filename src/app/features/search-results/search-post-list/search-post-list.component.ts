import { Component, Input } from '@angular/core';
import { SearchPostComponent } from "./search-post/search-post.component";
import { PostSearchModel } from '../../../core/models/posts/post-search-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-post-list',
  standalone: true,
  imports: [SearchPostComponent],
  templateUrl: './search-post-list.component.html',
  styleUrl: './search-post-list.component.css'
})
export class SearchPostListComponent {

  constructor(private readonly router: Router) {

  }
  @Input() posts: PostSearchModel[] = [];

  redirectClick($event: MouseEvent, postId: number) {
    this.router.navigate(['/posts/details', postId]);
  }
}
