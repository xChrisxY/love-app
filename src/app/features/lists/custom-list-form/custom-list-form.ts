import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListsService } from '../../../core/services/lists';

@Component({
  selector: 'app-custom-list-form',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-list-form.html',
  styleUrl: './custom-list-form.css',
})
export class CustomListForm {

  private fb = inject(FormBuilder);
  private listService = inject(ListsService);

  loading = signal(false);
  error = signal('');

  listCreated = output();

  typeOptions = [
    {"id": 1, "name": "MOVIES"},
    {"id": 2, "name": "PLACES"},
    {"id": 3, "name": "FOOD"},
    {"id": 4, "name": "RESTAURANTS"},
    {"id": 5, "name": "OTHER"},
  ]

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    type: ['', Validators.required]
  });

  onSubmit(){

    if (this.form.invalid) return;

    this.loading.set(true);
    this.listService.create(this.form.value as any).subscribe({

      next: (response) => {
        this.listCreated.emit();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Hubo un error al momento de crear la lista.');
        this.loading.set(false);
      }

    });
  }

}
