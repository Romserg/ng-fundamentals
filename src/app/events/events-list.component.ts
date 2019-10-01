import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, IEvent } from './shared';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <app-event-thumbnail [event]="event"></app-event-thumbnail>
        </div>
      </div>
    </div>
  `
})

export class EventsListComponent implements OnInit {
  events: IEvent[];

  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }
}
