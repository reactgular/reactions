/**
 * Removes the spaces between HTML nodes, and new lines. If you don't want text to be effected, then wrap in a <span>
 */
export function removeSpaces(html: string): string {
    return html.trim().replace(/[\r\n]/g, '').replace(/>[\s]+</g, '><');
}
