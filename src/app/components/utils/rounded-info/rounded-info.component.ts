import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-info',
  templateUrl: './rounded-info.component.html',
  styleUrls: ['./rounded-info.component.scss']
})
export class RoundedInfoComponent {

  @Input() text:string='';
  @Input() tooltip:string='';
  @Input() size:number=0;



}
