import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommentRepliesComponent } from "./comment-replies/comment-replies.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommentReplyCreateModel } from '../../../../core/models/comment-replies/comment-reply-create-model';
import { CommentReplyService } from '../../../../core/services/comment-reply.service';
import { CommentReplyListModel } from '../../../../core/models/comment-replies/comment-reply-list-model';
import { AuthService } from '../../../../core/services/auth.service';
import { UserMinInfoModel } from '../../../../core/models/users/user-min-info-model';
import { VoteType } from '../../../../core/enums/vote-types';
import { Router, RouterLink } from '@angular/router';
import { CommentReplyEditModel } from '../../../../core/models/comment-replies/comment-reply-edit-model';
import { CommentVoteService } from '../../../../core/services/comment-vote.service';
import { CommentEditModel } from '../../../../core/models/comments/comment-edit-model';
import { CommentListModel } from '../../../../core/models/comments/comment-list-model';
import { DateDisplayPipe } from '../../../../core/pipes/datedisplay.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgClass, CommentRepliesComponent, FormsModule, RouterLink, DateDisplayPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @ViewChild('createReplyDiv') toggleReplyBtn!: ElementRef;
  @Input() comment?: CommentListModel;
  @Output() editEvent = new EventEmitter<CommentEditModel>();
  @Output() deleteEvent = new EventEmitter<number>();

  isEditing: boolean = false;
  isCreatingReply: boolean = false;
  voteType = VoteType;
  commentEditModel: CommentEditModel = {
    id: 0,
    text: ''
  }

  newCommentReply: CommentReplyCreateModel = {
    commentId: 0,
    text: '',
  }

  constructor(private readonly authService: AuthService,
    private readonly commentReplyService: CommentReplyService,
    private readonly commentVoteService: CommentVoteService,
    private router: Router) {
  }

  replyBtnClick() {
    if (this.isCreatingReply) {
      return;
    }
    let user: UserMinInfoModel | null = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['login']);
    }
    this.isCreatingReply = true;
  }

  createCommentReplySubmit(createCommentReplyForm: NgForm) {
    let user: UserMinInfoModel | null = this.authService.getCurrentUser();
    let addedCommentReply: CommentReplyListModel = {
      id: 0,
      text: this.newCommentReply.text,
      createdOn: new Date().toString(),
      voteTally: 0,
      user: user!,
      userVote: {
        voteType: VoteType.None
      },
      userPermittedActions: {
        canEdit: true,
        canDelete: true
      }
    };
    this.newCommentReply.commentId = this.comment?.id!;
    this.commentReplyService.createCommentReply(this.newCommentReply).subscribe(res => {
      addedCommentReply.id = res;
      this.comment!.replies = [addedCommentReply, ...this.comment?.replies!]
      createCommentReplyForm.reset();
      this.isCreatingReply = false;
    });
  }

  cancelCreatingReply($event: MouseEvent, createCommentReplyForm: NgForm) {
    createCommentReplyForm.resetForm();
    this.isCreatingReply = false;
  }

  deleteReply(replyId: number) {
    this.commentReplyService.deleteCommentReply(replyId).subscribe();
  }

  editReply(commentReplyEditModel: CommentReplyEditModel) {
    this.commentReplyService.updateCommentReply(commentReplyEditModel).subscribe();
  }

  editCommentFormSubmit(editCommentForm: NgForm) {
    this.commentEditModel.id = this.comment?.id!;
    this.editEvent.emit(this.commentEditModel);
    this.comment!.text! = this.commentEditModel.text;
    editCommentForm.reset();
    this.isEditing = false;
  }

  onCancel($event: MouseEvent) {
    this.isEditing = false;
  }

  upvoteClick() {
    this.commentVoteService.upvoteComment(this.comment?.id!).subscribe(res => {
      let voteType = this.comment!.userVote.voteType;
      if (voteType === VoteType.None) {
        this.comment!.userVote.voteType = VoteType.Up;
        this.comment!.voteTally! += 1;
      } else if (voteType === VoteType.Up) {
        this.comment!.userVote.voteType = VoteType.None;
        this.comment!.voteTally! -= 1;
      } else {
        this.comment!.userVote.voteType = VoteType.Up;
        this.comment!.voteTally! += 2;
      }
    })
  }

  downvoteClick() {
    this.commentVoteService.downvoteComment(this.comment?.id!).subscribe(res => {
      let voteType = this.comment?.userVote.voteType;
      if (voteType === VoteType.None) {
        this.comment!.userVote.voteType = VoteType.Down;
        this.comment!.voteTally! -= 1;
      } else if (voteType === VoteType.Down) {
        this.comment!.userVote.voteType = VoteType.None;
        this.comment!.voteTally! += 1;
      } else {
        this.comment!.userVote.voteType = VoteType.Down;
        this.comment!.voteTally! -= 2;
      }
    });
  }

  onDeleteEvent() {
    this.deleteEvent.emit(this.comment?.id);
  }

  onEditEvent() {
    this.commentEditModel.text = this.comment?.text!;
    this.isEditing = true;
  }
}
