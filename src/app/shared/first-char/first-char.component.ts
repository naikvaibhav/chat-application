import { Component, OnChanges, Input, EventEmitter, Output, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit,OnChanges {
  @Input() name:string;
  @Input() userBg:string;
  @Input() userColor:string;

  public firstChar:string;
  private _name:string ='';

  constructor() { }

  ngOnInit():void {
    this._name = this.name;
    this.firstChar = this._name[0];
  }
//inform the component of first letter change in chat window
    ngOnChanges(changes:SimpleChanges){
      let name = changes.name;
      this._name = name.currentValue;
      this.firstChar = this._name[0];
    }
}
