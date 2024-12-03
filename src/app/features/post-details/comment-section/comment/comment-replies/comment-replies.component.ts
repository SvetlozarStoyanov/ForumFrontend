import { Component, Input } from '@angular/core';
import { CommentReplyListModel } from '../../../models/comment-reply-list-model';
import { CommentReplyComponent } from "./comment-reply/comment-reply.component";

@Component({
  selector: 'app-comment-replies',
  standalone: true,
  imports: [CommentReplyComponent],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css'
})
export class CommentRepliesComponent {
  @Input() replies: CommentReplyListModel[] = [];

}
