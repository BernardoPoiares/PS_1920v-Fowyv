import {combineReducers} from 'redux';

const searchSettings = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_SETTINGS_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        minSearchAge: null,
        maxSearchAge: null,
        searchGenders: null,
        languages: null,
      };
    case 'GET_SEARCH_SETTINGS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        minSearchAge: action.payload.minSearchAge,
        maxSearchAge: action.payload.maxSearchAge,
        searchGenders: action.payload.searchGenders,
        languages: action.payload.languages,
      };
    case 'GET_SEARCH_SETTINGS_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        minSearchAge: null,
        maxSearchAge: null,
        searchGenders: null,
        languages: null,
      };
    case 'SET_SEARCH_SETTINGS_LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'SET_SEARCH_SETTINGS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        ...action.payload,
      };
    case 'SET_SEARCH_SETTINGS_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchSettings,
});
