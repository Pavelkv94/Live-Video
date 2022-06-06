
export const ME = 'ME';
export const FETCH_USER = 'FETCH_USER';
export const SET_USER = 'SET_USER';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const REGISTER_USER = 'REGISTER_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_REGISTER_STATUS = "SET_STATUS";
//CAMERAS
export const FETCH_CAMERAS = 'FETCH_CAMERAS';
export const CREATE_CAMERA = 'CREATE_CAMERA';
export const UPDATE_CAMERA = 'UPDATE_CAMERA';
export const DELETE_CAMERA = 'DELETE_CAMERA';

export const usersUrl = () => `users`;
export const userUrl = (id) => `users/${id}`;

export const camerasUrl = (id) => `cameras/${id}`;