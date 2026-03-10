import { Component, inject, signal } from '@angular/core';
import { Memories, MemoriesService } from '../../../core/services/memories';

@Component({
  selector: 'app-memories-list',
  imports: [],
  templateUrl: './memories-list.html',
  styleUrl: './memories-list.css',
})
export class MemoriesListComponent {
  
  private memoryService = inject(MemoriesService);
  memories = signal<Memories[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(){
    this.loadMemories();
  }

  loadMemories(){

    this.loading.set(true);

    this.memoryService.getAll().subscribe({

      next: (response) => {
        this.memories.set(response.data);
        this.loading.set(false);
      }, 
      error: (err) => {
        this.error.set('Error al cargar las memorias.');
        this.loading.set(false);
      }

    });

  }
}
