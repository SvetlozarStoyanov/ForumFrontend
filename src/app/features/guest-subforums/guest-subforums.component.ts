import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SubforumGridComponent } from "../../shared/subforum-grid/subforum-grid.component";
import { SubforumOrder } from '../../core/enums/subforum-order';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumsQueryModel } from '../../core/models/subforums/subforums-query-model';
import { SubforumService } from '../../core/services/subforum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-subforums',
  standalone: true,
  imports: [SubforumGridComponent],
  templateUrl: './guest-subforums.component.html',
  styleUrl: './guest-subforums.component.css'
})
export class GuestSubforumsComponent {

  subforumLimitReached: boolean = false;
  subforums: SubforumListModel[] = [];
  sortOption: string = SubforumOrder[0];
  isLoading: boolean = false;
  subforumsQueryModel: SubforumsQueryModel = {
    page: 1,
    order: SubforumOrder.Newest
  }

  constructor(private readonly subforumService: SubforumService, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.loadSubforums();
  }

  onSortChange(value: number) {
    if (this.subforumsQueryModel.order !== value) {
      this.subforums = [];
      this.subforumsQueryModel.order = value;
      this.subforumsQueryModel.page = 1;
      this.subforumLimitReached = false;
      this.loadSubforums();
      this.sortOption = SubforumOrder[value];
    }
  }

  joinSubforum($event: SubforumListModel) {
    this.router.navigate(['/login']);
  }

  loadMoreSubforums() {
    if (!this.subforumLimitReached) {
      this.subforumsQueryModel.page++;
      this.loadSubforums();
    }
  }

  private loadSubforums() {
    this.isLoading = true;
    this.subforumService.getGuestSubforums(this.subforumsQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.subforums.push(...res);
      } else {
        this.subforumLimitReached = true;
      }
      this.isLoading = false;
    });
  }
}
