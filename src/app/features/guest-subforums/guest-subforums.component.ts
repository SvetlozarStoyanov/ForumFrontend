import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SubforumGridComponent } from "../../shared/subforum-grid/subforum-grid.component";
import { SubforumOrder } from '../../core/enums/subforum-order';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumsQueryModel } from '../../core/models/subforums/subforums-query-model';
import { SubforumService } from '../../core/services/subforum.service';

@Component({
  selector: 'app-guest-subforums',
  standalone: true,
  imports: [SubforumGridComponent],
  templateUrl: './guest-subforums.component.html',
  styleUrl: './guest-subforums.component.css'
})
export class GuestSubforumsComponent {

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
    this.subforumService.getGuestSubforums(this.subforumsQueryModel).subscribe(res => {
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
