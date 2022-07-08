import React, { useContext } from 'react';
import { ShopContext } from '../context';

const Header = (props) => {
    const { order = [] } = useContext(ShopContext);

    return (
        <nav className="brown lighten-3">
            <div className="nav-wrapper">
                <a
                    href="#"
                    className="brand-logo"
                    onClick={() => {
                        props.setMcdonalds(false);
                        props.setKfc(false);
                        props.setEgersund(false);
                        order.length = 0;
                    }}
                >
                    Home
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://github.com/sizonenkodm/React-food-delivery" target='_blank'>Repo</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;