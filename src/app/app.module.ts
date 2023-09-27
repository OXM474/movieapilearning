import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetilComponent } from './detil/detil.component';
import { MovielistComponent } from './movielist/movielist.component';
import { SimilarComponent } from './similar/similar.component';
import { MovielistdetialComponent } from './movielistdetial/MovielistdetialComponent';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PopularComponent } from './popular/popular.component';
import { TopratedComponent } from './toprated/toprated.component';
import { ActorsComponent } from './actors/actors.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DetilComponent,
    MovielistComponent,
    SimilarComponent,
    MovielistdetialComponent,
    NowPlayingComponent,
    UpcomingComponent,
    PopularComponent,
    TopratedComponent,
    ActorsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
