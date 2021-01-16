import authReducer from './auth';
import userReducer from './user';
import orderReducer from './order';
import productReducer from './product';
import categoryReducer from './category';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
});

export default rootReducer;