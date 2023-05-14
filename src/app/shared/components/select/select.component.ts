import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Input() data: any[] = [];
  @Input() title = 'Выберите действие';
  @Output() dataEvent = new EventEmitter<any>();
  @Input() width = '500px';

  constructor(
  ) {
  }

  changeElement(value: any) {
    this.dataEvent.emit(value);
  }

}
