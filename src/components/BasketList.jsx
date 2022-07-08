import React, { useState, useContext } from 'react';
import { ShopContext } from '../context';
import BasketItem from './BasketItem';
import Form from './Form';

const BasketList = () => {
    const [openForm, setOpenForm] = useState(false);

    const {
        order = [],
        handleBasketShow = Function.prototype,
    } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);

    return (
        <div>
            {
                openForm
                    ? <Form totalPrice={totalPrice} />
                    : (
                        <ul className="collection basket-list">
                            <li className="collection-item active brown lighten-1">Кошик</li>
                            {
                                order.length
                                    ? order.map(el => (<BasketItem key={el.id} {...el} />))
                                    : <li className="collection-item">Кошик пустий</li>
                            }
                            <li
                                className="collection-item active brown lighten-1"
                            >
                                Загальна сума: {totalPrice} грн
                            </li>
                            <li
                                className="collection-item active brown lighten-1"
                            >
                                <button
                                    className='btn btn-small'
                                    onClick={() => {
                                        if (order.length) setOpenForm(true)
                                    }}
                                >
                                    Оформити замовлення
                                </button>
                            </li>
                            <i
                                className='material-icons basket-close'
                                onClick={handleBasketShow}
                            >
                                close
                            </i>
                        </ul>
                    )
            }
        </div>
    );
};

export default BasketList;