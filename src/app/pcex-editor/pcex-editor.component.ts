import { Component } from '@angular/core';

@Component({
  selector: 'app-pcex-editor',
  templateUrl: './pcex-editor.component.html',
  styleUrls: ['./pcex-editor.component.less']
})
export class PcexEditorComponent {
  options = {
    theme: 'vs-dark',
    language: 'javascript'
  };

  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
}
