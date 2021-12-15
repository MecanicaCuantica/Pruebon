import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCRUDComponent } from './usuarios-crud.component';

describe('UsuariosCRUDComponent', () => {
  let component: UsuariosCRUDComponent;
  let fixture: ComponentFixture<UsuariosCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
