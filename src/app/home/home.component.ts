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
  constructor(private service: SharedService) {}
  readonly APIUrl = environment.APIUrl;
  readonly PhotoUrl = environment.PhotoUrl;
  defaultImage = "anonymous.jpg";
  imageName: any;
  showCurrentImageURL: any;
  ngOnInit(): void {
    this.refreshEmpList();
    this.defaultImage = this.PhotoUrl+this.defaultImage;
  }
  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    });
  }
  showImage(dataItem: any){
    this.imageName = dataItem.EmployeeName;
    this.showCurrentImageURL = this.PhotoUrl+dataItem.PhotoFileName;
    console.log("dataItem", this.showCurrentImageURL);
    
  }
}
