import { Profile } from './../../../entities/profile';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  @Input() public profile: Profile;
  constructor() { }


  ngOnInit() {
  }

}
