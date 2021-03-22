import {
  categoryConstants,
  productConstants,
  orderConstants,
  pageConstants,
} from './constants';
import axios from '../helpers/axios';

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      console.log(res.data);
      const { categories, products, orders, pages } = res.data;
      dispatch({
        type: pageConstants.GET_ALL_PAGES_SUCCESS,
        payload: { pages },
      });
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
    // console.log(res);
  };
};
