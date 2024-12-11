import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VoteType } from '../../core/enums/vote-types';
import { FormsModule, NgForm } from '@angular/forms';
import { PostEditModel } from '../../core/models/posts/post-edit-model';
import { PostVoteService } from '../../core/services/post-vote.service';
import { PostListModel } from '../../core/models/posts/post-list-model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input('post') post?: PostListModel;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<PostEditModel>();
  isEditing: boolean = false;
  voteType = VoteType;
  postEditModel: PostEditModel = {
    id: 0,
    text: ''
  }

  constructor(private readonly router: Router, private readonly postVoteService: PostVoteService) {
    this.checkSpecialMode();
  }

  editPostFormSubmit(editPostForm: NgForm) {
    this.postEditModel.id = this.post?.id!;
    this.editEvent.emit(this.postEditModel);
    this.post!.text! = this.postEditModel.text!;
    this.isEditing = false;
    editPostForm.resetForm();
  }

  onDeleteEvent($event: MouseEvent) {
    $event.stopPropagation();
    this.deleteEvent.emit(this.post?.id);
  }

  onEditEvent($event: MouseEvent) {
    $event.stopPropagation();
    let currentRoute: string = this.router.url;
    if (!currentRoute.startsWith("/posts/details")) {
      this.router.navigateByUrl(`/posts/details/${this.post?.id}`, { state: { isEditingMode: true, text: this.post?.text } })

    } else {
      this.postEditModel.text = this.post?.text!;
      this.isEditing = true;
    }
  }

  onCancel($event: MouseEvent) {
    this.isEditing = false;
  }

  upvoteClick() {
    this.postVoteService.upvotePost(this.post?.id!).subscribe(res => {
      let voteType = this.post!.userVote.voteType;
      if (voteType === VoteType.None) {
        this.post!.userVote.voteType = VoteType.Up;
        this.post!.voteTally! += 1;
      } else if (voteType === VoteType.Up) {
        this.post!.userVote.voteType = VoteType.None;
        this.post!.voteTally! -= 1;
      } else {
        this.post!.userVote.voteType = VoteType.Up;
        this.post!.voteTally! += 2;
      }
    })
  }

  downvoteClick() {
    this.postVoteService.downvotePost(this.post?.id!).subscribe(res => {
      let voteType = this.post?.userVote.voteType;
      if (voteType === VoteType.None) {
        this.post!.userVote.voteType = VoteType.Down;
        this.post!.voteTally! -= 1;
      } else if (voteType === VoteType.Down) {
        this.post!.userVote.voteType = VoteType.None;
        this.post!.voteTally! += 1;
      } else {
        this.post!.userVote.voteType = VoteType.Down;
        this.post!.voteTally! -= 2;
      }
    });
  }

  private checkSpecialMode() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.isEditing = state?.['isEditingMode'];
    if (this.isEditing) {
      this.postEditModel.text = state?.['text'];
    }
  }
}
