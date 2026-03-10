import { Component, inject, signal } from '@angular/core';
import { Song, SongService } from '../../../core/services/song';

@Component({
  selector: 'app-songs-list',
  imports: [],
  templateUrl: './songs-list.html',
  styleUrl: './songs-list.css',
})
export class SongsListComponent {

  private songService = inject(SongService);

  songs = signal<Song[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(){
    this.loadSongs();
  }

  loadSongs(){

    this.loading.set(true);

    this.songService.getAll().subscribe({

      next: (response) => {
        this.songs.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las canciones');
        this.loading.set(false);
      }

    })

  }

}
