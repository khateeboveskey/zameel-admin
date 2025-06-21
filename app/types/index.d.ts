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

  interface IUserShowResponse extends IFetchResponse<IUser> { }

  interface IUserIndexResponse extends IPaginatedFetchResponse<IUser> { }

  interface ICollege extends IDeletableModel { }

  interface ISubject extends IDeletableModel { }

  interface IMajor extends IDeletableModel {
    college_id: number
    degree_id: number
    years: number
  }

  interface IGroup extends IModel {
    join_year: number
    division: string
    major_id: number
  }

  interface IApply extends IModel {
    group_id: number
    status_id: number
    note: string
    user_id: number
  }

  interface ITeaching extends IModel {
    user_id: number
    group_id: number
    subject_id: number
  }

  interface IBook extends IModel {
    path: string
    subject_id: number
    group_id: number
    is_practical: boolean
    year: number
    semester: number
    is_arabic?: boolean // Optional, only present on creation
  }

  interface IAssignment extends IModel {
    title: string
    description: string
    due_date: string
    subject_id: number
    group_id: number
  }

  interface IDelivery extends IModel {
    type: string
    content: string
    assignment_id: number
    user_id: number
  }

  // Auth-related types
  interface ILoginRequest {
    email: string
    password: string
    deviceName: string
  }

  interface IRegisterRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
    deviceName: string
  }

  interface IUpdatePasswordRequest {
    password: string
    newPassword: string
    newPassword_confirmation: string
  }

  interface IForgotPasswordRequest {
    email: string
  }

  interface IResetPasswordRequest {
    token: string
    email: string
    password: string
    password_confirmation: string
  }

  type Period = 'يومي' | 'أسبوعي' | 'شهري'

  interface Range {
    start: Date
    end: Date
  }
}

export { }
