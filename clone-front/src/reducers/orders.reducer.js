import { ordersConstants } from "../constants";

const initialState = {
    list : []
};

export function orders(state = initialState, action) {

    switch (action.type)
    {
        case ordersConstants.GETALL_SUCCESS:
            console.log("our orders are", action.orders);
            return {
                ...state,
                list: action.orders
            };
        case ordersConstants.GETALL_FAILURE:
            console.log("Failed to get orders");
            return {
                ...state,
                error: action.error
            };

        case ordersConstants.GET_SUCCESS:
            console.log("our order is", action.order);
            return {
                ...state,
                list: [...state.orders.list, action.order]
            };
        case ordersConstants.GET_FAILURE:
            console.log("Failed to get order");
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}