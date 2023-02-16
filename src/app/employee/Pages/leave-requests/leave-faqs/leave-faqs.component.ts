import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-faqs',
  templateUrl: './leave-faqs.component.html',
  styleUrls: ['./leave-faqs.component.scss']
})
export class LeaveFAQSComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
