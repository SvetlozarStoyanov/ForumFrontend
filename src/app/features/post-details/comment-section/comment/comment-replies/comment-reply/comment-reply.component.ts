import { Component, Input, Output } from '@angular/core';
import { CommentReplyListModel } from '../../../../models/comment-reply-list-model';
import { NgClass } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-reply',
  standalone: true,
  imports: [NgClass],
  templateUrl: './comment-reply.component.html',
  styleUrl: './comment-reply.component.css'
})
export class CommentReplyComponent {

  @Input() reply?: CommentReplyListModel;
  @Output() deleteEvent = new EventEmitter<number>();


  onDeleteEvent() {
    console.log(this.reply?.id)
    this.deleteEvent.emit(this.reply?.id);
  }
}
