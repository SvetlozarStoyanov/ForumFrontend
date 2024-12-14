import { Component, Input } from '@angular/core';
import { UserSearchModel } from '../../../../core/models/users/user-search-model';
import { PostCountPipe } from '../../../../core/pipes/postcount.pipe';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [PostCountPipe],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  @Input() user?: UserSearchModel;
}
