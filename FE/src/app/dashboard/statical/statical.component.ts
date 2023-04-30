import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'statical',
  templateUrl: './statical.component.html',
  styleUrls: ['./statical.component.scss']
})

export class StaticalComponent implements OnInit {
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

}
