/**
 * Removes <!-- code --> comments from Html.
 */
export function stripComments(html: string): string {
    return html.replace(/<!--[\s\S]*?-->/g, '');
}
