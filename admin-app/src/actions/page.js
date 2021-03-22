/* eslint-disable */
import axios from '../helpers/axios';
import { pageConstants } from './constants';

export const getAllPages = () => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.GET_ALL_PAGES_REQUEST });
    const res = await axios.get(`page/getPages`);
    console.log(res);
    if (res.status === 200) {
      const { pageList } = res.data;

      dispatch({
        type: pageConstants.GET_ALL_PAGES_SUCCESS,
        payload: { pages: pageList },
      });
    } else {
      dispatch({
        type: pageConstants.GET_ALL_PAGES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    try {
      const res = await axios.post('/page/create', form);
      if (res.status === 201) {
        dispatch({
          type: pageConstants.CREATE_PAGE_SUCCESS,
          payload: { page: res.data.page },
        });
      } else {
        dispatch({
          type: pageConstants.CREATE_PAGE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePages = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.UPDATE_PAGES_REQUEST });
    const res = await axios.post(`/page/update`, form);
    if (res.status === 201) {
      dispatch({ type: pageConstants.UPDATE_PAGES_SUCCESS });
      dispatch(getAllPages());
    } else {
      const { error } = res.data;
      dispatch({
        type: pageConstants.UPDATE_PAGES_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deletePages = (ids) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.DELETE_PAGES_REQUEST });
    const res = await axios.post(`/page/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status == 201) {
      dispatch(getAllPages());
      dispatch({ type: pageConstants.DELETE_PAGES_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: pageConstants.DELETE_PAGES_FAILURE,
        payload: { error },
      });
    }
  };
};
