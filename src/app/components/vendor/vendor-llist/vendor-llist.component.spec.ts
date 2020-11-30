import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLlistComponent } from './vendor-llist.component';

describe('VendorLlistComponent', () => {
  let component: VendorLlistComponent;
  let fixture: ComponentFixture<VendorLlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorLlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorLlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
