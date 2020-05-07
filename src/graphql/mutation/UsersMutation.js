import { gql } from "apollo-boost";

export const SINGUP_USER_MUTATION = gql`
    mutation singUpUser($name: String!, $mail: String!, $password: String!, $icon: String!){
        singUpUser(name: $name, mail: $mail, password: $password, icon: $icon){
            id
            name
            mail
        }
    }
`

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id)
    }
`

export const LOGIN = gql`
    mutation login($mail: String!, $password: String!){
        login(mail: $mail, password: $password){
            id
            name
            mail
        }
    }
`