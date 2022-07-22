import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../context';

const GoodsItem = (props) => {
    const {
        id,
        title,
        price,
        photo,
        type,
    } = props;

    const { order, addToBasket } = useContext(ShopContext);

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return (
        <div className="card">
            <div className="card-image">
                <img src={photo} alt={title} />
            </div>
            <div className="card-content">
                <span className="card-title">{title}</span>
            </div>
            <div className="card-action">
                <button
                    className='btn brown lighten-3'
                    onClick={() => addToBasket({
                        id,
                        title,
                        price,
                        photo,
                        type
                    })}
                >
                    <i>Додати</i>
                </button>
                <span className='right' style={{ fontSize: '1.8rem' }}>{price} грн</span>
            </div>
        </div>
    );
};

export default GoodsItem;