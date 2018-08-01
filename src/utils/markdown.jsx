const myMarked = require('marked');
const highlight = require('highlight.js');
import 'highlight.js/styles/solarized-dark.css';

myMarked.setOptions({
  renderer: new myMarked.Renderer(),
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  tables: true,
  xhtml: false

});

export {myMarked as marked}