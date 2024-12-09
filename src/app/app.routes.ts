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



export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'posts/details/:id', component: PostDetailsComponent },
    { path: 'subforums/create', component: CreateSubforumComponent, canActivate: [authGuard] },
    { path: 'subforums/:name', resolve: { subforumDetailsModel: subforumDetailsResolver }, component: SubforumDetailsComponent },
    { path: 'posts/create', component: CreatePostComponent, canActivate: [authGuard] },
    { path: '**', component: NotFoundComponent },
];
