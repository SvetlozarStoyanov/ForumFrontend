import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostCreateModel } from './models/post-create-model';
import { SubforumDropdownModel } from './models/subforum-dropdown-model';
import { SubforumDropdownService } from './services/subforum-dropdown.service';
import { PostService } from '../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  subforumsForDropdown: SubforumDropdownModel[] = [];
  selectedSubforum?: SubforumDropdownModel;

  postCreateModel: PostCreateModel = {
    title: '',
    text: '',
    subforumId: 0,
  }

  constructor(private readonly subforumDropdownService: SubforumDropdownService,
    private readonly postService: PostService,
    private readonly router: Router) {

  }

  ngOnInit(): void {
    this.subforumDropdownService.getSubforumsForDropdown().subscribe(res => {
      this.subforumsForDropdown = res;
      this.selectedSubforum = this.subforumsForDropdown[0];
    })
  }

  onSubmit(createPostForm: NgForm) {
    this.postCreateModel.subforumId = this.selectedSubforum?.id!;
    this.postService.createPost(this.postCreateModel).subscribe(res => {

      this.router.navigate(['/posts/details', res]);
    });
  }

}
