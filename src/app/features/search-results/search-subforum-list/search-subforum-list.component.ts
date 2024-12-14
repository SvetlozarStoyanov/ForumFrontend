import { Component, Input } from '@angular/core';
import { SubforumSearchModel } from '../../../core/models/subforums/subforum-search-model';
import { SearchSubforumComponent } from "./search-subforum/search-subforum.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-subforum-list',
  standalone: true,
  imports: [SearchSubforumComponent, RouterLink],
  templateUrl: './search-subforum-list.component.html',
  styleUrl: './search-subforum-list.component.css'
})
export class SearchSubforumListComponent {
  @Input() subforums: SubforumSearchModel[] = [];

}
