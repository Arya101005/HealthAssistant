import { store } from './index';
import { UserHealthProfile } from '../types/health';
import { DeviceState } from '../types/device';

declare module '@reduxjs/toolkit' {
  interface DefaultRootState {
    health: {
      profile: UserHealthProfile | null;
      loading: boolean;
      error: string | null;
    };
    device: DeviceState;
  }
}

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; 