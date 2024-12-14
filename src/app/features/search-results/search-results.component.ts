import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostSearchModel } from '../../core/models/posts/post-search-model';
import { PostService } from '../../core/services/post.service';
import { SubforumService } from '../../core/services/subforum.service';
import { UserService } from '../../core/services/user.service';
import { SearchPostListComponent } from "./search-post-list/search-post-list.component";
import { SearchUserListComponent } from "./search-user-list/search-user-list.component";
import { UserSearchModel } from '../../core/models/users/user-search-model';
import { SubforumSearchModel } from '../../core/models/subforums/subforum-search-model';
import { SearchSubforumListComponent } from "./search-subforum-list/search-subforum-list.component";
import { SearchType } from '../../core/enums/search-type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [FormsModule, NgClass, SearchPostListComponent, SearchUserListComponent, SearchSubforumListComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  searchType: SearchType = SearchType.Subforums;
  posts: PostSearchModel[] = [];
  users: UserSearchModel[] = [];
  subforums: SubforumSearchModel[] = [];
  searchTypes = SearchType;
  isLoading: boolean = true;
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly subforumService: SubforumService,
    private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
        const typeOfData = params['type']
        switch (typeOfData) {
          case 'subforums':
            this.searchType = SearchType.Subforums;
            this.searchSubforums();
            break;
          case 'posts':
            this.searchType = SearchType.Posts;
            this.searchPosts();
            break;
          case 'users':
            this.searchType = SearchType.Users;
            this.searchUsers();
            break;
        }
      }
    });
  }

  searchSubforumsClick() {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm, timestamp: new Date().getTime(), type: 'subforums' },
      queryParamsHandling: 'merge',
    });
  }

  searchPostsClick() {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm, timestamp: new Date().getTime(), type: 'posts' },
      queryParamsHandling: 'merge',
    });
  }

  searchUsersClick() {
    this.router.navigate(['/search-results'], {
      queryParams: { searchTerm: this.searchTerm, timestamp: new Date().getTime(), type: 'users' },
      queryParamsHandling: 'merge',
    });
  }

  private searchSubforums() {
    this.subforumService.searchSubforums(this.searchTerm).subscribe(res => {
      this.subforums = res;
      this.isLoading = false;
    });
  }

  private searchPosts() {
    this.postService.searchPosts(this.searchTerm).subscribe(res => {
      this.posts = res;
      this.isLoading = false;
    });
  }

  private searchUsers() {
    this.userService.searchUsers(this.searchTerm).subscribe(res => {
      this.users = res;
      this.isLoading = false;
    });
  }

}
