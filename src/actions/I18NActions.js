import { I18N_SET_LANGUAGE } from '../constants/ActionTypes';

export function setLanguage( language ) {
  return {
    type: I18N_SET_LANGUAGE,
    payload: language,
  };
}
