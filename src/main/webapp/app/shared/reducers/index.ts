import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import accAccount, { AccAcountState } from 'app/entities/acc-account/acc-account.reducer';
// import entitiesReducers  from 'app/entities/reducers';

export interface IRootState {
  applicationProfile: ApplicationProfileState;
  authentication: AuthenticationState;
  administration: AdministrationState;
  rserManagement: UserManagementState;
  register: RegisterState;
  activate: ActivateState;
  password: PasswordState;
  settings: SettingsState;
  passwordReset: PasswordResetState;
  permission: PermissionState;
  accAccount: AccAcountState;
}

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  loadingBar,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  accAccount,
};

export default rootReducer;
