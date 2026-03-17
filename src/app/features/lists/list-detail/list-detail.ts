import { Component, inject, signal } from '@angular/core';
import { ListItem, ListsService } from '../../../core/services/lists';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './list-detail.html',
  styleUrl: './list-detail.css',
})
export class ListDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listService = inject(ListsService);
  private fb = inject(FormBuilder);

  listId = signal('');
  items = signal<ListItem[]>([]);
  loading = signal(false);
  error = signal('');
  submitting = signal(false);

  itemForm = this.fb.group({
    content : ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (!id) {
      this.router.navigate(['/lists']);
      return;
    }

    this.listId.set(id);
    this.loadItems();   
  }

  loadItems() {

    this.loading.set(true);
    this.listService.getItems(this.listId()).subscribe({
      next: (response) => {
        this.items.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los Items');
        this.loading.set(false);
      }

    });

  }

  onSubmit(){
    if (this.itemForm.invalid) return;
    this.submitting.set(true);

    this.listService.createItem(this.listId(), this.itemForm.value.content!).subscribe({

      next: () => {
        this.itemForm.reset();
        this.submitting.set(true);
        this.loadItems();
      }, 
      error: () => {
        this.error.set('Error al crear al Item');
        this.submitting.set(false);
      }

    });
  }

  goBack(){
    this.router.navigate(['/lists']);
  }

}
