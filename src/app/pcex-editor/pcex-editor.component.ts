import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { KeyCode, KeyMod, Range } from 'monaco-editor';
import { EditorComponent } from 'ngx-monaco-editor';

@Component({
  selector: 'app-pcex-editor',
  templateUrl: './pcex-editor.component.html',
  styleUrls: ['./pcex-editor.component.less']
})
export class PcexEditorComponent implements OnInit {

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
    distractors: [] as any[],
    lines: {} as any
  }

  editor: any;
  selectedLine: any;

  get line() {
    if (this.selectedLine) {
      if (!(this.selectedLine in this.model.lines))
        this.model.lines[this.selectedLine] = {}

      return this.model.lines[this.selectedLine];
    }
    return {};
  }

  decorations: any[] = [];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
  }

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
        this.selectedLine = e.position.lineNumber;

        this.reloadDecorations();
      })
    });
  }

  reloadDecorations() {
    this.editor.deltaDecorations(this.decorations, []);
    this.decorations = [];

    const nums = Object.keys(this.model.lines).filter((num: any) => {
      const line = this.model.lines[num];
      return line.comment || line.blank;
    });

    this.decorations = this.editor.deltaDecorations(
      [], nums.map((num: any) => ({
        range: new Range(parseInt(num), 1, parseInt(num), 1),
        options: {
          className: 'marked-line--background',
          glyphMarginClassName: 'marked-line--glyph'
        }
      })));
  }

  addDistractor() {
    this.model.distractors.push({ code: 'code here ...', description: '' });
  }

  delDistractor(distractor: any) {
    const i = this.model.distractors.indexOf(distractor);
    if (i > -1) this.model.distractors.splice(i, 1);
  }
}
