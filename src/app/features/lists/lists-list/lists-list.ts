import { Component, inject, signal } from '@angular/core';
import { CustomList, ListsService } from '../../../core/services/lists';
import { CustomListForm } from "../custom-list-form/custom-list-form";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lists-list',
  imports: [CustomListForm, RouterLink],
  templateUrl: './lists-list.html',
  styleUrl: './lists-list.css',
})
export class ListsListComponent {

  private customListService = inject(ListsService);

  lists = signal<CustomList[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(){
    this.loadLists();
  }

  loadLists(){

    this.loading.set(true);

    this.customListService.getAll().subscribe({

      next: (response) => {
        this.lists.set(response.data);
        this.loading.set(false)
      },
      error: (err) => {
        this.error.set('Error al cargas las listas.');
        this.loading.set(false);
      }

    });

  }
  
}
