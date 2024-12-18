import { Component, Input, OnInit } from '@angular/core';
import { CommentComponent } from "./comment/comment.component";
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CommentService } from '../../../core/services/comment.service';
import { VoteType } from '../../../core/enums/vote-types';
import { CommentCreateModel } from '../../../core/models/comments/comment-create-model';
import { CommentEditModel } from '../../../core/models/comments/comment-edit-model';
import { CommentListModel } from '../../../core/models/comments/comment-list-model';


@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommentComponent, FormsModule, AsyncPipe],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input() postId: number = 0;

  comments: CommentListModel[] = [];
  isLoggedIn$?: Observable<boolean>;
  newComment: CommentCreateModel = {
    postId: 0,
    text: '',
  };

  constructor(
    private readonly authService: AuthService,
    private readonly commentService: CommentService) {
  }

  ngOnInit(): void {
    console.log(this.postId);
    this.commentService.getPostComments(this.postId).subscribe(
      res => {
        this.comments = res;
      }
    )
    this.isLoggedIn$ = this.authService.authStatus$;
  }

  createCommentSubmit(createCommentForm: NgForm) {
    this.newComment.postId = this.postId;
    let currentUser = this.authService.getCurrentUser();
    let addedComment: CommentListModel = {
      id: 0,
      text: this.newComment.text,
      createdOn: new Date().toString(),
      voteTally: 0,
      user: {
        id: currentUser!.id,
        username: currentUser!.username
      },
      userPermittedActions: {
        canEdit: true,
        canDelete: true
      },
      userVote: {
        voteType: VoteType.None
      },
      replies: []
    };
    this.commentService.createComment(this.newComment).subscribe(res => {
      addedComment.id = res;
      this.comments = [addedComment, ...this.comments]
    })
    createCommentForm.reset();
  }

  editComment(commentEditModel: CommentEditModel) {
    this.commentService.updateComment(commentEditModel).subscribe(res => {

    });
  }

  deleteComment(deletedCommentId: number) {
    this.commentService.deleteComment(deletedCommentId).subscribe(res => {
      this.comments = this.comments.filter(x => x.id !== deletedCommentId);
    })
  }
}
