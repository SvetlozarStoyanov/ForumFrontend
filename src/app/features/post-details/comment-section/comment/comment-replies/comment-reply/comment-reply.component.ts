import { Component, Input } from '@angular/core';
import { CommentReplyListModel } from '../../../../models/comment-reply-list-model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comment-reply',
  standalone: true,
  imports: [NgClass],
  templateUrl: './comment-reply.component.html',
  styleUrl: './comment-reply.component.css'
})
export class CommentReplyComponent {
  @Input() reply?: CommentReplyListModel;
}
