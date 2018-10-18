import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumns } from './table-columns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableComponentComponent } from './table-component/table-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wizni Project Demo';

  constructor() { }

  ngOnInit() {
  }
}
