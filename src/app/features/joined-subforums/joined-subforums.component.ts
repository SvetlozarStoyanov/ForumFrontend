import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SubforumOrder } from '../../core/enums/subforum-order';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumsQueryModel } from '../../core/models/subforums/subforums-query-model';
import { SubforumService } from '../../core/services/subforum.service';
import { SubforumGridComponent } from "../../shared/subforum-grid/subforum-grid.component";

@Component({
  selector: 'app-joined-subforums',
  standalone: true,
  imports: [SubforumGridComponent],
  templateUrl: './joined-subforums.component.html',
  styleUrl: './joined-subforums.component.css'
})
export class JoinedSubforumsComponent {
  subforumLimitReached: boolean = false;
  subforums: SubforumListModel[] = [];
  sortOption: string = SubforumOrder[0];
  isLoading: boolean = false;
  subforumsQueryModel: SubforumsQueryModel = {
    page: 1,
    order: SubforumOrder.Newest
  }

  constructor(private readonly subforumService: SubforumService) {

  }

  ngOnInit(): void {
    this.loadSubforums();
  }

  leaveSubforum(subforum: SubforumListModel) {
    this.subforumService.leaveSubforum(subforum.id).subscribe(res => {
      this.subforums = this.subforums.filter(x => x.id !== subforum.id);
    });
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

  loadMoreSubforums() {
    if (!this.subforumLimitReached) {
      this.subforumsQueryModel.page++;
      this.loadSubforums();
    }
  }

  private loadSubforums() {
    this.isLoading = true;
    this.subforumService.getJoinedSubforums(this.subforumsQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.subforums.push(...res);
      } else {
        this.subforumLimitReached = true;
      }
      this.isLoading = false;
    });
  }
}
