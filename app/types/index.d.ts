declare global {
  interface IFetchResponse<T> {
    data: T;
  }

  interface IFetchResponseLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
  }

  interface IFetchResponseMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  }

  interface IPaginatedFetchResponse<T> {
    data: T[];
    links: IFetchResponseLinks,
    meta: IFetchResponseMeta
  }

  interface IUser {
    name: string;
    email: string;
    role_id: number;
    id: number;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  }

  interface IUserShowResponse extends IFetchResponse<IUser> { }

  interface IUserIndexResponse extends IPaginatedFetchResponse<IUser> { }
}

export { }