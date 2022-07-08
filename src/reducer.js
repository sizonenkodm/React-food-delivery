const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_TO_BASKET': {
            const itemIndex = state.order.findIndex(el => el.id === payload.id);

            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                }
                newOrder = [...state.order, newItem];
                return {
                    ...state,
                    order: newOrder,
                    alertName: payload.title
                }
            } else {
                return state;
            }
        }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter(el => el.id !== payload.id)
            }
        case 'TOGGLE_BASKET':
            return {
                ...state,
                isBasketShow: !state.isBasketShow
            }
        case 'INCREMENT_QUANTITY': {
            const itemIndex = state.order.findIndex(el => el.id === payload.id);
            const newOrder = state.order.map((el, i) => {
                if (i === itemIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1
                    };
                } else {
                    return el;
                }
            });
            return {
                ...state,
                order: newOrder,
            }
        }
        case 'DECREMENT_QUANTITY': {
            if (payload.quantity === 1) {
                return state;
            } else {
                const itemIndex = state.order.findIndex(el => el.id === payload.id);
                const newOrder = state.order.map((el, i) => {
                    if (i === itemIndex) {
                        return {
                            ...el,
                            quantity: el.quantity - 1
                        };
                    } else {
                        return el;
                    }
                });
                return {
                    ...state,
                    order: newOrder,
                }
            }
        }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload || [],
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;