import { ApiResourcesEnum } from '../config/api';
import FetchService from './FetchService';
import {
  IUser,
} from '../no-state/users/models';

class UserService {
  public static fetchUser(): Promise<IUser> {
    return FetchService.get<IUser>({
      url: ApiResourcesEnum.USER_ME,
    });
  }
}

export default UserService;