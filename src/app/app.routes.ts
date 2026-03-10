import { Routes } from '@angular/router';
import { NotesList } from './features/notes/notes-list/notes-list';
import { SongsListComponent } from './features/songs/songs-list/songs-list';
import { MemoriesListComponent } from './features/memories/memories-list/memories-list';
import { ListsList } from './features/lists/lists-list/lists-list';
import { Home } from './shared/components/home/home';
import { LoginComponent } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: Home, canActivate: [authGuard]},
  {path: 'notes', component: NotesList, canActivate: [authGuard]},
  {path: 'songs', component: SongsListComponent, canActivate: [authGuard]},
  {path: 'memories', component: MemoriesListComponent, canActivate: [authGuard]},
  {path: 'lists', component: ListsList, canActivate: [authGuard]},
  {path: '**', redirectTo: ''},
];
