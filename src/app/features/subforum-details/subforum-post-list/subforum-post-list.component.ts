import { Component, Input } from '@angular/core';
import { PostListModel } from '../../../core/models/post-list-model';
import { PostComponent } from '../../../shared/post/post.component';

@Component({
  selector: 'app-subforum-post-list',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './subforum-post-list.component.html',
  styleUrl: './subforum-post-list.component.css'
})
export class SubforumPostListComponent {
 @Input() posts: PostListModel[] = [];
}
