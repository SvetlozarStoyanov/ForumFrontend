import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumComponent } from "../subforum/subforum.component";


@Component({
  selector: 'app-subforum-grid',
  standalone: true,
  imports: [SubforumComponent,],
  templateUrl: './subforum-grid.component.html',
  styleUrl: './subforum-grid.component.css'
})
export class SubforumGridComponent implements AfterViewInit {
  @Input() subforums: SubforumListModel[] = [];
  @Input() isLoading: boolean = false;
  @Input() subforumLimitReached: boolean = false;
  @Output() loadMoreSubforumsEvent = new EventEmitter();
  @Output() joinSubforumEvent = new EventEmitter<SubforumListModel>();
  @Output() leaveSubforumEvent = new EventEmitter<SubforumListModel>();

  private observer!: IntersectionObserver;
  @ViewChildren('subforum') subforumElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.setupObserver();
    console.log(this.subforumElements.length);
  }

  joinSubforumClick(subforumListModel: SubforumListModel) {
    this.joinSubforumEvent.emit(subforumListModel);
  }

  leaveSubforumClick(subforumListModel: SubforumListModel) {
    this.leaveSubforumEvent.emit(subforumListModel);
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries.find((entry) => entry.isIntersecting);
      if (lastEntry && !this.isLoading && !this.subforumLimitReached) {
        this.loadMoreSubforumsEvent.emit();
      }
    });
    this.subforumElements.changes.subscribe(() => {
      if (this.subforumElements.last) {
        this.observer.observe(this.subforumElements.last.nativeElement);
      }
    });
  }
}
