import { ApiResourcesEnum } from '../config/api';
import { IProfile } from '../state/auth/types';
import FetchService from './FetchService';

class UserService {
  public static fetchUser(): Promise<IProfile> {
    return FetchService.get<IProfile>({
      url: ApiResourcesEnum.USER_ME,
    });
  }
}

export default UserService;
