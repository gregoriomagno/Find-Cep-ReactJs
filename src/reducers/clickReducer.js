import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';
import Local from '../models/local'

const localInitial = new Local({cep:null,lat: -5.08921,lng: -42.8016 })
const initialState = {
  newValue: localInitial
};
export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};

