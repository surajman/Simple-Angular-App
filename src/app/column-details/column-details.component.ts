import { Component, OnInit } from '@angular/core';
import { TableColumns } from '../table-columns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column-details',
  templateUrl: './column-details.component.html',
  styleUrls: ['./column-details.component.css']
})
export class ColumnDetailsComponent implements OnInit {

  private name: string;
  private type: string;
  private required: boolean;
  private defaultValue: string | number | boolean;
  private value: string;
  private minLength?: number;
  private maxLength?: number;
  private min?: number;
  private max?: number;

  constructor(private route: ActivatedRoute) {
    const getParamValue = (paramName) => this.route.snapshot.paramMap.get(paramName);
    this.name = getParamValue('name');
    this.type = getParamValue('type');
    this.required = !!getParamValue('required');
    this.defaultValue = getParamValue('defaultValue');
    this.value = getParamValue('value');
    this.minLength = Number(getParamValue('minLength'));
    this.maxLength = Number(getParamValue('maxLength'));
    this.min = Number(getParamValue('min'));
    this.max = Number(getParamValue('max'));
  }

  private getValue(value) {
    return isNaN(value) ? 'Not Specified' : value;
  }

  ngOnInit() {
  }

}
