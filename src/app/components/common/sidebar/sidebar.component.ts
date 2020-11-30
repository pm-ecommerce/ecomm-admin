import {Component, Input, OnInit} from '@angular/core';
import {ExtJsService} from "../../../services/ext-js.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() title: string;

  constructor(public app: ExtJsService) {

  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.app.init();
  }
}
