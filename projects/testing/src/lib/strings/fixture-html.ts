import {ComponentFixture} from '@angular/core/testing';
import {removeSpaces} from './remove-spaces';
import {stripComments} from './strip-comments';

/**
 * Updates a fixture and returns the inner HTML without comments.
 */
export function fixtureHtml<T>(fixture: ComponentFixture<T>): string {
    fixture.detectChanges();
    return removeSpaces(stripComments((<HTMLElement>fixture.debugElement.nativeElement).innerHTML));
}
