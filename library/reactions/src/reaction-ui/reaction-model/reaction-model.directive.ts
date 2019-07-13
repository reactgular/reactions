import {Directive, Input} from '@angular/core';
import {ReactionProvider} from '../reaction-provider/reaction-provider';

/**
 * Dependency provider for other components to gain access to the reaction object.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[reaction]',
    providers: [ReactionProvider],
    exportAs: 'rgReaction'
})
export class ReactionModelDirective {
    /**
     * Constructor
     */
    public constructor(private readonly reactionProvider: ReactionProvider) {

    }

    /**
     * Sets the reaction object. We use unknown to reduce warnings in templates.
     */
    @Input('reaction')
    public set reaction(reaction: unknown) {
        console.log(reaction);
        this.reactionProvider.set(reaction);
    }
}
