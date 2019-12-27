import { SHOES_ERROR, GET_SHOES } from '../actions/types';

const initialState = {
    shoes: [],
    shoe: {},
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHOES:
            console.log(payload)
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case SHOES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}