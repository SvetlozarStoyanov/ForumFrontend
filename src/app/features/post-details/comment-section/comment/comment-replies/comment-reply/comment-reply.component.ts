import { Component, Input, Output } from '@angular/core';
import { CommentReplyListModel } from '../../../../models/comment-reply-list-model';
import { NgClass } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentReplyEditModel } from '../../../../models/comment-reply-edit-model';

@Component({
  selector: 'app-comment-reply',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './comment-reply.component.html',
  styleUrl: './comment-reply.component.css'
})
export class CommentReplyComponent {

  @Input() reply?: CommentReplyListModel;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<CommentReplyEditModel>();
  isEditing: boolean = false;
  replyEditModel: CommentReplyEditModel = {
    id: 0,
    text: ''
  }

  onDeleteEvent() {
    this.deleteEvent.emit(this.reply?.id);
  }

  editCommentReplyFormSubmit(editCommentReplyForm: NgForm) {
    this.replyEditModel.id = this.reply?.id!;
    this.editEvent.emit(this.replyEditModel);
    this.reply!.text = this.replyEditModel.text;
    editCommentReplyForm.reset();
    this.isEditing = false;
  }

  onEditEvent() {
    this.replyEditModel.text = this.reply?.text!;
    this.isEditing = true;
  }

  onCancel($event: MouseEvent) {
    this.isEditing = false;
  }
}
