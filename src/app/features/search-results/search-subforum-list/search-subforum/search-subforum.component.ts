import { Component, Input } from '@angular/core';
import { SubforumSearchModel } from '../../../../core/models/subforums/subforum-search-model';
import { MemberCountPipe } from '../../../../core/pipes/membercount.pipe';

@Component({
  selector: 'app-search-subforum',
  standalone: true,
  imports: [MemberCountPipe],
  templateUrl: './search-subforum.component.html',
  styleUrl: './search-subforum.component.css'
})
export class SearchSubforumComponent {
  @Input() subforum?: SubforumSearchModel;

}
