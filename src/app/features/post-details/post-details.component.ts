import { Component, OnInit } from '@angular/core';
import { PostDetailsService } from './services/post-details.service';
import { PostDetailsModel } from './models/post-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComponent } from "../../shared/post/post.component";
import { FormsModule } from '@angular/forms';
import { CommentSectionComponent } from "./comment-section/comment-section.component";
import { PostService } from '../../core/services/post.service';
import { PostEditModel } from '../../core/models/post-edit-model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostComponent, FormsModule, CommentSectionComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  postdetailsModel: PostDetailsModel | undefined;

  constructor(private readonly postDetailsService: PostDetailsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postService: PostService,
    private router: Router) {
  }

  ngOnInit(): void {
    const postIdString = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.postDetailsService.getPostDetailsById(postIdString).subscribe(res => {
      this.postdetailsModel = res;
    })
  }

  onPostEdit(postEditModel: PostEditModel) {
    this.postService.updatePost(postEditModel).subscribe(res => {
    })
  }

  onPostDelete(deletedPostId: number) {
    this.postService.deletePost(deletedPostId).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

}
