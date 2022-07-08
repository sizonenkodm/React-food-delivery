import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context';
// import { FirestoreContext } from '../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase';


const Form = ({ totalPrice }) => {

    const [disabled, setDisabled] = useState(true);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [addressDirty, setAddressDirty] = useState(false);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');

    const {
        order = [],
        handleBasketShow = Function.prototype
    } = useContext(ShopContext);

    const messagesRef = collection(firestore, 'orders')
    const q = query(messagesRef, orderBy("createdAt"));
    const [orders, loading] = useCollectionData(q);

    const sendOrder = async (formData) => {
        const response = addDoc(messagesRef, {
            data: Object.fromEntries(formData.entries()),
            order: Object.fromEntries(order.entries()),
            totalPrice: totalPrice,
            createdAt: serverTimestamp()
        });
        return await response.json;
    }

    const nameHandler = (event) => {
        setNameDirty(true);
        if (String(event.target.value).length < 2 || String(event.target.value).length > 60) {
            setNameError('Ім\'я повинно буди не менше 2 і не більше 60 літер!');
        } else {
            setNameError('');
        }
    };

    const emailHandler = (event) => {
        setEmailDirty(true);
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError('Некоректний email!');
        } else {
            setEmailError('');
        }
    };

    const phoneHandler = (event) => {
        setPhoneDirty(true);
        if (String(event.target.value).slice(0, 4) !== '+380' || String(event.target.value).length !== 13) {
            setPhoneError('Некоректний формат телефону! Номер повинен починатись з +380');
        } else {
            setPhoneError('');
        }
    };

    const addressHandler = (event) => {
        setAddressDirty(true);
        if (String(event.target.value).length < 10 || String(event.target.value).length > 60) {
            setAddressError('Адреса повинна буди не менше 10 і не більше 60 символів!');
        } else {
            setAddressError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { form } = document.forms;
        const formData = new FormData(form);

        sendOrder(formData)
            .then(res => {
                console.log(res);
                setSuccessMessage('Ваше замовлення було відправлене!');
                setSuccess(true);
            })
            .catch(() => {
                setSuccessMessage('Щось пійшло не так. Спробуйте ще раз.');
                setSuccess(false);
            })
            .finally(() => {
                clearInputs();
                order.length = 0;
                setTimeout(() => {
                    setSuccessMessage('');
                    handleBasketShow();
                }, 5000);
            });
    };

    const clearInputs = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');

        setNameDirty(false);
        setEmailDirty(false);
        setPhoneDirty(false);
        setAddressDirty(false);
    };

    useEffect(() => {
        if (!nameError && !emailError && !phoneError && !addressError && (nameDirty && emailDirty && phoneDirty)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [nameError, emailError, phoneError, addressError, nameDirty, emailDirty, phoneDirty]);

    return (
        <div>
            <form
                id='form'
                className="delivery-form"
                onSubmit={(event) => handleSubmit(event)}
            >
                <input
                    name='name'
                    className='input'
                    style={nameError ? { border: '2px solid red' } : { border: '1px solid lightgray' }}
                    type="text"
                    placeholder='Your name'
                    value={name}
                    required={true}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={(event) => nameHandler(event)}
                />
                {(nameDirty && nameError) && <small className='error'>{nameError}</small>}

                <input
                    name='email'
                    className='input'
                    style={emailError ? { border: '2px solid red' } : { border: '1px solid lightgray' }}
                    type="email"
                    placeholder='Email'
                    value={email}
                    required={true}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={(event) => emailHandler(event)}
                />
                {(emailDirty && emailError) && <small className='error'>{emailError}</small>}

                <label htmlFor='tel'>
                    <input
                        name='phone'
                        className='input'
                        style={phoneError ? { border: '2px solid red' } : { border: '1px solid lightgray' }}
                        type="tel"
                        id='tel'
                        placeholder='Phone'
                        value={phone}
                        required={true}
                        onChange={(event) => setPhone(event.target.value)}
                        onBlur={(event) => phoneHandler(event)}
                        onInput={(event) => event.target.value = event.target.value.replace(/[^+\d]/, '')}
                    />
                    <br />
                    <small>+38 (XXX) XXX - XX - XX</small>
                </label>
                {(phoneDirty && phoneError) && <small className='error'>{phoneError}</small>}

                <input
                    name='address'
                    className='input'
                    style={addressError ? { border: '2px solid red' } : { border: '1px solid lightgray' }}
                    type="text"
                    placeholder='Your address'
                    value={address}
                    required={true}
                    onChange={(event) => setAddress(event.target.value)}
                    onBlur={(event) => addressHandler(event)}
                />
                {(addressDirty && addressError) && <small className='error'>{addressError}</small>}

                <button
                    className='button'
                    type='submit'
                    disabled={disabled}
                >
                    ЗАМОВИТИ
                </button>
                {
                    success
                        ? <h5 style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</h5>
                        : <h5 style={{ color: 'red', marginBottom: '20px' }}>{successMessage}</h5>
                }

            </form>
        </div>
    );
};

export default Form;