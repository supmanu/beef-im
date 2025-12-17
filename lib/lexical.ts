export function extractTextFromLexical(root: any): string {
    if (!root) return '';
    if (typeof root === 'string') return root;
    if (Array.isArray(root)) return root.map(extractTextFromLexical).join(' ');

    let text = '';
    if (root.text) text += root.text;

    if (root.children && Array.isArray(root.children)) {
        text += ' ' + root.children.map(extractTextFromLexical).join(' ');
    } else if (root.content && Array.isArray(root.content)) {
        // Handle potential edge case where root has content instead of children, though unlikely in standard format
        text += ' ' + root.content.map(extractTextFromLexical).join(' ');
    }

    return text.trim();
}
