import React, {useCallback, useContext, useState} from 'react';
import './Form.scss';
import api from "../../api";
import UserContext from "../../UserContext";
import Box from "../Box/Box";

const Form = (): JSX.Element => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { setStateOnLogin } = useContext(UserContext);
    const isFormDisabled = !(username && password) || isSubmitting;

    const handleChange = useCallback((setter) =>
        (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value),
        []
    );

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        api.login({ username, password })
            .then((token) => {
                setError('');
                setStateOnLogin();
            })
            .catch(({ description }) => {
                setError(description);
                setIsSubmitting(false);
            });
    }, [username, password, setStateOnLogin]);

    return (
        <Box className="form">
            <form onSubmit={handleSubmit}>
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
                    Send
                </button>

                {error && <p className="form__error">{error}</p>}
            </form>
        </Box>
    );
};

export default Form;
