import { Component, Input } from '@angular/core';
import { CommentListModel } from '../../models/comment-list-model';
import { NgClass } from '@angular/common';
import { CommentRepliesComponent } from "./comment-replies/comment-replies.component";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgClass, CommentRepliesComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment?: CommentListModel;
}
