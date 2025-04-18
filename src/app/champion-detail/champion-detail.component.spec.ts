import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionDetailComponent } from './champion-detail.component';

describe('ChampionDetailComponent', () => {
  let component: ChampionDetailComponent;
  let fixture: ComponentFixture<ChampionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
