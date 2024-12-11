import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubforumPostListComponent } from "./subforum-post-list/subforum-post-list.component";
import { SubforumDetailsModel } from '../../core/models/subforums/subforum-details-model';
import { SubforumService } from '../../core/services/subforum.service';

@Component({
  selector: 'app-subforum-details',
  standalone: true,
  imports: [SubforumPostListComponent],
  templateUrl: './subforum-details.component.html',
  styleUrl: './subforum-details.component.css'
})
export class SubforumDetailsComponent implements OnInit {
  subforumDetails?: SubforumDetailsModel;
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly subforumService: SubforumService) {

  }
  ngOnInit(): void {
    this.subforumDetails = this.activatedRoute.snapshot.data['subforumDetailsModel'];
  }

  joinSubforum($event: MouseEvent) {
    this.subforumService.joinSubforum(this.subforumDetails?.id!).subscribe(res => {
      this.subforumDetails!.userIsMember = true;
    })
  }

  createPostRedirect($event: MouseEvent) {
    this.router.navigate(['/posts/create'], { state: { subforumId: this.subforumDetails!.id } });
  }

  leaveSubforum($event: MouseEvent) {
    this.subforumService.leaveSubforum(this.subforumDetails?.id!).subscribe(res => {
      this.subforumDetails!.userIsMember = false;
    })
  }
}
