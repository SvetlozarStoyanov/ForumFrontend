import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentReplyListModel } from '../../../models/comment-reply-list-model';
import { CommentReplyComponent } from "./comment-reply/comment-reply.component";
import { CommentReplyEditModel } from '../../../models/comment-reply-edit-model';


@Component({
  selector: 'app-comment-replies',
  standalone: true,
  imports: [CommentReplyComponent],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css'
})
export class CommentRepliesComponent {

  @Input() replies: CommentReplyListModel[] = [];
  @Output() onReplyDelete = new EventEmitter<number>()
  @Output() onReplyEdit = new EventEmitter<CommentReplyEditModel>()

  onEdit(replyEditModel: CommentReplyEditModel) {
    this.onReplyEdit.emit(replyEditModel);
  }

  onDelete(deletedReplyId: number) {
    this.onReplyDelete.emit(deletedReplyId);
    this.replies = this.replies.filter(x => x.id !== deletedReplyId)
  }

}
