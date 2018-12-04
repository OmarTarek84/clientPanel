import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsItemsComponent } from './clients-items.component';

describe('ClientsItemsComponent', () => {
  let component: ClientsItemsComponent;
  let fixture: ComponentFixture<ClientsItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
