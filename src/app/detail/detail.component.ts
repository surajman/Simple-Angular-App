import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FakeApiService } from '../fake-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/data.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private userUrl = 'api/users';
  private entityId = null;
  private isAddNew: Boolean = true;
  private usersDetail: User = new User();
  private myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    age: new FormControl('', [Validators.min(18), Validators.max(45)]),
    isActive: new FormControl('', [Validators.required]),
    id: new FormControl('')
  });

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private fakeApiService: FakeApiService) {}

  ngOnInit() {
    this.entityId = +this.route.snapshot.paramMap.get('id');
    if (this.entityId) {
      this.isAddNew = false;
      this.fetchDetails(this.entityId).subscribe((x: User) => {
        this.usersDetail = x;
        this.myForm.setValue({
          name: this.usersDetail.name,
          age: this.usersDetail.age,
          isActive: this.usersDetail.isActive,
          id: this.usersDetail.id,
        });
      });
    } else {
        this.myForm.setValue({
          name: '',
          age: '',
          isActive: true,
          id: '',
        });
    }
  }

  private fetchDetails(id) {
    return this.fakeApiService.getDetails(this.userUrl, id);
  }

  private saveRecord() {
    if (!this.isAddNew) {
      this.fakeApiService.updateRecords(this.userUrl, +this.entityId, this.myForm.value)
        .subscribe();
    } else {
    this.myForm.value.id = Math.ceil(Math.random() * 100);
    this.fakeApiService.createRecord(this.userUrl, this.myForm.value)
      .subscribe(data => {
        this.isAddNew = false;
    });
    }
  }

}
