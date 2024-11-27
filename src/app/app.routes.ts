import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { homeResolver } from './core/resolvers/home.resolver';
import { PostDetailsComponent } from './features/post-details/post-details.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'posts/details/:id', component: PostDetailsComponent }
];
