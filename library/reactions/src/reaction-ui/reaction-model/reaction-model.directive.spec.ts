import {ReactionModelDirective} from './reaction-model.directive';
import {TestBed} from '@angular/core/testing';
import {ReactionProvider} from '../reaction-provider/reaction-provider';
import {Component} from '@angular/core';
import {syncFirst} from '../../../tests/observable.helper';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'rg-reaction-model-proxy',
    template: '<button #btn [reaction]="reaction"></button>'
})
class ReactionModelProxyComponent {
    public reaction = {title: 'Create'};
}

describe(ReactionModelDirective.name, () => {
    let reaction: any;
    let reactionProvider: ReactionProvider;

    beforeEach(() => {
        reactionProvider = new ReactionProvider();

        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionModelProxyComponent
            ]
        });

        TestBed.overrideDirective(ReactionModelDirective, {
            set: {
                providers: [{provide: ReactionProvider, useValue: reactionProvider}]
            }
        });

        const fixture = TestBed.createComponent(ReactionModelProxyComponent);
        reaction = fixture.componentInstance.reaction;
        fixture.detectChanges();
    });

    it('should set reaction object on provider', () => {
        expect(syncFirst(reactionProvider.reaction$)).toBe(reaction);
    });
});
