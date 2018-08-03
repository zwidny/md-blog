const marked = require('marked');
const highlight = require('highlight.js');
import 'highlight.js/styles/solarized-dark.css';

const MERMAID = ['mermaid', 'flow', 'seq', 'gantt'];
const renderer = new marked.Renderer();
renderer._code = renderer.code;
renderer.code = (code, language) => {
  console.log(`marked.renderer: language: ${language}`);
  if (MERMAID.includes(language)
    || code.match(/^graph/)
    || code.match(/^sequenceDiagram/)
    || code.match(/^gantt/)
    || code.match(/^classDiagram/)
    || code.match(/^gitGraph/)
  ) {
    return `<div class="mermaid">${code}</div>`;
  }
  else {
    return renderer._code(code, language)
  }
};

const _highlight = (code) => {
  return highlight.highlightAuto(code).value;
};

marked.setOptions({
  renderer: renderer,
  highlight: _highlight,
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  tables: true,
  xhtml: false

});

export {marked}