import * as types from "../actions/actionTypes";
import io from 'socket.io-client';

let socket = io('http://localhost:9000');

export default (state = socket, action) => {
  switch (action.type) {
    default:
      return state;
  }
};