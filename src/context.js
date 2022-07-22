import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const ShopContext = createContext();

function setDefaultOrderValue() {
    const orderSaved = localStorage.getItem('order');
    return (
        orderSaved ? JSON.parse(orderSaved) : []
    );
}

const initialState = {
    goods: [],
    loading: true,
    order: setDefaultOrderValue(),
    isBasketShow: false,
    alertName: ''
}

const ContextProvider = ({ children }) => {

    const [value, dispatch] = useReducer(reducer, initialState);

    value.addToBasket = (item) => {
        dispatch({ type: 'ADD_TO_BASKET', payload: item });
    }

    value.removeFromBasket = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id: itemId } })
    }

    value.handleBasketShow = () => {
        dispatch({ type: 'TOGGLE_BASKET' });
    }

    value.incQuantity = (item) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: item });
    }

    value.decQuantity = (item) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
    }

    value.closeAlert = () => {
        dispatch({ type: 'CLOSE_ALERT' });
    }

    value.setGoods = (data) => {
        dispatch({ type: 'SET_GOODS', payload: data })
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ContextProvider;