import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $: any;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularForm';
  myForm: any;  myFormEdit: any;editIndex=0;
  type:string="";

  closeResult = '';
  UserData=[{
    id:1,
    firstName:"Deo",
    lastName:"John",
    userName:"Djohn",
    password:'',
    age:29,
    salary:19445
  },
  {
    id:2,
    firstName:"Meo",
    lastName:"Ron",
    userName:"Mron",
    password:'',
    age:39,
    salary:354436
  }
  
  ]

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id:2,
      userName: '',
      password: '',
      firstName:'',
      lastName:'',
      age:null,
      salary:null
    });

    this.myFormEdit = this.formBuilder.group({
      id:null,
      userName: '',
      password: '',
      firstName:'',
      lastName:'',
      age:null,
      salary:null
    });
    this.UserData = this.getData() ? this.getData() : this.UserData;
  }

  getData(){
    return JSON.parse(localStorage.getItem('data'));
  }

  setData(data){
    localStorage.setItem('data',JSON.stringify(data));
  }

  delete(index){
    this.UserData.splice(index,1);
    this.setData(this.UserData);
  }
 
  edit(){
    this.UserData[this.editIndex] = this.myFormEdit.value;
    this.setData(this.UserData);
  }


  addUser(){
    this.myForm.value.id= this.UserData[this.UserData.length-1].id +1;
    this.UserData.push(this.myForm.value);
    this.setData(this.UserData);
  }

  openADDForm(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEDITForm(content,i){
    this.myFormEdit.controls['id'].setValue(this.UserData[this.editIndex].id);
    this.myFormEdit.controls['userName'].setValue(this.UserData[this.editIndex].userName);
    this.myFormEdit.controls['password'].setValue(this.UserData[this.editIndex].password);
    this.myFormEdit.controls['firstName'].setValue(this.UserData[this.editIndex].firstName);
    this.myFormEdit.controls['lastName'].setValue(this.UserData[this.editIndex].lastName);
    this.myFormEdit.controls['age'].setValue(this.UserData[this.editIndex].age);
    this.myFormEdit.controls['salary'].setValue(this.UserData[this.editIndex].salary);
    this.editIndex = i;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
