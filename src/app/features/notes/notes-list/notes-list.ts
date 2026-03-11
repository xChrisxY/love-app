import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Note, NoteService } from '../../../core/services/note';
import { NoteFormComponent } from "../note-form/note-form";

@Component({
  selector: 'app-notes-list',
  imports: [NoteFormComponent],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css'
})
export class NotesList {

  private noteService = inject(NoteService);

  notes = signal<Note[]>([]); // señal reactiva
  loading = signal(false)
  error = signal('');

  ngOnInit(){
    this.loadNotes();
  }

  loadNotes(){

    this.loading.set(true);

    this.noteService.getAll().subscribe({

      next: (response) => {
        this.notes.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las notas');
        this.loading.set(false);
      }

    })

  }
}
