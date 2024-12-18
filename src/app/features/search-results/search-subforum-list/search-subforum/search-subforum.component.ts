import { Component, Input } from '@angular/core';
import { SubforumSearchModel } from '../../../../core/models/subforums/subforum-search-model';
import { GeneralCountPipe } from '../../../../core/pipes/general-count.pipe';

@Component({
  selector: 'app-search-subforum',
  standalone: true,
  imports: [GeneralCountPipe],
  templateUrl: './search-subforum.component.html',
  styleUrl: './search-subforum.component.css'
})
export class SearchSubforumComponent {
  @Input() subforum?: SubforumSearchModel;

}
