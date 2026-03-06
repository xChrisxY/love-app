import { Routes } from '@angular/router';
import { NotesList } from './features/notes/notes-list/notes-list';
import { SongsList } from './features/songs/songs-list/songs-list';
import { MemoriesList } from './features/memories/memories-list/memories-list';
import { ListsList } from './features/lists/lists-list/lists-list';
import { Home } from './shared/components/home/home';

export const routes: Routes = [
  { path: '', component: Home},
  {path: 'notes', component: NotesList},
  {path: 'songs', component: SongsList},
  {path: 'memories', component: MemoriesList},
  {path: 'lists', component: ListsList},
  {path: '**', redirectTo: ''},
];
