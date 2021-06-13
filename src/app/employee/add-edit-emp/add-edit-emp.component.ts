import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { environment } from '../../../environments/environment';
// import { DatePipe } from '@angular/common';

declare var Tesseract: any;

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  title = 'ocrAngular';
  Results = 'Recognizing...';
  PhotoFilePaths: string[] = [];
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
  // pass static date
  send_date = new Date();
  formattedDate: any;
  DepartmentsList: any = [];
  uploaded_image_array = [];
  ngOnInit(): void {
    // getting today date
    this.send_date.setMonth(this.send_date.getMonth() + 8);
    this.formattedDate = this.send_date.toISOString().slice(0, 10);
    this.loadDepartmentList();
  }
  // read rest when image updaload
  test(PhotoFilePath: string, call) {
    // var text: string;
    // Tesseract.recognize(PhotoFilePath).then(function (result) {
    //   alert(result.text);
    //   text = result.text;
    //   call(text);
    // });
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
    if (this.uploaded_image_array.length > 0) {
      console.log('uploaded_image_array', this.uploaded_image_array);
      for (let i = 0; i < this.uploaded_image_array.length; i++) {
        this.PhotoFileName = this.uploaded_image_array[i].name;
        var val = {
          EmployeeId: this.EmployeeId,
          EmployeeName:
            this.EmployeeName != '' ? this.EmployeeName : 'anonymous',
          Department: this.Department != '' ? this.Department : 'Facebook',
          DateOfJoining:
            this.DateOfJoining != '' ? this.DateOfJoining : this.formattedDate,
          PhotoFileName: this.PhotoFileName,
        };
        this.service.addEmployee(val).subscribe((res) => {
          alert(res.toString());
          // set empty after upload
          if (res != undefined) {
            this.PhotoFilePaths = [];
            this.EmployeeId = '';
            this.EmployeeName = '';
            this.Department = '';
            this.DateOfJoining = '';
            this.PhotoFileName = 'anonymous.jpg';
            this.PhotoFilePaths = [this.PhotoUrl + '/anonymous.jpg'];
          }
        });
      }
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
    console.log(event.target.files);
    this.uploaded_image_array = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      // const element = array[i];
      var file = event.target.files[i];
      var filePath: string;
      const formData: FormData = new FormData();
      formData.append('uploadedFile', file, file.name);
      let path = this.PhotoUrl + file.name;
      this.PhotoFilePaths.push(path);
      console.log("upload image here",this.PhotoFilePaths);

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
}
