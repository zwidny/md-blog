import mermaid from 'mermaid'

const mermaidConf = {
  startOnLoad: true,
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true
  }
};

mermaid.initialize(mermaidConf);

export {mermaid}