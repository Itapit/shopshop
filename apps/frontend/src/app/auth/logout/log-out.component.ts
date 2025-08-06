import { Component } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-logout-listener',
    standalone: false,
    templateUrl: './log-out.component.html',
    styleUrls: ['./log-out.component.css'],
})
export class LogoutListenerComponent {
    constructor(private uiStateService: UiStateService) {}

    ngOnInit(){
        console.log("soionfvf")
        this.uiStateService.logoutClicked$.subscribe(
            ()=> {handleLogOut()}
        )
    }

    
}
function handleLogOut(): void {
    console.log("trying log out");
}

