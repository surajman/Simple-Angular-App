import { EventEmitter } from '@angular/core';

export interface TableColumns {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | number | boolean;
    value: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    click?: EventEmitter<any>;
}
