import { Component, Input } from '@angular/core';
import { UserSearchModel } from '../../../core/models/users/user-search-model';
import { SearchUserComponent } from "./search-user/search-user.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-user-list',
  standalone: true,
  imports: [SearchUserComponent, RouterLink],
  templateUrl: './search-user-list.component.html',
  styleUrl: './search-user-list.component.css'
})
export class SearchUserListComponent {
  @Input() users: UserSearchModel[] = [];
}
