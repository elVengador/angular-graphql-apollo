import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/schemas';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:User[]
  form:FormGroup
  userCreated = ''
  wasCreate = false

  constructor(private userService:JobsService,
              private fb: FormBuilder) { 
    this.createForm()
    this.getUsers()
    console.log(this.form)
              }

  ngOnInit(): void {
  }
  
  createForm(){
    this.form = this.fb.group({
      id:[{value: '', disabled: true}],
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      age:[18,[Validators.required,Validators.pattern(/[0-9]+/)]],
    })
  }
  
  firstNameInvalido(){
    const firstName =  this.form.get('firstName')
    return firstName.invalid && firstName.touched
  }
  lastNameInvalido(){
    const lastName = this.form.get('lastName')
    return lastName.invalid && lastName.touched
  }
  ageInvalido(){
    const age = this.form.get('age')
    return age.invalid && age.touched
  }

  setData(id:String,firstName:string,lastName:string,age:number){
    this.form.controls.id.setValue(id)
    this.form.controls.firstName.setValue(firstName)
    this.form.controls.lastName.setValue(lastName)
    this.form.controls.age.setValue(age)
  }

  createUser(){
    if(this.form.valid){
      const {firstName,lastName,age} = this.form.controls
      this.userService.createUser(firstName.value,lastName.value,age.value)
        .subscribe(resp => {
          console.log('was create',resp)
          this.userCreated = resp.firstName
          this.wasCreate = true
          this.getUsers()
          setTimeout(()=>this.wasCreate=false,1000)
        })
    }
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(resp => {
        this.users = resp
        console.log('was get',this.users)
      })
  }
  updateUser(){
    if(this.form.valid){
      console.log('update componente')
      const {id,firstName,lastName,age} = this.form.controls
      this.userService.updateUsers(id.value,firstName.value,lastName.value,age.value)
        .subscribe(resp => {
          console.log('was update',resp)
          this.getUsers()
        })
    }
  }
  deleteUser(id:string){
    if(id){
      this.userService.deleteUser(id)
        .subscribe(resp => {
          console.log('was delete',resp)
          this.getUsers()
        })
    }
  }

}
