import { Component, Input } from '@angular/core';
import { SubforumListModel } from '../../core/models/subforums/subforum-list-model';

@Component({
  selector: 'app-subforum',
  standalone: true,
  imports: [],
  templateUrl: './subforum.component.html',
  styleUrl: './subforum.component.css'
})
export class SubforumComponent {
  @Input() subforum?: SubforumListModel
}
