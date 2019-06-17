import {TestBed} from '@angular/core/testing';
import {ReactionCoreService} from './reaction-core.service';

describe(ReactionCoreService.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({

        });
    });

    it('should be created', () => {
        const service: ReactionCoreService = TestBed.get(ReactionCoreService);
        expect(service).toBeTruthy();
    });
});
