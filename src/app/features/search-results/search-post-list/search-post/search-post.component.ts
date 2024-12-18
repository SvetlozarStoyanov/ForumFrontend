import { Component, Input } from '@angular/core';
import { PostSearchModel } from '../../../../core/models/posts/post-search-model';
import { RouterLink } from '@angular/router';
import { DateDisplayPipe } from '../../../../core/pipes/datedisplay.pipe';

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [RouterLink, DateDisplayPipe],
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.css'
})
export class SearchPostComponent {
  @Input() post?: PostSearchModel;
}
