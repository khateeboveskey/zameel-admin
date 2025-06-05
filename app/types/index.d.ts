declare global {
  interface IFetchResponse<T> {
    data: T
  }

  interface IFetchResponseLinks {
    first: string
    last: string
    prev: string
    next: string
  }

  interface IFetchResponseMeta {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }

  interface IPaginatedFetchResponse<T> {
    data: T[]
    links: IFetchResponseLinks
    meta: IFetchResponseMeta
  }

  interface IModel {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  interface IUser extends IModel {
    email: string
    role_id: number
    email_verified_at: string
  }

  interface IDeletableModel extends IModel {
    deleted_at: string
  }

  interface IUserShowResponse extends IFetchResponse<IUser> {}

  interface IUserIndexResponse extends IPaginatedFetchResponse<IUser> {}

  interface ICollege extends IDeletableModel {}

  interface IMajor extends IDeletableModel {
    college_id: number
    degree_id: number
    years: number
  }
}

export {}
