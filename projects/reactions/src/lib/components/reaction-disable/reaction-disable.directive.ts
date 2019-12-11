import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Destroyable} from '@reactgular/destroyable';
import {takeUntil} from 'rxjs/operators';
import {ReactionProvider} from '../../services/reaction-provider/reaction-provider';

@Directive({
    selector: '[rgReactionDisable],button[reaction]'
})
export class ReactionDisableDirective extends Destroyable implements OnInit {
    public constructor(private readonly _reactionProvider: ReactionProvider,
                       private readonly _el: ElementRef<HTMLElement>,
                       private readonly _renderer: Renderer2) {
        super();
    }

    public ngOnInit(): void {
        this._reactionProvider.disabled$.pipe(
            takeUntil(this._destroyed$)
        ).subscribe(disabled => {
            const tagName = this._el.nativeElement.tagName;
            if (disabled) {
                if (tagName === 'BUTTON') {
                    this._renderer.setAttribute(this._el.nativeElement, 'disabled', '');
                }
                this._renderer.addClass(this._el.nativeElement, 'disabled');
            } else {
                if (tagName === 'BUTTON') {
                    this._renderer.removeAttribute(this._el.nativeElement, 'disabled');
                }
                this._renderer.removeClass(this._el.nativeElement, 'disabled');
            }
        });
    }
}
