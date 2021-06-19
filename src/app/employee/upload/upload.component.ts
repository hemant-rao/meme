import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  title = 'ocrAngular';
  Results = 'Recognizing...';
  PhotoFilePaths: string[] = [];
  filePathS: string;
  myForm: FormGroup;
  alertBox = false;
  alertbox_handel = false;
  constructor(private service: SharedService, public fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
    });
  }

  // @Input() emp: any;
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
  images = [];
  resp;
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
    });
  }

  addEmployee() {
    if (this.uploaded_image_array.length > 0) {
      console.log(
        'uploaded_image_array length',
        this.uploaded_image_array.length
      );
      for (let i = 0; i < this.uploaded_image_array.length; i++) {
        this.PhotoFileName = this.uploaded_image_array[i].name;
        var val = {
          EmployeeId: i,
          EmployeeName: 'anonymous',
          // EmployeeName:
          //   this.EmployeeName == '' ? this.PhotoFileName : this.EmployeeName,
          // Department: this.Department != '' ? this.Department : 'Facebook',
          Department: 'Facebook',
          // DateOfJoining:
          //   this.DateOfJoining != '' ? this.DateOfJoining : this.formattedDate,
          DateOfJoining: this.formattedDate,
          PhotoFileName: this.PhotoFileName,
        };
        this.service.addEmployee(val).subscribe((res) => {
          this.resp = res;
          if (res === 'Added Successfully!!') {
            this.alertbox_handel = true;
            this.alertBox = true;
            console.log('res---- successfully add', res);
          } else {
            console.log('res---- faild to add', res);
            this.alertbox_handel = true;
            this.alertBox = false;
          }

          // set empty after upload
          if (
            this.resp != undefined &&
            this.uploaded_image_array.length - 1 == i
          ) {
            console.log('when data rest after responce', res);
            this.PhotoFilePaths = [];
            this.EmployeeId = '';
            this.EmployeeName = '';
            this.Department = '';
            this.DateOfJoining = '';
            this.PhotoFileName = 'anonymous.jpg';
            this.PhotoFilePaths = [this.PhotoUrl + '/anonymous.jpg'];
            if (res === 'Added Successfully!!') {
              window.location.reload();
            }
          }
        });
      }
    } else {
      alert('Please fill all required feilds');
    }
  }

  uploadPhoto(event, callback) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    // when first time image select then array length is 0, if second time select then array length grater then 0
    if (this.uploaded_image_array.length <= 1) {
      this.uploaded_image_array = event.target.files;
    } else {
      this.uploaded_image_array = [
        ...this.uploaded_image_array,
        ...event.target.files,
      ];
    }

    for (let i = 0; i < event.target.files.length; i++) {
      var file = event.target.files[i];
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
}
