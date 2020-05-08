import React, {useCallback, useState} from 'react';
import './Form.scss';

const Form = (): JSX.Element => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const isFormDisabled = !(username || password);

    const handleChange = useCallback((setter) =>
        (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value),
        []
    );

    return (
        <form className="form">
            <h1 className="form__title">Login</h1>
            <label className="form__item">
                Username
                <input
                    name="username"
                    type="text"
                    value={username}
                    className="form__input"
                    onChange={handleChange(updateUsername)}
                />
            </label>

            <label className="form__item">
                Password
                <input
                    name="password"
                    type="password"
                    className="form__input"
                    value={password}
                    onChange={handleChange(updatePassword)}
                />
            </label>
            <button
                type="submit"
                className="form__submit"
                disabled={isFormDisabled}
            >
                Отправить
            </button>
        </form>
    );
};

export default Form;
