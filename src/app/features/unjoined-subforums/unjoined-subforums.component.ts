import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumsQueryModel } from '../../core/models/subforums/subforums-query-model';
import { SubforumOrder } from '../../core/enums/subforum-order';
import { SubforumGridComponent } from "../../shared/subforum-grid/subforum-grid.component";
import { SubforumService } from '../../core/services/subforum.service';

@Component({
  selector: 'app-unjoined-subforums',
  standalone: true,
  imports: [SubforumGridComponent],
  templateUrl: './unjoined-subforums.component.html',
  styleUrl: './unjoined-subforums.component.css'
})
export class UnjoinedSubforumsComponent implements OnInit {

  private observer!: IntersectionObserver;
  private subforumLimitReached: boolean = false;
  subforums: SubforumListModel[] = [];
  @ViewChildren('subforum') subforumElements!: QueryList<ElementRef>;
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

  ngAfterViewInit() {
    this.setupObserver();
  }

  onSortChange(value: number) {
    if (this.subforumsQueryModel.order !== value) {
      this.subforums = [];
      this.subforumsQueryModel.order = value;
      this.subforumsQueryModel.page = 1;
      this.loadSubforums();
      this.sortOption = SubforumOrder[value];
    }
  }

  private loadSubforums() {
    this.isLoading = true;
    this.subforumService.getUnjoinedSubforums(this.subforumsQueryModel).subscribe(res => {
      if (res.length > 0) {
        this.subforums.push(...res);
      } else {
        this.subforumLimitReached = true;
      }
      this.isLoading = false;
    });
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries.find((entry) => entry.isIntersecting);
      if (lastEntry && !this.isLoading && !this.subforumLimitReached) {
        this.subforumsQueryModel.page++;
        this.loadSubforums();
      }
    });
    this.subforumElements.changes.subscribe(() => {
      if (this.subforumElements.last) {
        this.observer.observe(this.subforumElements.last.nativeElement);
      }
    });
  }
}
