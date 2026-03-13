import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListForm } from './custom-list-form';

describe('CustomListForm', () => {
  let component: CustomListForm;
  let fixture: ComponentFixture<CustomListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomListForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomListForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
