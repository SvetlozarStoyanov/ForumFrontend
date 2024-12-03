import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommentListModel } from '../models/comment-list-model';
import { CommentComponent } from "./comment/comment.component";
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { EMPTY, map, Observable } from 'rxjs';
import { CommentCreateModel } from '../models/comment-create-model';
import { AuthService } from '../../../core/services/auth.service';
import { CommentService } from '../services/comment.service';

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
    this.commentService.createComment(this.newComment).pipe(map(res => {
      this.commentService.getPostComments(this.postId).subscribe(
        res => {
          this.comments = res;
        }
      )
    })).subscribe();
    createCommentForm.reset();

  }
}
