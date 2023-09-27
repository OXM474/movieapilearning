import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetilComponent } from './detil/detil.component';
import { AuthGuard } from './auth.guard';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PopularComponent } from './popular/popular.component';
import { TopratedComponent } from './toprated/toprated.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ActorsComponent } from './actors/actors.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'detail/:movieid',
    component: DetilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nowplaying',
    component: NowPlayingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'popular',
    component: PopularComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'toprated',
    component: TopratedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upcoming',
    component: UpcomingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'actor/:actorid',
    component: ActorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:searchword',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
