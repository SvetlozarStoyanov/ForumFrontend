import { Component, Input } from '@angular/core';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';
import { SubforumComponent } from "../subforum/subforum.component";

@Component({
  selector: 'app-subforum-grid',
  standalone: true,
  imports: [SubforumComponent],
  templateUrl: './subforum-grid.component.html',
  styleUrl: './subforum-grid.component.css'
})
export class SubforumGridComponent {
  @Input() subforums: SubforumListModel[] = []
}
