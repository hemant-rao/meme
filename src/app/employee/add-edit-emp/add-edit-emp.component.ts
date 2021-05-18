import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { environment } from '../../../environments/environment';

declare var Tesseract: any;

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  title = 'ocrAngular';
  Results = 'Recognizing...';
  constructor(private service: SharedService) {}

  @Input() emp: any;
  EmployeeId: string;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  PhotoFileName: string;
  PhotoFilePath: string;
  readonly APIUrl = environment.APIUrl;
  readonly PhotoUrl = environment.PhotoUrl;

  DepartmentsList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  test(PhotoFilePath: string, call) {
    var text: string;
    Tesseract.recognize(PhotoFilePath).then(function (result) {
      alert(result.text);
      text = result.text;
      call(text);
    });
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentsList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    if (
      this.EmployeeName != '' &&
      this.Department != '' &&
      this.DateOfJoining != '' &&
      this.PhotoFileName != 'anonymous.jpg'
    ) {
      var val = {
        EmployeeId: this.EmployeeId,
        EmployeeName: this.EmployeeName,
        Department: this.Department,
        DateOfJoining: this.DateOfJoining,
        PhotoFileName: this.PhotoFileName,
      };

      this.service.addEmployee(val).subscribe((res) => {
        alert(res.toString());
        if (res != undefined) {
          this.EmployeeId = '';
          this.EmployeeName = '';
          this.Department = '';
          this.DateOfJoining = '';
          this.PhotoFileName = 'anonymous.jpg';
          this.PhotoFilePath = this.PhotoUrl+'/anonymous.jpg'
        }
      });
    } else {
      alert('Please fill all required feilds');
    }
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  uploadPhoto(event, callback) {
    var file = event.target.files[0];
    var filePath: string;
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
      filePath = this.PhotoFilePath;
      var th = this;
      if (filePath != undefined) {
        callback(filePath, function (a) {
          th.EmployeeName = a;
        });
      }
    });
  }
}
