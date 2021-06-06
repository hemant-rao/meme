import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  EmployeeList: any = [];
  constructor(private service: SharedService) { }
  readonly APIUrl = environment.APIUrl;
  readonly PhotoUrl = environment.PhotoUrl;
  defaultImage = 'anonymous.jpg';
  imageName: any;
  id: any;
  showCurrentImageURL: any;
  dataItem;
  left = true;
  right = true;
  ngOnInit(): void {
    this.refreshEmpList();
    this.defaultImage = this.PhotoUrl + this.defaultImage;
  }
  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    });
  }
  showImage(dataItem: any) {
    this.dataItem = dataItem;
    this.imageName = dataItem.EmployeeName;
    this.id = dataItem.id;
    this.showCurrentImageURL = this.PhotoUrl + dataItem.PhotoFileName;
    var index = this.EmployeeList.findIndex(
      (x) => x.EmployeeId === this.dataItem.EmployeeId
    );
    var indexVal = index + 1;
    if (index !== -1 && indexVal > -1 && indexVal !== 0 && index > 0) {
      if (this.EmployeeList.length > indexVal) {
        // enable left right button if index lessthen employee length and grater then -1 and 0
        this.left = false;
        this.right = false;
      } else {
        // enable left button if index grater then length
        this.left = false;
        this.right = true;
        // alert('this is last value');
      }
    } else {
      // enable right button if index less then length
      this.left = true;
      this.right = false;
      // alert('this is first value');
    }
  }
  prevNext(value: any) {
    var index = this.EmployeeList.findIndex(
      (x: { EmployeeId: any; }) => x.EmployeeId === this.dataItem.EmployeeId
    );
    var indexVal = index + value;
    if (index != -1 && indexVal > -1) {
      if (this.EmployeeList.length > indexVal) {
        this.showImage(this.EmployeeList[indexVal]);
      } else {
        this.left = false;
        this.right = true;
        // alert('this is last value');
      }
    } else {
      // alert('this is first value');
    }
  }
}
