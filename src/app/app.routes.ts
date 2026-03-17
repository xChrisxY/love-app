import { Routes } from '@angular/router';
import { NotesList } from './features/notes/notes-list/notes-list';
import { SongsListComponent } from './features/songs/songs-list/songs-list';
import { MemoriesListComponent } from './features/memories/memories-list/memories-list';
import { ListsListComponent } from './features/lists/lists-list/lists-list';
import { Home } from './shared/components/home/home';
import { LoginComponent } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ListDetailComponent } from './features/lists/list-detail/list-detail';

export const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'notes', component: NotesList },
      { path: 'songs', component: SongsListComponent },
      { path: 'memories', component: MemoriesListComponent },
      { path: 'lists', component: ListsListComponent },
      { path: 'lists/:id', component: ListDetailComponent }
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
