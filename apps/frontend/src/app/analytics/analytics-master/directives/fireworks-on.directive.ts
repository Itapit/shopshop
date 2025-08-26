import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FireworksService } from '../services/fireworks.service';

@Directive({
    selector: '[appFireworksOn]',
    standalone: true,
})
export class FireworksOnDirective implements OnChanges {
    @Input('appFireworksOn') trigger: any;

    private lastFiredFor: any = undefined;

    constructor(private fx: FireworksService) {}

    async ngOnChanges(changes: SimpleChanges) {
        if (!('trigger' in changes)) return;
        const current = this.trigger;

        if (current && current !== this.lastFiredFor) {
            this.lastFiredFor = current;
            await this.fx.celebrate();
        }
    }
}
