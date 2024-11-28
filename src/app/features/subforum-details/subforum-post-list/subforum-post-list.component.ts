import { Component, Input } from '@angular/core';
import { PostListModel } from '../../home/post-list/models/post-list-model';
import { SubforumPostComponent } from "./subforum-post/subforum-post.component";

@Component({
  selector: 'app-subforum-post-list',
  standalone: true,
  imports: [SubforumPostComponent],
  templateUrl: './subforum-post-list.component.html',
  styleUrl: './subforum-post-list.component.css'
})
export class SubforumPostListComponent {
 @Input() posts: PostListModel[] = [];
}
