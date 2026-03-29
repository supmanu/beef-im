/**
 * md-to-lexical.ts
 * Converts markdown text to Payload CMS Lexical JSON format.
 *
 * Handles: paragraphs, headings (h1-h6), bold, italic, inline code,
 *          links, code blocks, blockquotes, tables, bullet/ordered lists,
 *          horizontal rules, nested bold+italic.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

// Text format bitmask (matches Lexical constants)
const FMT = { BOLD: 1, ITALIC: 2, STRIKETHROUGH: 4, UNDERLINE: 8, CODE: 16 } as const;

interface TextNode {
    type: 'text';
    text: string;
    format: number;
    detail: 0;
    mode: 'normal';
    style: '';
    version: 1;
}

interface LinkNode {
    type: 'link';
    url: string;
    rel: 'noopener noreferrer';
    target: '_blank';
    children: TextNode[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
}

interface ParagraphNode {
    type: 'paragraph';
    children: (TextNode | LinkNode)[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
    textFormat: 0;
}

interface HeadingNode {
    type: 'heading';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: (TextNode | LinkNode)[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
}

interface QuoteNode {
    type: 'quote';
    children: ParagraphNode[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
}

interface CodeNode {
    type: 'code';
    language: string;
    children: TextNode[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
}

interface ListItemNode {
    type: 'listitem';
    children: (TextNode | LinkNode)[];
    direction: 'ltr';
    format: '';
    indent: 0;
    version: 1;
    value: number;
}

interface ListNode {
    type: 'list';
    listType: 'bullet' | 'number';
    tag: 'ul' | 'ol';
    children: ListItemNode[];
    direction: 'ltr';
    format: '';
    indent: 0;
    start: 1;
    version: 1;
}

interface HorizontalRuleNode {
    type: 'horizontalrule';
    version: 1;
}

interface TableCellNode {
    type: 'tablecell';
    children: ParagraphNode[];
    colSpan: 1;
    rowSpan: 1;
    backgroundColor: null;
    headerState: 0 | 3;
    direction: null;
    format: '';
    indent: 0;
    version: 1;
    width: null;
}

interface TableRowNode {
    type: 'tablerow';
    children: TableCellNode[];
    direction: null;
    format: '';
    indent: 0;
    version: 1;
}

interface TableNode {
    type: 'table';
    children: TableRowNode[];
    direction: null;
    format: '';
    indent: 0;
    version: 1;
}

type LexicalNode =
    | ParagraphNode
    | HeadingNode
    | QuoteNode
    | CodeNode
    | ListNode
    | HorizontalRuleNode
    | TableNode;

export interface LexicalRoot {
    root: {
        children: LexicalNode[];
        direction: 'ltr';
        format: '';
        indent: 0;
        type: 'root';
        version: 1;
    };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function textNode(text: string, format = 0): TextNode {
    return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 };
}

function paragraph(children: (TextNode | LinkNode)[]): ParagraphNode {
    return { type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0 };
}

// ─── Inline Parser ────────────────────────────────────────────────────────────

/**
 * Parses inline markdown formatting into Lexical text/link nodes.
 * Order matters: check longer patterns first (*** before ** before *).
 */
export function parseInline(text: string, baseFormat = 0): (TextNode | LinkNode)[] {
    if (!text) return [];
    const nodes: (TextNode | LinkNode)[] = [];

    // Regex matches (in priority order):
    // 1. Links: [text](url)
    // 2. Bold+italic: ***text***
    // 3. Bold: **text**
    // 4. Italic: *text* or _text_
    // 5. Strikethrough: ~~text~~
    // 6. Inline code: `text`
    const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_|~~(.+?)~~|`([^`]+)`/gs;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
        // Push plain text before this match
        if (match.index > lastIndex) {
            nodes.push(textNode(text.slice(lastIndex, match.index), baseFormat));
        }

        if (match[1] !== undefined) {
            // Link: [text](url)
            nodes.push({
                type: 'link',
                url: match[2],
                rel: 'noopener noreferrer',
                target: '_blank',
                children: [textNode(match[1], baseFormat)],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            });
        } else if (match[3] !== undefined) {
            // Bold + Italic: ***text***
            nodes.push(textNode(match[3], baseFormat | FMT.BOLD | FMT.ITALIC));
        } else if (match[4] !== undefined) {
            // Bold: **text**
            nodes.push(textNode(match[4], baseFormat | FMT.BOLD));
        } else if (match[5] !== undefined) {
            // Italic: *text*
            nodes.push(textNode(match[5], baseFormat | FMT.ITALIC));
        } else if (match[6] !== undefined) {
            // Italic: _text_
            nodes.push(textNode(match[6], baseFormat | FMT.ITALIC));
        } else if (match[7] !== undefined) {
            // Strikethrough: ~~text~~
            nodes.push(textNode(match[7], baseFormat | FMT.STRIKETHROUGH));
        } else if (match[8] !== undefined) {
            // Inline code: `code`
            nodes.push(textNode(match[8], baseFormat | FMT.CODE));
        }

        lastIndex = match.index + match[0].length;
    }

    // Remaining plain text
    if (lastIndex < text.length) {
        nodes.push(textNode(text.slice(lastIndex), baseFormat));
    }

    return nodes.length > 0 ? nodes : [textNode(text, baseFormat)];
}

// ─── Block Parser ─────────────────────────────────────────────────────────────

/**
 * Converts full markdown string to a Lexical root JSON object.
 */
export function markdownToLexical(markdown: string): LexicalRoot {
    const lines = markdown.split('\n');
    const nodes: LexicalNode[] = [];

    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // ── Code block ───────────────────────────────────────────────────────
        if (line.startsWith('```')) {
            const language = line.slice(3).trim() || 'plaintext';
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            const codeText = codeLines.join('\n');
            nodes.push({
                type: 'code',
                language,
                children: [textNode(codeText)],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            });
            continue;
        }

        // ── Horizontal rule ──────────────────────────────────────────────────
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
            nodes.push({ type: 'horizontalrule', version: 1 });
            i++;
            continue;
        }

        // ── Heading ──────────────────────────────────────────────────────────
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
            const tag = `h${level}` as HeadingNode['tag'];
            nodes.push({
                type: 'heading',
                tag,
                children: parseInline(headingMatch[2]) as (TextNode | LinkNode)[],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            });
            i++;
            continue;
        }

        // ── Blockquote ───────────────────────────────────────────────────────
        if (line.startsWith('> ')) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].startsWith('> ')) {
                quoteLines.push(lines[i].slice(2));
                i++;
            }
            const quoteParagraphs = quoteLines
                .join('\n')
                .split(/\n\n/)
                .map(chunk => paragraph(parseInline(chunk.replace(/\n/g, ' '))));
            nodes.push({
                type: 'quote',
                children: quoteParagraphs,
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            });
            continue;
        }

        // ── Table ─────────────────────────────────────────────────────────────
        if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].match(/^\|[\s|:-]+\|$/)) {
            const tableRows: TableRowNode[] = [];
            const headerCells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
            i += 2; // skip header + separator

            // Header row
            tableRows.push({
                type: 'tablerow',
                direction: null,
                format: '',
                indent: 0,
                version: 1,
                children: headerCells.map(cell => ({
                    type: 'tablecell',
                    headerState: 3, // header
                    colSpan: 1,
                    rowSpan: 1,
                    backgroundColor: null,
                    direction: null,
                    format: '',
                    indent: 0,
                    version: 1,
                    width: null,
                    children: [paragraph(parseInline(cell.trim()))],
                })),
            });

            // Data rows
            while (i < lines.length && lines[i].startsWith('|')) {
                const cells = lines[i].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                tableRows.push({
                    type: 'tablerow',
                    direction: null,
                    format: '',
                    indent: 0,
                    version: 1,
                    children: cells.map(cell => ({
                        type: 'tablecell',
                        headerState: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        backgroundColor: null,
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1,
                        width: null,
                        children: [paragraph(parseInline(cell.trim()))],
                    })),
                });
                i++;
            }

            nodes.push({
                type: 'table',
                children: tableRows,
                direction: null,
                format: '',
                indent: 0,
                version: 1,
            });
            continue;
        }

        // ── List (bullet) ─────────────────────────────────────────────────────
        if (/^(\s*[-*+]\s)/.test(line)) {
            const items: ListItemNode[] = [];
            let value = 1;
            while (i < lines.length && /^(\s*[-*+]\s)/.test(lines[i])) {
                const itemText = lines[i].replace(/^\s*[-*+]\s/, '');
                items.push({
                    type: 'listitem',
                    children: parseInline(itemText) as (TextNode | LinkNode)[],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                    value: value++,
                });
                i++;
            }
            nodes.push({
                type: 'list',
                listType: 'bullet',
                tag: 'ul',
                children: items,
                direction: 'ltr',
                format: '',
                indent: 0,
                start: 1,
                version: 1,
            });
            continue;
        }

        // ── List (ordered) ────────────────────────────────────────────────────
        if (/^\d+\.\s/.test(line)) {
            const items: ListItemNode[] = [];
            let value = 1;
            while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
                const itemText = lines[i].replace(/^\d+\.\s/, '');
                items.push({
                    type: 'listitem',
                    children: parseInline(itemText) as (TextNode | LinkNode)[],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                    value: value++,
                });
                i++;
            }
            nodes.push({
                type: 'list',
                listType: 'number',
                tag: 'ol',
                children: items,
                direction: 'ltr',
                format: '',
                indent: 0,
                start: 1,
                version: 1,
            });
            continue;
        }

        // ── Empty line — skip ─────────────────────────────────────────────────
        if (line.trim() === '') {
            i++;
            continue;
        }

        // ── Paragraph (default) ───────────────────────────────────────────────
        // Collect soft-wrapped lines until empty line or block element
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !lines[i].startsWith('#') &&
            !lines[i].startsWith('```') &&
            !lines[i].startsWith('> ') &&
            !lines[i].startsWith('|') &&
            !/^(\s*[-*+]\s)/.test(lines[i]) &&
            !/^\d+\.\s/.test(lines[i]) &&
            !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
        ) {
            paraLines.push(lines[i]);
            i++;
        }

        if (paraLines.length > 0) {
            const text = paraLines.join(' ');
            nodes.push(paragraph(parseInline(text)));
        }
    }

    return {
        root: {
            children: nodes,
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        },
    };
}
