import {TestBed} from '@angular/core/testing';
import {ReactionKeyboardService} from './reaction-keyboard.service';

describe(ReactionKeyboardService.name, () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ReactionKeyboardService = TestBed.get(ReactionKeyboardService);
        expect(service).toBeTruthy();
    });
});
