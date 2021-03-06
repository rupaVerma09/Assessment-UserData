import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  @ViewChild('ccNumber') ccNumberField: ElementRef;
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
    salary:19445,
    creditCard:6643545612343455
  },
  {
    id:2,
    firstName:"Meo",
    lastName:"Ron",
    userName:"Mron",
    password:'',
    age:39,
    salary:354436,
    creditCard:2345345634562345
  }
  
  ]

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id:2,
      userName: '',
      password: '',
      firstName:'',
      lastName:'',
      age:null,
      salary:null,
      creditCard:['', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]]
    });

    this.myFormEdit = this.formBuilder.group({
      id:null,
      userName: '',
      password: '',
      firstName:'',
      lastName:'',
      age:null,
      salary:null,
      creditCard: ['', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]]
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
    this.myForm = this.formBuilder.group({
      id:2,
      userName: '',
      password: '',
      firstName:'',
      lastName:'',
      age:null,
      salary:null,
      creditCard:['', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]]
    });
  }

  openADDForm(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEDITForm(content,i){
    this.editIndex = i;
    this.myFormEdit.controls['id'].setValue(this.UserData[this.editIndex].id);
    this.myFormEdit.controls['userName'].setValue(this.UserData[this.editIndex].userName);
    this.myFormEdit.controls['password'].setValue(this.UserData[this.editIndex].password);
    this.myFormEdit.controls['firstName'].setValue(this.UserData[this.editIndex].firstName);
    this.myFormEdit.controls['lastName'].setValue(this.UserData[this.editIndex].lastName);
    this.myFormEdit.controls['age'].setValue(this.UserData[this.editIndex].age);
    this.myFormEdit.controls['salary'].setValue(this.UserData[this.editIndex].salary);
    this.myFormEdit.controls['creditCard'].setValue(this.UserData[this.editIndex].creditCard);
    this.cd.detectChanges();
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
