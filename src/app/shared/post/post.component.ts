import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PostListModel } from '../../core/models/post-list-model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input('post') post?: PostListModel;

  constructor(private readonly router: Router) {

  }

  onClick() {
    this.router.navigate(['/posts/details', this.post?.id])
  }
}
