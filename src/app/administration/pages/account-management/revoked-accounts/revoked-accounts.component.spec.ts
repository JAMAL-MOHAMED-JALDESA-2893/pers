import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokedAccountsComponent } from './revoked-accounts.component';

describe('RevokedAccountsComponent', () => {
  let component: RevokedAccountsComponent;
  let fixture: ComponentFixture<RevokedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevokedAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
