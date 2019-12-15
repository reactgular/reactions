import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-sandbox',
  template: `
    <p>
      sandbox works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
