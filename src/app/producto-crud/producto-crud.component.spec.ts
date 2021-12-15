import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCRUDComponent } from './producto-crud.component';

describe('ProductoCRUDComponent', () => {
  let component: ProductoCRUDComponent;
  let fixture: ComponentFixture<ProductoCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
