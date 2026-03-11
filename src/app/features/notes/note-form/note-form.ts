import { Component, inject, output, signal } from '@angular/core';
import { NoteService } from '../../../core/services/note';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteFormComponent {

  private noteService = inject(NoteService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  loading = signal(false);
  error = signal('');

  noteCreated = output();
  
  noteForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {
    
    if (this.noteForm.invalid) return;
    this.loading.set(true);

    this.noteService.create(this.noteForm.value.content as any).subscribe({

      next: () => {
        this.noteCreated.emit();
        this.loading.set(false);
      },

      error: (err) => {

        this.error.set("Hubo un error al momento de crear la nota.");
        this.loading.set(false);
      }

    });
  }

}
