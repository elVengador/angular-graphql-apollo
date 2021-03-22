import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

const createUsers = gql`
mutation createUser($firstName: String!,$lastName: String!,$age: Int!){
  createUser(input:{
    firstName:$firstName
    lastName:$lastName
    age:$age
  }){
    firstName
  }
}
`

const getUsers = gql`
query users {
  users{
    _id
    firstName
    lastName
    age
  }
}
`

const updateUser = gql`
mutation updateUser($_id:ID!, $firstName: String!,$lastName: String!,$age: Int!){
  updateUser(_id:$_id, input:{
    firstName:$firstName
    lastName:$lastName
    age:$age
  }){
    firstName
  }
}
`

const deleteUser = gql`
mutation deleteUser($_id:ID!){
  deleteUser(_id: $_id) {
   firstName 
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private apollo: Apollo) { 
    
  }

  createUser(firstName:string,lastName:string,age:number){
    console.log('create service')
    return this.apollo.mutate<any>({
      mutation:createUsers,
      variables:{firstName,lastName,age}
    }).pipe(
      map(resp => resp.data)
    )
  }

  getUsers(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: getUsers,
    }).valueChanges.pipe(
      map(res => res.data.users)
    )
  }

  updateUsers(_id:string,firstName:string,lastName:string,age:number): Observable<any> {
    console.log('update service')
    return this.apollo.mutate<any>({
      mutation:updateUser,
      variables:{_id, firstName, lastName, age}
    }).pipe(
      map(resp => resp.data)
    )
  }

  deleteUser(_id:string){
    console.log(_id)
    return this.apollo.mutate<any>({
      mutation:deleteUser,
      variables:{_id}
    }).pipe(
      map(resp => resp.data)
    )
  }
}
