import {ComponentFixture} from '@angular/core/testing';

/**
 * Removes <!-- code --> comments from Html.
 */
export function stripComments(html: string): string {
    return html.replace(/<!--[\s\S]*?-->/g, '');
}

/**
 * Updates a fixture and returns the inner HTML without comments.
 */
export function fixtureHtml<T>(fixture: ComponentFixture<T>): string {
    fixture.detectChanges();
    return removeSpaces(stripComments((<HTMLElement>fixture.debugElement.nativeElement).innerHTML));
}

/**
 * Removes the spaces between HTML nodes, and new lines. If you don't want text to be effected, then wrap in a <span>
 */
export function removeSpaces(html: string): string {
    return html.trim().replace(/[\r\n]/g, '').replace(/>[\s]+</g,'><');
}
