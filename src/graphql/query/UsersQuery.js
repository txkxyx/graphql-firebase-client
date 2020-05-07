import { gql } from "apollo-boost";

export const ALLUSERS = gql`
    query allUsers{
        totalUsers
        allUsers{
            id
            name
            mail
        }
    }
`

export const ME = gql`
    query me{
        me{
            id
            name
            mail
        }
    }
`