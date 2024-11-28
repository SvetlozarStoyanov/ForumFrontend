import { Component, Input } from '@angular/core';
import { PostListModel } from '../../../home/post-list/models/post-list-model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subforum-post',
  standalone: true,
  imports: [NgClass],
  templateUrl: './subforum-post.component.html',
  styleUrl: './subforum-post.component.css'
})
export class SubforumPostComponent {
  @Input('post') post?: PostListModel;

  constructor(private readonly router: Router) {

  }

  onClick() {
    this.router.navigate(['/posts/details', this.post?.id])
  }

  upvoteClick(e: MouseEvent) {
    e.stopPropagation();
  }

  downvoteClick(e: MouseEvent) {
    e.stopPropagation();
  }
}
