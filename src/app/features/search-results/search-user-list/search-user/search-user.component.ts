import { Component, Input } from '@angular/core';
import { UserSearchModel } from '../../../../core/models/users/user-search-model';
import { GeneralCountPipe } from '../../../../core/pipes/general-count.pipe';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [GeneralCountPipe],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  @Input() user?: UserSearchModel;
}
