import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumns } from '../table-columns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableComponentComponent } from '../table-component/table-component.component';
import { FakeApiService } from '../fake-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private textValue = '';
  private onRowClick: EventEmitter<any> = new EventEmitter<any>();
  private tableColumns: Array<TableColumns> = [
    {
      name: 'Name',
      type: 'STRING',
      required: false,
      defaultValue: 'Test Name',
      value: 'name',
      click: this.onRowClick,
    },
    {
      name: 'Age',
      type: 'NUMBER',
      required: false,
      defaultValue: 18,
      value: 'age',
    },
    {
      name: 'Active',
      type: 'BOOLEAN',
      required: false,
      defaultValue: true,
      value: 'isActive',
    },
  ];
  private users: Array<any> = [];
  private filteredData: Array<any>;
  private userUrl = 'api/users';
  private openConfirmation = false;
  private selectedRowCount = 0;
  @ViewChild('tableComponent')
  private tableComponent: TableComponentComponent;

  constructor(private http: HttpClient, private router: Router, private apiService: FakeApiService) { }

  ngOnInit() {
    this.getHeroes().subscribe((data) => {
      this.filteredData = this.users = data.sort((a, b) => {
        if (a['name'].toString() < b['name'].toString()) {
          return -1;
        }
        if (a['name'].toString() > b['name'].toString()) {
          return 1;
        }
        return 0;
      });
    });
    this.onRowClick.subscribe(rowData => this.handleRowClick(rowData));
  }
  private handleRowClick(rowData) {
    this.router.navigate([`detailPage/${rowData.id}`]);
  }
  private selectAllClick(ids) {
    if (this.tableComponent) {
      this.selectedRowCount = this.tableComponent.selectedRows.length;
    }
  }
  private searchRecords() {
    this.filteredData = this.users.filter(x => {
      return x.name.toLowerCase().includes(this.textValue)
      || x.age === this.textValue || x.isActive === this.textValue;
    });
    if (this.tableComponent && this.selectedRowCount &&
      this.tableComponent.selectedRows.some(x => !this.filteredData.find(y => y.id === x))) {
      this.selectedRowCount = 0;
    }
  }
  private getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(this.userUrl);
  }
  private selectRowClicked(row) {
    if (this.tableComponent) {
      this.selectedRowCount = this.tableComponent.selectedRows.length;
    }
  }
  private deleteRecords() {
    this.tableComponent.selectedRows.forEach(x => {
      this.apiService.deleteRecords(this.userUrl, x).subscribe(success => {
        this.getHeroes().subscribe((data) => {
          this.filteredData = this.users = data;
          this.tableComponent.clearSelectedRows();
          this.selectedRowCount = this.tableComponent.selectedRows.length;
        });
        this.openConfirmation = false;
      });
    });
  }
  private createNewUser() {
    this.router.navigate(['detailPage/0']);
  }
}
