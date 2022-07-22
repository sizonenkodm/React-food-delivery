import React, { useEffect, useContext } from 'react';
import { API_URL } from '../config';
import { ShopContext } from '../context';

import Preloader from '../components/Preloader';
import GoodsList from '../components/GoodsList';
import Cart from '../components/Cart';
import BasketList from '../components/BasketList';
import Alert from '../components/Alert';

const Shop = (props) => {

    const {
        mcdonalds,
        kfc,
        egersund,
        setMcdonalds,
        setKfc,
        setEgersund,
    } = props;

    const {
        loading,
        order,
        isBasketShow,
        alertName,
        setGoods,
        handleBasketShow
    } = useContext(ShopContext);

    useEffect(function getGoods() {
        if (mcdonalds) {
            fetch(`${API_URL}/mcdonalds.json`)
                .then(response => response.json())
                .then(data => {
                    setGoods(data.McDonalds);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (kfc) {
            fetch(`${API_URL}/kfc.json`)
                .then(response => response.json())
                .then(data => {
                    setGoods(data.KFC);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (egersund) {
            fetch(`${API_URL}/egersund.json`)
                .then(response => response.json())
                .then(data => {
                    setGoods(data.Egersund);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [mcdonalds, kfc, egersund, setGoods]);

    return (
        <main className="container content">
            <div className='place-list'>
                <button className='store btn brown lighten-3'
                    disabled={order.length && order[0].type !== 'mcdonalds'}
                    onClick={() => {
                        setMcdonalds(true);
                        setKfc(false);
                        setEgersund(false);
                    }}
                >
                    McDonalds
                </button>
                <button className='store btn brown lighten-3'
                    disabled={order.length && order[0].type !== 'kfc'}
                    onClick={() => {
                        setKfc(true);
                        setMcdonalds(false);
                        setEgersund(false);
                    }}
                >
                    KFC
                </button>
                <button className='store btn brown lighten-3'
                    disabled={order.length && order[0].type !== 'egersund'}
                    onClick={() => {
                        setEgersund(true);
                        setKfc(false);
                        setMcdonalds(false);
                    }}
                >
                    Egersund
                </button>
            </div>
            <div className='items-list'>
                <Cart />
                {
                    (!mcdonalds && !kfc && !egersund)
                        ? (
                            <div className='head-img'>
                                <img src="React-food-delivery/Assets/1-3.png" alt="background" />
                                <div className='head-img__content'>
                                    <h1>Найшвидша доставка твоїх улюблених страв!</h1>
                                </div>
                            </div>
                        )
                        : (loading ? <Preloader /> : <GoodsList />)
                }
                {
                    isBasketShow && (
                        <div
                            className='content modal'
                            onClick={(event) => {
                                if (event.target.classList.contains('modal')) {
                                    handleBasketShow();
                                }
                            }}
                        >
                            <BasketList />
                        </div>
                    )
                }
                {
                    alertName && <Alert />
                }
            </div>
        </main>
    );
};

export default Shop;