import { Injectable } from 'vue-typedi'
import { State, Mutation } from 'vuex-simple';

export interface User {
  _id: string
  email: string
  fullName: string
}

@Injectable()
export default class UserModule {

  @State()
  public currentUser: User = {
    _id: '',
    email: '',
    fullName: ''
  }

  @Mutation()
  public patchUser(dt: Partial<User>): void {
    this.currentUser = {
      ...this.currentUser,
      ...dt
    };
  }
}
