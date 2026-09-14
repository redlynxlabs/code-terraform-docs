// Renders Obsidian callouts (> [!tip] Title ...) as styled blockquotes.
// The blockquote gets class "callout callout--<type>" and a leading title
// paragraph; styling lives in src/styles/custom.css (self-owned markup,
// no coupling to Starlight internals).
const MARKER = /^\[!([a-z]+)\][+-]?[ \t]*(.*)$/i;

const LABELS = {
  info: 'Info',
  note: 'Note',
  tip: 'Tip',
  hint: 'Tip',
  example: 'Example',
  warning: 'Warning',
  caution: 'Warning',
  danger: 'Danger',
  error: 'Danger',
};

export default function remarkCallouts() {
  function transform(node) {
    if (!node.children) return;
    for (const child of node.children) transform(child);
    if (node.type !== 'blockquote' || node.children.length === 0) return;

    const first = node.children[0];
    if (first.type !== 'paragraph' || !first.children?.length) return;
    const lead = first.children[0];
    if (lead.type !== 'text') return;

    const nl = lead.value.indexOf('\n');
    const firstLine = nl === -1 ? lead.value : lead.value.slice(0, nl);
    const m = MARKER.exec(firstLine);
    if (!m) return;

    const type = m[1].toLowerCase();
    const title = m[2].trim() || LABELS[type] || type;

    // strip the marker line from the paragraph
    if (nl === -1) {
      first.children.shift();
      // a following break node would now lead the paragraph; drop it
      if (first.children[0]?.type === 'break') first.children.shift();
    } else {
      lead.value = lead.value.slice(nl + 1);
    }
    if (first.children.length === 0) node.children.shift();

    node.data = node.data ?? {};
    node.data.hProperties = {
      ...(node.data.hProperties ?? {}),
      className: ['callout', `callout--${type}`],
    };
    node.children.unshift({
      type: 'paragraph',
      data: { hProperties: { className: ['callout-title'] } },
      children: [{ type: 'text', value: title }],
    });
  }

  return (tree) => transform(tree);
}
