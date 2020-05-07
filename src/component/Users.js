import React from 'react';
import { Query, useMutation } from "react-apollo";
import { ALLUSERS } from '../graphql/query/UsersQuery';
import { useHistory } from 'react-router';
import { DELETE_USER_MUTATION } from '../graphql/mutation/UsersMutation';
import firebase from '../fgConfig';
import SignIn from './SignIn';

const Users = () => {
    return(
    <Query query={ALLUSERS} pollInterval={60000}>
        {({ data, loading}) => {
            return loading ? <p>loading users</p> : <UserList count={data.totalUsers} users={data.allUsers}/>
        }}
    </Query>
    )
}

const LoginLogout = () => {
    const history = useHistory();
    return firebase.auth().currentUser ? 
        <button type="button" onClick={(e) => {
            e.preventDefault();
            firebase.auth().currentUser.delete();
            localStorage.setItem('idToken',null);
            history.push('/');
            }}>SIGNOUT</button> : 
        <SignIn/>
}

const NewUser = () => {
    const history = useHistory();
    return(
        <button type="button" onClick={(e) => {
            e.preventDefault();
            history.push('/new/signup');
        }}>New</button>
    )
}


const UserList = ({ count, users }) => {
    return(
        <div>
            <p>
                <LoginLogout/>
            </p>
            <p>{count} Users <NewUser/></p>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>MAIL</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {users.map(user => 
                    <UserListItem key={user.id} id={user.id} name={user.name} mail={user.mail}/>
                )}
            </table>
        </div>
    )
}

const UserListItem = ({ id, name, mail }) =>{
    const history = useHistory();
    const [ deleteUser, { loading, error } ] = useMutation(DELETE_USER_MUTATION);
    return(
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{mail}</td>
            <td><button type="button" disabled={!firebase.auth().currentUser}>edit</button></td>
            <td>
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    deleteUser({variables:{id:id}}).then(() => {
                        history.push('/');
                    }).catch((err) => {
                        console.log(err);
                    });
                }} disabled={!firebase.auth().currentUser}>delete</button>
                { loading && alert('Delete User...')}
                { error && alert('Error happened.')}
            </td>
        </tr>
    )
}
export default Users