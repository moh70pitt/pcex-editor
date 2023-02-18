import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { KeyCode, KeyMod, Range, } from 'monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  @Input() language = 'java';

  options = {
    language: this.language,
    theme: 'vs', // vs-dark
    minimap: { enabled: false },
    lineNumbersMinChars: 2,
    folding: false,
    glyphMargin: true,
    trimAutoWhitespace: false,
  };

  options_l1 = {
    ...this.options,
    lineNumbers: 'off',
    lineNumbersMinChars: 0,
    lineDecorationsWidth: 0,
    glyphMargin: false,
    renderLineHighlight: "none"
  };

  options_vw = {
    ...this.options,
    readOnly: true,
  };

  tt: any = {} // ui toggles

  model = {
    language: this.language,
    code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello PCEX Editor!!!");\n  }\n}`,
    name: 'Printing Table of Medal Winner Counts with Row Totals',
    description: 'Construct a program that prints a table of medal winner counts with row totals for a given array of countries and their medals won at the skating competitions at the Winter Olympic.',
    programInput: '',
    distractors: [] as any[],
    lines: {} as any
  }

  editor: any;
  selectedLineNum: any;
  selectedLine: any;

  decorations: any[] = [];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void { }

  setupDistractorEditor(monaco: any) {
    // --------------->>
    // https://github.com/vikyd/vue-monaco-singleline/blob/1de219c2f1ddd89f6b473e43716bbb3dfb662542/src/monaco-singleline.vue#L150
    monaco.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_F, () => { })
    monaco.addCommand(KeyCode.Enter, () => {
      monaco.trigger('', 'acceptSelectedSuggestion');
    })
    monaco.onDidPaste((e: any) => {
      if (e.endLineNumber <= 1) return;
      let content = '';
      const model = monaco.getModel();
      const lc = model.getLineCount();
      for (let i = 0; i < lc; i += 1)
        content += model.getLineContent(i + 1);
      model.setValue(content);
      monaco.setPosition({ column: content.length + 1, lineNumber: 1 });
    });
    monaco.addCommand(KeyCode.F1, () => { });
    // <<---------------
  }

  setupSourceEditor(monaco: any) {
    this.editor = monaco;

    this.editor.onDidChangeCursorPosition((e: any) => {
      this.ngZone.run(() => {
        this.selectedLineNum = e.position.lineNumber;

        if (this.selectedLineNum) {
          // init line with defaults
          if (!(this.selectedLineNum in this.model.lines)) {
            this.model.lines[this.selectedLineNum] = { comments: [{}] }
          }

          this.selectedLine = this.model.lines[this.selectedLineNum];
        } else {
          this.selectedLine = {};
        }

        this.reloadLineMarkers();
      })
    });
  }

  reloadLineMarkers() {
    this.editor.deltaDecorations(this.decorations, []);
    this.decorations = [];

    const lineCount = this.model.code.split('\n').length;
    const lineNums = Object.keys(this.model.lines).filter((lineNum: any) => {
      const line = this.model.lines[lineNum];
      return parseInt(lineNum) <= lineCount
        && (line.blank || line.comments.filter(($: any) => $.content).length);
    });

    this.decorations = this.editor.deltaDecorations(
      [], lineNums.map((lineNum: any) => ({
        range: new Range(parseInt(lineNum), 1, parseInt(lineNum), 1000),
        options: {
          isWholeLine: false,
          className: 'marked-line--background',
          glyphMarginClassName: 'marked-line--glyph',
          stickiness: 1,
        }
      })));
  }

  addDistractor() {
    this.model.distractors.push({ code: 'code here ...', description: '' });
  }

  removeDistractor(distractor: any) {
    const i = this.model.distractors.indexOf(distractor);
    if (i > -1) this.model.distractors.splice(i, 1);
  }

  addLineComment() {
    this.selectedLine.comments.push({});
  }

  removeLineComment(comment: any) {
    this.selectedLine.comments.splice(this.selectedLine.comments.indexOf(comment), 1);
  }

  onCodeUpdate() {
  }
}
