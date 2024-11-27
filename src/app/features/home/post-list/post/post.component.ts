import { Component, Input } from '@angular/core';
import { PostListModel } from '../models/post-list-model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass],
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
