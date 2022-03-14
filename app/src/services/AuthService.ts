import { ApiResourcesEnum } from '../config/api';
import {
  API_TOKEN,
  LOCAL_STORAGE_JWT_NAME,
  LOCAL_STORAGE_PROFILE,
} from '../config/general-config';
import { ILoginResponse, IProfile } from '../state/auth';
import FetchService from './FetchService';

class AuthService {
  public static async login(
    user,
    email,
    token,
    callback: (error?: Error) => void
  ): Promise<ILoginResponse> {

    const response = await FetchService.get<ILoginResponse>({
      url: ApiResourcesEnum.USER_ME,
      callback,
    });
    
    localStorage.setItem(LOCAL_STORAGE_JWT_NAME, API_TOKEN);
    const profile: IProfile = {
      name: response.name,
      id: response.id,
      createDate: response.createDate,
      points: response.points,
      redeemHistory: response.redeemHistory
    };
    
    localStorage.setItem(LOCAL_STORAGE_PROFILE, JSON.stringify(profile));
    
    return response;
  }

  public static logout() {
    localStorage.removeItem(LOCAL_STORAGE_JWT_NAME);
    localStorage.removeItem(LOCAL_STORAGE_PROFILE);
  }
}

export default AuthService;
