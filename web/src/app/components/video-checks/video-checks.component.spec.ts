import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChecksComponent } from './video-checks.component';

describe('VideoChecksComponent', () => {
  let component: VideoChecksComponent;
  let fixture: ComponentFixture<VideoChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
