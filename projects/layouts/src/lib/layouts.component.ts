import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-layouts',
  template: `
    <p>
      layouts works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
