import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEvent, EventService, ISession } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
      .container {
          padding: 0 20px;
      }

      .event-image {
          height: 100px;
      }

      a {
          cursor: pointer;
      }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      if (data.event === null) {
        this.router.navigate(['404']);
      } else {
        this.event = data['event'];
        this.addMode = false;
      }
    });
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
