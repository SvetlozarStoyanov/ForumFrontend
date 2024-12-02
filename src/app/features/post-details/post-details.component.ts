import { Component, OnInit } from '@angular/core';
import { PostDetailsService } from './services/post-details.service';
import { PostDetailsModel } from './models/post-details-model';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostComponent } from "../../shared/post/post.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgClass, PostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  postdetailsModel: PostDetailsModel | undefined;
  constructor(private readonly postDetailsService: PostDetailsService,
    private readonly activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    const postIdString = this.activatedRoute.snapshot.paramMap.get('id')!;
    
    this.postDetailsService.getPostDetailsById(postIdString).subscribe(res => {
      this.postdetailsModel = res;
    });
  }


}
