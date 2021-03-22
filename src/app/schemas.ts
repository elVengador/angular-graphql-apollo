export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  tasks?: Maybe<Array<Maybe<Task>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationCreateTaskArgs = {
  input?: Maybe<TaskInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<UserInput>;
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  _id: Scalars['ID'];
  input?: Maybe<UserInput>;
};

export type Task = {
  __typename?: 'Task';
  _id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  importance: Scalars['Int'];
};

export type TaskInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  importance: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
};
