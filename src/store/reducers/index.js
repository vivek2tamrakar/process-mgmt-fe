// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import group from './group';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, group });

export default reducers;
