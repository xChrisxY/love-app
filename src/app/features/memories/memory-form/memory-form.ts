import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemoriesService } from '../../../core/services/memories';

@Component({
  selector: 'app-memory-form',
  imports: [ReactiveFormsModule],
  templateUrl: './memory-form.html',
  styleUrl: './memory-form.css',
})
export class MemoryFormComponent {

  private fb = inject(FormBuilder);
  private memoryService = inject(MemoriesService);

  loading = signal(false);
  error = signal('');
  selectedFile = signal<File | null>(null);

  memoryCreated = output();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    //image: [null, [Validators.required]],
  });

  onFileChange(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0){
      this.selectedFile.set(input.files[0]);
    }
  }

  onSubmit(){

    if (this.form.invalid || !this.selectedFile()) return;
    
    const { title, description } = this.form.value;
    this.loading.set(true);

    this.memoryService.create(title!, description!, this.selectedFile()!).subscribe({

      next: () => {
        this.form.reset();
        this.selectedFile.set(null);
        this.loading.set(false);
        this.memoryCreated.emit();
      },

      error: (err) => {
        console.log("Intenta con una imagen menos pesada.")
        this.error.set("");
        this.loading.set(false);
      }

    });
  }

}
