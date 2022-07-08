import React, { useContext } from 'react';
import { ShopContext } from '../context';

const GoodsItem = (props) => {
    const {
        id,
        title,
        price,
        photo,
    } = props;

    const { addToBasket } = useContext(ShopContext);


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
                        photo
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