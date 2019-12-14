import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {createClickEvent} from '@reactgular/testing';
import {Observable, of} from 'rxjs';
import {ReactionEvent} from '../../core/reaction-event/reaction-event';
import {Reaction} from '../../core/reaction/reaction';
import {ReactionCoreService} from '../../services/reaction-core/reaction-core.service';
import {ReactionModelDirective} from '../reaction-model/reaction-model.directive';
import {ReactionClickDirective} from './reaction-click.directive';

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
            template: '<button [rgReaction]="reaction" rgReactionClick></button>'
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

    public click = () => this.dispatch(createClickEvent());

    public clicks = () => this._fixture.componentInstance['reaction']['clicks'] as ReactionEvent[];

    public dispatch = (e: Event) => this.button.nativeElement.dispatchEvent(e);
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
