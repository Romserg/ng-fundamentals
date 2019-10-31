import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { VoterService } from './voter.service';
import { AuthService } from '../../user/auth.service';
import { DurationPipe } from '../shared';
import { CollapsibleWellComponent } from '../../common';
import { By } from '@angular/platform-browser';
import { el } from '@angular/platform-browser/testing/src/browser_util';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEL: DebugElement;

  beforeEach(async(() => {
    const mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joe'}
    };
    const mockVoterService = {
      userHasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        // UpvoteComponent,
        DurationPipe,
        // CollapsibleWellComponent
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: VoterService, useValue: mockVoterService}
      ],
      schemas: [
        NO_ERRORS_SCHEMA // Using for shallow test
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEL = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('Initial Display', () => {
    it('should have the correct session title', () => {
      component.sessions = [{
        id: 3,
        name: 'Session 1',
        presenter: 'Joe',
        duration: 1,
        level: 'beginner',
        abstract: 'abstract',
        voters: ['john', 'bob']
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
      expect(debugEL.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });
  });
});
