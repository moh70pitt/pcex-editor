import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyCode, KeyMod, Range, } from 'monaco-editor';
import { SourcesService } from '../sources.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  @Input() language = 'java';

  srcEditorOptions = {
    language: this.language,
    theme: 'vs', // vs-dark
    minimap: { enabled: false },
    lineNumbersMinChars: 2,
    folding: false,
    glyphMargin: true,
    trimAutoWhitespace: false,
  };

  distEditorOptions = {
    ...this.srcEditorOptions,
    lineNumbers: 'off',
    lineNumbersMinChars: 0,
    lineDecorationsWidth: 0,
    glyphMargin: false,
    renderLineHighlight: "none"
  };

  jsonViewerOptions = {
    ...this.srcEditorOptions,
    readOnly: true,
  };

  model: any;

  editor: any;
  selectedLineNum: any;
  selectedLine: any;
  decorations: any[] = [];

  tt: any = {} // ui toggles

  langSet = true;

  constructor(
    private ngZone: NgZone,
    private api: SourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    const params: any = this.route.snapshot.params;
    this.api.read(params.id).subscribe(
      (source: any) => {
        this.srcEditorOptions.language = source.language;
        this.model = source;
        this.updateTitle();
      },
      (error: any) => console.log(error)
    );
  }

  updateTitle() {
    this.title.setTitle('PCEX Authoring: ' + this.model.name);
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
      console.log('onDidChangeCursorPosition');
      this.ngZone.run(() => this.selectLineNum(e.position.lineNumber))
    });
    // this.editor.onDidBlurEditorText((e: any) => {
    //   console.log('onDidBlurEditorWidget');
    //   this.ngZone.run(() => this.ignoreUntouchedLines())
    // });
    // this.editor.onDidFocusEditorText((e: any) => (e: any) => {
    //   console.log('onDidFocusEditorWidget');
    //   this.ngZone.run(() => this.selectLineNum(this.editor.getPosition().lineNumber))
    // });
  }

  selectLineNum(lineNum: number) {
    this.selectedLineNum = lineNum;

    if (!this.model.lines)
      this.model.lines = {};
    // else
    //   this.ignoreUntouchedLines();

    if (this.selectedLineNum) { // init line with defaults
      if (!(this.selectedLineNum in this.model.lines))
        this.model.lines[this.selectedLineNum] = { comments: [{}] }

      this.selectedLine = this.model.lines[this.selectedLineNum];
    } else {
      this.selectedLine = {};
    }

    this.reloadLineMarkers();
  }

  ignoreUntouchedLines() {
    // remove untouched lines
    Object.keys(this.model.lines).forEach((lineNum: any) => {
      const line = this.model.lines[lineNum];
      if (!(line.blank || line.comments.filter(($: any) => $.content).length))
        delete this.model.lines[lineNum];
    })
  }

  reloadLineMarkers() {
    this.editor.deltaDecorations(this.decorations, []);
    this.decorations = [];

    const lineCount = this.model.code?.split('\n').length;
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
    if (!this.model.distractors)
      this.model.distractors = [];

    this.model.distractors.push({ code: '', description: '' });
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

  update() {
    this.ignoreUntouchedLines();
    this.api.update(this.route.snapshot.params.id, this.model).subscribe(
      (source: any) => this.router.navigate(['/dashboard']),
      (error: any) => console.log(error)
    )
  }

  changeLang($event: any) {
    this.srcEditorOptions.language = $event.value;
    this.distEditorOptions.language = $event.value;
    this.jsonViewerOptions.language = $event.value;

    this.langSet = false;
    setTimeout(() => this.langSet = true, 0);
  }
}
