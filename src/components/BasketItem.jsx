import React, { useContext } from 'react';
import { ShopContext } from '../context';

const BasketItem = (props) => {
    const {
        id,
        title,
        price,
        photo,
        quantity,
    } = props;

    const { removeFromBasket, incQuantity, decQuantity } = useContext(ShopContext);

    return (
        <li className="collection-item basket-item">
            <div className='basket-item-info'>
                <div>
                    {title} {(quantity > 1) ? price : null}x{quantity} = {price * quantity}
                </div>
                <img src={photo} alt={title} />
            </div>
            <div>
                <span
                    className="secondary-content"
                    onClick={() => removeFromBasket(id)}
                >
                    <i className="material-icons basket-delete">close</i>
                </span>
                <span className='secondary-content'>
                    <button
                        className='btn-quantity'
                        onClick={() => decQuantity({
                            id,
                            quantity
                        })
                        }
                    >
                        <b>-</b>
                    </button>
                    <span style={{ margin: '0 0.5rem', color: '#000' }}>{quantity}</span>
                    <button
                        className='btn-quantity'
                        onClick={() => incQuantity({
                            id,
                            quantity
                        })}
                    >
                        <b>+</b>
                    </button>
                </span>
            </div>
        </li >
    );
};

export default BasketItem;