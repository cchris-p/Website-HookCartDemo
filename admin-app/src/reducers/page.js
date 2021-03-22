/* eslint-disable */
import { pageConstants } from '../actions/constants';

const initState = {
  pages: [],
  error: null,
  loading: false,
  page: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case pageConstants.GET_ALL_PAGES_SUCCESS:
      state = {
        ...state,
        pages: action.payload.pages,
      };
      break;
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case pageConstants.UPDATE_PAGES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.UPDATE_PAGES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case pageConstants.UPDATE_PAGES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case pageConstants.DELETE_PAGES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.DELETE_PAGES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case pageConstants.PAGES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
