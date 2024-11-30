import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { homeResolver } from './core/resolvers/home.resolver';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { SubforumDetailsComponent } from './features/subforum-details/subforum-details.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { RegisterComponent } from './features/register/register.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'posts/details/:id', component: PostDetailsComponent },
    { path: 'subforums/details/:name', component: SubforumDetailsComponent },
    { path: '**', component: NotFoundComponent },
];
