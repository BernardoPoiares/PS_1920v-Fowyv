import {combineReducers} from 'redux';

const searchSettings = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_SETTINGS_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        minSearchAge: null,
        maxSearchAge: null,
        genders: null,
      };
    case 'GET_SEARCH_SETTINGS_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        minSearchAge: action.payload.minAge,
        maxSearchAge: action.payload.maxAge,
        genders: action.payload.genders,
      };
    case 'GET_SEARCH_SETTINGS_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        minSearchAge: action.minAge,
        maxSearchAge: action.maxAge,
        genders: action.genders,
      };
    case 'SET_SEARCH_SETTINGS_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        minSearchAge: state.minAge,
        maxSearchAge: state.maxAge,
        genders: state.genders,
      };
    case 'SET_SEARCH_SETTINGS_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        minSearchAge: state.minAge,
        maxSearchAge: state.maxAge,
        genders: state.genders,
        ...action.payload,
      };
    case 'SET_SEARCH_SETTINGS_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        minSearchAge: action.minAge,
        maxSearchAge: action.maxAge,
        genders: action.genders,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchSettings,
});
