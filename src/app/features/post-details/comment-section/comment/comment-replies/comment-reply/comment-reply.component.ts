import { Component, Input, Output } from '@angular/core';
import { CommentReplyListModel } from '../../../../../../core/models/comment-replies/comment-reply-list-model';
import { NgClass } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentReplyEditModel } from '../../../../../../core/models/comment-replies/comment-reply-edit-model';
import { VoteType } from '../../../../../../core/enums/vote-types';
import { CommentReplyVoteService } from '../../../../../../core/services/comment-reply-vote.service';
import { RouterLink } from '@angular/router';
import { DateDisplayPipe } from '../../../../../../core/pipes/datedisplay.pipe';

@Component({
  selector: 'app-comment-reply',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink, DateDisplayPipe],
  templateUrl: './comment-reply.component.html',
  styleUrl: './comment-reply.component.css'
})
export class CommentReplyComponent {

  @Input() reply?: CommentReplyListModel;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<CommentReplyEditModel>();
  isEditing: boolean = false;
  voteType = VoteType;
  replyEditModel: CommentReplyEditModel = {
    id: 0,
    text: ''
  }

  constructor(private readonly commentReplyVoteService: CommentReplyVoteService) {

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

  upvoteClick() {
    this.commentReplyVoteService.upvoteCommentReply(this.reply?.id!).subscribe(res => {
      let voteType = this.reply!.userVote.voteType;
      if (voteType === VoteType.None) {
        this.reply!.userVote.voteType = VoteType.Up;
        this.reply!.voteTally! += 1;
      } else if (voteType === VoteType.Up) {
        this.reply!.userVote.voteType = VoteType.None;
        this.reply!.voteTally! -= 1;
      } else {
        this.reply!.userVote.voteType = VoteType.Up;
        this.reply!.voteTally! += 2;
      }
    })
  }

  downvoteClick() {
    this.commentReplyVoteService.downvoteCommentReply(this.reply?.id!).subscribe(res => {
      let voteType = this.reply?.userVote.voteType;
      if (voteType === VoteType.None) {
        this.reply!.userVote.voteType = VoteType.Down;
        this.reply!.voteTally! -= 1;
      } else if (voteType === VoteType.Down) {
        this.reply!.userVote.voteType = VoteType.None;
        this.reply!.voteTally! += 1;
      } else {
        this.reply!.userVote.voteType = VoteType.Down;
        this.reply!.voteTally! -= 2;
      }
    });
  }

  onCancel($event: MouseEvent) {
    this.isEditing = false;
  }
}
