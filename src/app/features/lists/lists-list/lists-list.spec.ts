import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsList } from './lists-list';

describe('ListsList', () => {
  let component: ListsList;
  let fixture: ComponentFixture<ListsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsList],
    }).compileComponents();

    fixture = TestBed.createComponent(ListsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
