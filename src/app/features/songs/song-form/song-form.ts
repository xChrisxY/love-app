import { HttpClient } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongService } from '../../../core/services/song';

@Component({
  selector: 'app-song-form',
  imports: [ReactiveFormsModule],
  templateUrl: './song-form.html',
  styleUrl: './song-form.css',
})
export class SongFormComponent {

  private songService = inject(SongService);

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  loading = signal(false);
  error = signal('');

  songCreated = output();

  songForm = this.fb.group({
    url: ['', [Validators.required, Validators.minLength(10)]],
    message: ['', [Validators.required, Validators.minLength(5)]]
  })

  onSubmit() {
    if (this.songForm.invalid) return;

    this.loading.set(true);

    this.songService.create(this.songForm.value as any).subscribe({

      next: () => {
        this.songCreated.emit();
        this.loading.set(false);
      }, 

      error: (err) => {
        this.error.set("Hubo un error al momento de crear la canción.");
        this.loading.set(false);
      }

    })

  }


}
