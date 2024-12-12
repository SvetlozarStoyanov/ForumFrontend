import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { MemberCountPipe } from '../../core/pipes/membercount.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subforum',
  standalone: true,
  imports: [MemberCountPipe, RouterLink],
  templateUrl: './subforum.component.html',
  styleUrl: './subforum.component.css'
})
export class SubforumComponent {

  @Input() subforum?: SubforumListModel
  @Output() joinEvent = new EventEmitter<SubforumListModel>();
  @Output() leaveEvent = new EventEmitter<SubforumListModel>();

  joinClick($event: MouseEvent) {
    $event.stopPropagation();
    this.joinEvent.emit(this.subforum);
  }

  leaveClick($event: MouseEvent) {
    $event.stopPropagation();
    this.leaveEvent.emit(this.subforum);
  }
}
