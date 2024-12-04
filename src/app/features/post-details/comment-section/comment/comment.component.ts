import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentListModel } from '../../models/comment-list-model';
import { NgClass } from '@angular/common';
import { CommentRepliesComponent } from "./comment-replies/comment-replies.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommentReplyCreateModel } from '../../models/comment-reply-create-model';
import { CommentReplyService } from '../../services/comment-reply.service';
import { CommentReplyListModel } from '../../models/comment-reply-list-model';
import { AuthService } from '../../../../core/services/auth.service';
import { UserMinInfoModel } from '../../../../core/models/user-min-info-model';
import { VoteType } from '../../../../core/enums/vote-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgClass, CommentRepliesComponent, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @ViewChild('createReplyDiv') toggleReplyBtn!: ElementRef;
  @Input() comment?: CommentListModel;
  newCommentReply: CommentReplyCreateModel = {
    commentId: 0,
    text: ''
  }

  constructor(private readonly authService: AuthService,
    private readonly commentReplyService: CommentReplyService,
    private router: Router) {

  }


  replyBtnClick() {
    let user: UserMinInfoModel | null = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['login']);
    }
    this.toggleReplyBtn.nativeElement.classList.toggle('d-none');
  }

  createCommentSubmit(createCommentReplyForm: NgForm) {

    let user: UserMinInfoModel | null = this.authService.getCurrentUser();
    let addedCommentReply: CommentReplyListModel = {
      id: 0,
      text: this.newCommentReply.text,
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
    });
    createCommentReplyForm.reset();
    this.toggleReplyBtn.nativeElement.classList.toggle('d-none');
  }

  deleteReply(replyId: number) {
    this.commentReplyService.deleteCommentReply(replyId).subscribe();
  }

}
