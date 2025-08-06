import { Component, OnInit } from '@angular/core';
import { SessionService } from './auth/services/Session.service';

@Component({
    selector: 'app-root',
    standalone: false,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private sessionService: SessionService) {}
    protected title = 'frontend';

    ngOnInit(): void {
        this.sessionService.setSessionFromProfile();
    }
}
