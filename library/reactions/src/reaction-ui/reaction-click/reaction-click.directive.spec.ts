import {ReactionClickDirective} from './reaction-click.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionEvent} from '../../reaction-engine/reaction-event/reaction-event';
import {Reaction} from '../../reaction-engine/reaction/reaction';
import {Observable, of} from 'rxjs';
import {createClickEvent} from '../../../tests/dom-events.helper';
import {By} from '@angular/platform-browser';
import {ReactionCoreService} from '../../reaction-services/reaction-core/reaction-core.service';

class ClickFixture {
    public button: DebugElement;

    public spyBroadcast: jasmine.Spy;

    private _fixture: ComponentFixture<any>;

    public constructor(type: string, disabled$: Observable<boolean>) {
        class ReactionObject {
            public clicks: ReactionEvent[] = [];

            public disabled = disabled$;

            @Reaction(type)
            public click(event: ReactionEvent) {
                this.clicks.push(event);
            }
        }

        // noinspection AngularMissingOrInvalidDeclarationInModule
        @Component({
            selector: 'rg-reaction-proxy',
            template: '<button [reaction]="reaction" rgReactionClick></button>'
        })
        class ReactionProxyComponent {
            public reaction = new ReactionObject();
        }

        TestBed.configureTestingModule({
            declarations: [
                ReactionModelDirective,
                ReactionClickDirective,
                ReactionProxyComponent
            ]
        });

        this._fixture = TestBed.createComponent(ReactionProxyComponent);
        this._fixture.detectChanges();
        this.button = this._fixture.debugElement.query(By.directive(ReactionClickDirective));
        this.spyBroadcast = spyOn(TestBed.get(ReactionCoreService), 'broadcast').and.callThrough();
    }

    public clicks = () => this._fixture.componentInstance['reaction']['clicks'] as ReactionEvent[];

    public dispatch = (e: Event) => this.button.nativeElement.dispatchEvent(e);

    public click = () => this.dispatch(createClickEvent());
}

describe(ReactionClickDirective.name, () => {

    it('should broadcast click events', () => {
        const fixture = new ClickFixture('click', of(false));
        fixture.click();
        expect(fixture.spyBroadcast).toHaveBeenCalled();
    });

    it('should not broadcast clicks when disabled', () => {
        const fixture = new ClickFixture('click', of(true));
        fixture.click();
        expect(fixture.spyBroadcast).not.toHaveBeenCalled();
    });

    it('should throttle mouse move events', () => {

    });

    it('should ignore other events', () => {

    });
    // let component: ReactionModelProxyComponent;
});
