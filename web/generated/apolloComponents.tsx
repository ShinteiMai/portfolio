import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  url: Scalars['String'];
  filename: Scalars['String'];
};

export type Stack = {
  __typename?: 'Stack';
  id: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  links: Array<Link>;
  stacks: Array<Stack>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['String'];
  projectId: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type LinkInput = {
  type: Scalars['String'];
  url: Scalars['String'];
};

export type StackInput = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  fetchImage?: Maybe<Image>;
  fetchImages?: Maybe<Array<Image>>;
  getLinks: Array<Link>;
  getProjects?: Maybe<Array<Project>>;
  getProject?: Maybe<Project>;
  getStacks: Array<Stack>;
  me?: Maybe<User>;
};


export type QueryFetchImageArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createImage?: Maybe<Image>;
  deleteImage?: Maybe<Image>;
  updateImage?: Maybe<Image>;
  createLink: Link;
  deleteLink: Scalars['Boolean'];
  updateLink: Scalars['Boolean'];
  createProject?: Maybe<Project>;
  deleteProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  createStack: Stack;
  deleteStack: Scalars['Boolean'];
  updateStack?: Maybe<Scalars['Boolean']>;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
};


export type MutationCreateImageArgs = {
  image: Scalars['Upload'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['String'];
};


export type MutationUpdateImageArgs = {
  image: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationCreateLinkArgs = {
  url: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['String'];
};


export type MutationUpdateLinkArgs = {
  url: Scalars['String'];
  type: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  links: Array<LinkInput>;
  stacks: Array<Scalars['String']>;
  thumbnailUrl: Scalars['String'];
  year: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  links: Array<LinkInput>;
  stacks: Array<Scalars['String']>;
  year: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateStackArgs = {
  url: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteStackArgs = {
  id: Scalars['String'];
};


export type MutationUpdateStackArgs = {
  url: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type CreateImageMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type CreateImageMutation = (
  { __typename?: 'Mutation' }
  & { createImage?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url' | 'filename'>
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  year: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  stacks: Array<Scalars['String']>;
  links: Array<LinkInput>;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'year' | 'thumbnailUrl'>
    & { stacks: Array<(
      { __typename?: 'Stack' }
      & Pick<Stack, 'id' | 'name' | 'url'>
    )>, links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'type' | 'url'>
    )> }
  )> }
);

export type CreateStackMutationVariables = Exact<{
  name: Scalars['String'];
  url: Scalars['String'];
}>;


export type CreateStackMutation = (
  { __typename?: 'Mutation' }
  & { createStack: (
    { __typename?: 'Stack' }
    & Pick<Stack, 'id' | 'name' | 'url'>
  ) }
);

export type DeleteImageMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteImageMutation = (
  { __typename?: 'Mutation' }
  & { deleteImage?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url' | 'filename'>
  )> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateImageMutationVariables = Exact<{
  id: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type UpdateImageMutation = (
  { __typename?: 'Mutation' }
  & { updateImage?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url' | 'filename'>
  )> }
);

export type FetchImageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchImageQuery = (
  { __typename?: 'Query' }
  & { fetchImage?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url' | 'filename'>
  )> }
);

export type FetchImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchImagesQuery = (
  { __typename?: 'Query' }
  & { fetchImages?: Maybe<Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url' | 'filename'>
  )>> }
);

export type GetStacksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStacksQuery = (
  { __typename?: 'Query' }
  & { getStacks: Array<(
    { __typename?: 'Stack' }
    & Pick<Stack, 'id' | 'name' | 'url'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const CreateImageDocument = gql`
    mutation createImage($image: Upload!) {
  createImage(image: $image) {
    id
    url
    filename
  }
}
    `;
export type CreateImageMutationFn = ApolloReactCommon.MutationFunction<CreateImageMutation, CreateImageMutationVariables>;
export type CreateImageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateImageMutation, CreateImageMutationVariables>, 'mutation'>;

    export const CreateImageComponent = (props: CreateImageComponentProps) => (
      <ApolloReactComponents.Mutation<CreateImageMutation, CreateImageMutationVariables> mutation={CreateImageDocument} {...props} />
    );
    
export type CreateImageProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateImageMutation, CreateImageMutationVariables>
    } & TChildProps;
export function withCreateImage<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateImageMutation,
  CreateImageMutationVariables,
  CreateImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateImageMutation, CreateImageMutationVariables, CreateImageProps<TChildProps, TDataName>>(CreateImageDocument, {
      alias: 'createImage',
      ...operationOptions
    });
};
export type CreateImageMutationResult = ApolloReactCommon.MutationResult<CreateImageMutation>;
export type CreateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateImageMutation, CreateImageMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($title: String!, $year: String!, $thumbnailUrl: String!, $stacks: [String!]!, $links: [LinkInput!]!) {
  createProject(title: $title, year: $year, thumbnailUrl: $thumbnailUrl, stacks: $stacks, links: $links) {
    id
    title
    year
    thumbnailUrl
    stacks {
      id
      name
      url
    }
    links {
      id
      type
      url
    }
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;
export type CreateProjectComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateProjectMutation, CreateProjectMutationVariables>, 'mutation'>;

    export const CreateProjectComponent = (props: CreateProjectComponentProps) => (
      <ApolloReactComponents.Mutation<CreateProjectMutation, CreateProjectMutationVariables> mutation={CreateProjectDocument} {...props} />
    );
    
export type CreateProjectProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>
    } & TChildProps;
export function withCreateProject<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  CreateProjectProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateProjectMutation, CreateProjectMutationVariables, CreateProjectProps<TChildProps, TDataName>>(CreateProjectDocument, {
      alias: 'createProject',
      ...operationOptions
    });
};
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateStackDocument = gql`
    mutation createStack($name: String!, $url: String!) {
  createStack(name: $name, url: $url) {
    id
    name
    url
  }
}
    `;
export type CreateStackMutationFn = ApolloReactCommon.MutationFunction<CreateStackMutation, CreateStackMutationVariables>;
export type CreateStackComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateStackMutation, CreateStackMutationVariables>, 'mutation'>;

    export const CreateStackComponent = (props: CreateStackComponentProps) => (
      <ApolloReactComponents.Mutation<CreateStackMutation, CreateStackMutationVariables> mutation={CreateStackDocument} {...props} />
    );
    
export type CreateStackProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateStackMutation, CreateStackMutationVariables>
    } & TChildProps;
export function withCreateStack<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateStackMutation,
  CreateStackMutationVariables,
  CreateStackProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateStackMutation, CreateStackMutationVariables, CreateStackProps<TChildProps, TDataName>>(CreateStackDocument, {
      alias: 'createStack',
      ...operationOptions
    });
};
export type CreateStackMutationResult = ApolloReactCommon.MutationResult<CreateStackMutation>;
export type CreateStackMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStackMutation, CreateStackMutationVariables>;
export const DeleteImageDocument = gql`
    mutation deleteImage($id: String!) {
  deleteImage(id: $id) {
    id
    url
    filename
  }
}
    `;
export type DeleteImageMutationFn = ApolloReactCommon.MutationFunction<DeleteImageMutation, DeleteImageMutationVariables>;
export type DeleteImageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteImageMutation, DeleteImageMutationVariables>, 'mutation'>;

    export const DeleteImageComponent = (props: DeleteImageComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteImageMutation, DeleteImageMutationVariables> mutation={DeleteImageDocument} {...props} />
    );
    
export type DeleteImageProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteImageMutation, DeleteImageMutationVariables>
    } & TChildProps;
export function withDeleteImage<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteImageMutation,
  DeleteImageMutationVariables,
  DeleteImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteImageMutation, DeleteImageMutationVariables, DeleteImageProps<TChildProps, TDataName>>(DeleteImageDocument, {
      alias: 'deleteImage',
      ...operationOptions
    });
};
export type DeleteImageMutationResult = ApolloReactCommon.MutationResult<DeleteImageMutation>;
export type DeleteImageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteImageMutation, DeleteImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(data: {username: $username, password: $password}) {
    id
    username
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>
    } & TChildProps;
export function withLogout<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps, TDataName>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateImageDocument = gql`
    mutation updateImage($id: String!, $image: Upload!) {
  updateImage(id: $id, image: $image) {
    id
    url
    filename
  }
}
    `;
export type UpdateImageMutationFn = ApolloReactCommon.MutationFunction<UpdateImageMutation, UpdateImageMutationVariables>;
export type UpdateImageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateImageMutation, UpdateImageMutationVariables>, 'mutation'>;

    export const UpdateImageComponent = (props: UpdateImageComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateImageMutation, UpdateImageMutationVariables> mutation={UpdateImageDocument} {...props} />
    );
    
export type UpdateImageProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateImageMutation, UpdateImageMutationVariables>
    } & TChildProps;
export function withUpdateImage<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateImageMutation,
  UpdateImageMutationVariables,
  UpdateImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateImageMutation, UpdateImageMutationVariables, UpdateImageProps<TChildProps, TDataName>>(UpdateImageDocument, {
      alias: 'updateImage',
      ...operationOptions
    });
};
export type UpdateImageMutationResult = ApolloReactCommon.MutationResult<UpdateImageMutation>;
export type UpdateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateImageMutation, UpdateImageMutationVariables>;
export const FetchImageDocument = gql`
    query fetchImage($id: String!) {
  fetchImage(id: $id) {
    id
    url
    filename
  }
}
    `;
export type FetchImageComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FetchImageQuery, FetchImageQueryVariables>, 'query'> & ({ variables: FetchImageQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FetchImageComponent = (props: FetchImageComponentProps) => (
      <ApolloReactComponents.Query<FetchImageQuery, FetchImageQueryVariables> query={FetchImageDocument} {...props} />
    );
    
export type FetchImageProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchImageQuery, FetchImageQueryVariables>
    } & TChildProps;
export function withFetchImage<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchImageQuery,
  FetchImageQueryVariables,
  FetchImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchImageQuery, FetchImageQueryVariables, FetchImageProps<TChildProps, TDataName>>(FetchImageDocument, {
      alias: 'fetchImage',
      ...operationOptions
    });
};
export type FetchImageQueryResult = ApolloReactCommon.QueryResult<FetchImageQuery, FetchImageQueryVariables>;
export const FetchImagesDocument = gql`
    query fetchImages {
  fetchImages {
    id
    url
    filename
  }
}
    `;
export type FetchImagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FetchImagesQuery, FetchImagesQueryVariables>, 'query'>;

    export const FetchImagesComponent = (props: FetchImagesComponentProps) => (
      <ApolloReactComponents.Query<FetchImagesQuery, FetchImagesQueryVariables> query={FetchImagesDocument} {...props} />
    );
    
export type FetchImagesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FetchImagesQuery, FetchImagesQueryVariables>
    } & TChildProps;
export function withFetchImages<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FetchImagesQuery,
  FetchImagesQueryVariables,
  FetchImagesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FetchImagesQuery, FetchImagesQueryVariables, FetchImagesProps<TChildProps, TDataName>>(FetchImagesDocument, {
      alias: 'fetchImages',
      ...operationOptions
    });
};
export type FetchImagesQueryResult = ApolloReactCommon.QueryResult<FetchImagesQuery, FetchImagesQueryVariables>;
export const GetStacksDocument = gql`
    query getStacks {
  getStacks {
    id
    name
    url
  }
}
    `;
export type GetStacksComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetStacksQuery, GetStacksQueryVariables>, 'query'>;

    export const GetStacksComponent = (props: GetStacksComponentProps) => (
      <ApolloReactComponents.Query<GetStacksQuery, GetStacksQueryVariables> query={GetStacksDocument} {...props} />
    );
    
export type GetStacksProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetStacksQuery, GetStacksQueryVariables>
    } & TChildProps;
export function withGetStacks<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetStacksQuery,
  GetStacksQueryVariables,
  GetStacksProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetStacksQuery, GetStacksQueryVariables, GetStacksProps<TChildProps, TDataName>>(GetStacksDocument, {
      alias: 'getStacks',
      ...operationOptions
    });
};
export type GetStacksQueryResult = ApolloReactCommon.QueryResult<GetStacksQuery, GetStacksQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;