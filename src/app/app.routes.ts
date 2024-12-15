import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { SubforumDetailsComponent } from './features/subforum-details/subforum-details.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { RegisterComponent } from './features/user-management/register/register.component';
import { LoginComponent } from './features/user-management/login/login.component';
import { CreatePostComponent } from './features/create-post/create-post.component';
import { CreateSubforumComponent } from './features/create-subforum/create-subforum.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { subforumDetailsResolver } from './core/resolvers/subforum-details.resolver';
import { UnjoinedSubforumsComponent } from './features/unjoined-subforums/unjoined-subforums.component';
import { JoinedSubforumsComponent } from './features/joined-subforums/joined-subforums.component';
import { GuestSubforumsComponent } from './features/guest-subforums/guest-subforums.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { userDetailsResolver } from './core/resolvers/user-details.resolver';
import { SearchResultsComponent } from './features/search-results/search-results.component';



export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'posts/details/:id', component: PostDetailsComponent },
    { path: 'subforums/create', component: CreateSubforumComponent, canActivate: [authGuard] },
    { path: 'subforums/guest', component: GuestSubforumsComponent, canActivate: [guestGuard] },
    { path: 'subforums/unjoined', component: UnjoinedSubforumsComponent, canActivate: [authGuard] },
    { path: 'subforums/joined', component: JoinedSubforumsComponent, canActivate: [authGuard] },
    { path: 'subforums/:name', resolve: { subforumDetailsModel: subforumDetailsResolver }, component: SubforumDetailsComponent },
    { path: 'posts/create', component: CreatePostComponent, canActivate: [authGuard] },
    { path: 'search-results', component: SearchResultsComponent },
    { path: 'users/:username', resolve: { userDetailsModel: userDetailsResolver }, component: UserDetailsComponent },
    { path: '**', component: NotFoundComponent },
];
