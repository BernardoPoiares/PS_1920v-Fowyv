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
        languages: null,
      };
    case 'GET_SEARCH_SETTINGS_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        minSearchAge: action.payload.minSearchAge,
        maxSearchAge: action.payload.maxSearchAge,
        genders: action.payload.genders,
        languages: action.payload.languages,
      };
    case 'GET_SEARCH_SETTINGS_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        minSearchAge: null,
        maxSearchAge: null,
        genders: null,
        languages: null,
      };
    case 'SET_SEARCH_SETTINGS_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        minSearchAge: state.minSearchAge,
        maxSearchAge: state.maxSearchAge,
        genders: state.genders,
        languages: state.languages,
      };
    case 'SET_SEARCH_SETTINGS_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        minSearchAge: state.minSearchAge,
        maxSearchAge: state.maxSearchAge,
        genders: state.genders,
        languages: state.languages,
        ...action.payload,
      };
    case 'SET_SEARCH_SETTINGS_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        minSearchAge: state.minSearchAge,
        maxSearchAge: state.maxSearchAge,
        genders: state.genders,
        languages: state.payload.languages,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchSettings,
});
