import { Component, OnInit } from '@angular/core';
import { SubforumDetailsService } from './services/subforum-details.service';
import { SubforumDetailsModel } from './models/subforum-details-model';
import { ActivatedRoute } from '@angular/router';
import { SubforumPostListComponent } from "./subforum-post-list/subforum-post-list.component";
import { PostListModel } from '../home/post-list/models/post-list-model';

@Component({
  selector: 'app-subforum-details',
  standalone: true,
  imports: [SubforumPostListComponent],
  templateUrl: './subforum-details.component.html',
  styleUrl: './subforum-details.component.css'
})
export class SubforumDetailsComponent implements OnInit {
  subforumDetails?: SubforumDetailsModel;
  constructor(private readonly activatedRout: ActivatedRoute, private readonly subforumDetailsService: SubforumDetailsService) {

  }
  ngOnInit(): void {
    const name = this.activatedRout.snapshot.paramMap.get('name')!;
    console.log(name);
    this.subforumDetailsService.getSubforumByName(name).subscribe(res => {
      this.subforumDetails = res;
    });
  }
}
