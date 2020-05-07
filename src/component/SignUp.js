import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { SINGUP_USER_MUTATION } from '../graphql/mutation/UsersMutation';
import { useHistory } from 'react-router';

const SignUp = () => {
    const [ name, setName ] = useState();
    const [ mail, setMail ] = useState();
    const [ password, setPassword ] = useState();
    const [ icon, setIcon ] = useState();
    const history = useHistory();
    const [ singUpUser, { loading: mutationLoading, error: mutationError }] = useMutation(SINGUP_USER_MUTATION);
    return(
        <form onSubmit={e => {
            e.preventDefault();
            singUpUser({variables:{name: name, mail: mail, password: password, icon: icon}}).then(data => {
                history.push('/');
            }).catch(err => {
                console.log(err)
            });
        }}>
            <div>
                <label>Name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div>
                <label>Mail</label>
                <input type="email" onChange={(e) => {setMail(e.target.value)}} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div>
                <label>Icon</label>
                <input type="text" onChange={(e) => {setIcon(e.target.value)}} />
            </div>
            <div>
                <button type="submit" >SIGNUP</button>
            </div>
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :Please try again</p>}
        </form>   
    )
}
export default SignUp;