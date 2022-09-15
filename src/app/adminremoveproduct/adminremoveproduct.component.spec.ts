import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminremoveproductComponent } from './adminremoveproduct.component';

describe('AdminremoveproductComponent', () => {
  let component: AdminremoveproductComponent;
  let fixture: ComponentFixture<AdminremoveproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminremoveproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminremoveproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
