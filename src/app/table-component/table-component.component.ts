import { Component, OnInit, Input, Output } from '@angular/core';
import { TableColumns } from '../../app/table-columns';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  @Input() columns: Array<TableColumns>;
  @Input() rows: Array<any> = [];
  @Output() selectAllEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRow: EventEmitter<any> = new EventEmitter<any>();

  private allChecked: boolean;
  private sortValue = 'name_asc';
  public selectedRows: Array<number> = [];
  private selectAllClicked() {
    if (this.rows && this.rows.length) {
      if (this.selectedRows.length) {
        this.rows.forEach(x => {
          x.isChecked = false;
        });
        this.selectedRows = [];
      } else {
        this.rows.forEach(x => {
          x.isChecked = true;
        });
        this.selectedRows = this.rows.map(x => x.id);
      }
      this.selectAllEvent.emit(this.selectedRows);
    }
  }
  private selectRowClicked(row) {
    if (this.selectedRows.includes(row.id)) {
      this.selectedRows = this.selectedRows.filter(x => x !== row.id);
      row.isChecked = false;
    } else {
      this.selectedRows.push(row.id);
      row.isChecked = true;
    }
    this.selectRow.emit(row);
  }
  private isAnyRowChecked() {
    return this.rows && this.rows.some(x => x.isChecked);
  }
  private areAllRowsChecked() {
    return this.rows && this.rows.every(x => x.isChecked);
  }
  private onColumnClick(row, column) {
    if (!!column && column.click.emit) {
      column.click.emit(row);
    }
  }
  public clearSelectedRows() {
    this.selectedRows = [];
  }

  constructor() { }

  ngOnInit() {}

  private sortColumn(column: string, sortOrder: number) {
    this.rows.sort((a, b) => {
      if (a[column].toString() < b[column].toString()) {
        return -1 * sortOrder;
      }
      if (a[column].toString() > b[column].toString()) {
        return 1 * sortOrder;
      }
      return 0;
    });
    this.sortValue = `${column}_${sortOrder === 1 ? 'asc' : 'desc'}`;
  }

}
