import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService, IEvent, ISession } from '../events/shared';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
      .nav.navbar-nav {
          font-size: 15px;
      }

      #searchForm {
          margin-right: 100px;
      }

      @media (max-width: 1200px) {
          #searchForm {
              display: none;
          }
      }

      li > a.active {
          color: #F97924;
      }
  `]
})

export class NavbarComponent implements OnInit {
  searchTerm = '';
  foundSessions: ISession[];
  events: IEvent[];

  constructor(private auth: AuthService, private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
