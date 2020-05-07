import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from 'react-apollo';
import { LOGIN } from '../graphql/mutation/UsersMutation';

const SignIn = () => {
    const [ mail, setMail ] = useState();
    const [ password, setPassword ] = useState();
    const history = useHistory();
    const [ login] = useMutation(LOGIN);

    return(
        <>
            <div>
                <label>Mail</label>
                <input type="email" onChange={(e) => {setMail(e.target.value)}}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div>
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    login({variables:{mail: mail, password: password}}).then((data) => {
                        localStorage.setItem('idToken', data.login);
                        history.push('/');
                    })
                }}>Login</button>
            </div>
        </>
    )
}

export default SignIn;