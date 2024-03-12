import { gql } from "graphql-tag"

export const SET_NETWORKS_CONTAINER = gql`
          mutation {
            addNetworkContainer(id: "0", name: "Quantum") {
              _id
            }
          }
`

export const SET_NEW_NETWORK = gql`
          mutation addNetwork($name: String!, $id: String!) {
            addNetwork(networksID: "616575a9030d7c40047dac14", name: $name, id: $id) {
              _id
            }
          }
`

export const GET_NETWORKS = gql`
          query {
            getNetworks(id: "616575a9030d7c40047dac14") {
              _id
              networks_name {
                _id
                id
                name
              }
            }
          }
`

export const GET_USER = gql`
          query getUser($param: String!) {
            getUser(email: $param) {
              first_name
              last_name
              lists {
                network_id
              }
            }
          }
        `
export const SUBSCRIBE_USER = gql`
          subscription getUserSub($email: String!) {
            getUserSub(email: $email) {
              _id
                  email
                  first_name
                  last_name
                  password
                  profile_pic
                  join_datetime
                  user_address {
                    _id
                    country
                    city
                    ZIP
                    street
                    housenumber            
                  }
                  card_details {
                    _id
                    name_on_card
                    card_number
                    expiry
                    ccv
                  }
                  is_company
                  tax_number
                  company_name
                  company_seat {
                    _id
                    country
                    city
                    ZIP
                    street
                    housenumber
                  }
                  lists {
                    _id
                    order_date
                    order_quantity
                    network_id
                    userID {
                      _id
                    }
                    name_list {
                      _id
                      client_name
                      client_phone
                      status
                      recall_time
                      acquire_datetime
                      own_notes
                      feedback
                    }       
                  }
            }
        }
`

export const GET_CURRENT_USER = gql`
          query {
            getCurrentUser {
                  _id
                  email
                  first_name
                  last_name
                  password
                  profile_pic
                  join_datetime
                  user_address {
                    _id
                    country
                    city
                    ZIP
                    street
                    housenumber            
                  }
                  card_details {
                    _id
                    name_on_card
                    card_number
                    expiry
                    ccv
                  }
                  is_company
                  tax_number
                  company_name
                  company_seat {
                    _id
                    country
                    city
                    ZIP
                    street
                    housenumber
                  }
                  lists {
                    _id
                    order_date
                    order_quantity
                    network_id
                    userID {
                      _id
                    }
                    name_list {
                      _id
                      client_name
                      client_phone
                      status
                      recall_time
                      acquire_datetime
                      own_notes
                      feedback
                    }       
                  }
            }
          }
        `

export const SIGNIN_USER = gql`
mutation($email: String!, $password: String!) {
  signinUser(email: $email, password: $password) {
    token
  }
}
`
export const SET_ENTRY_STATUS = gql`
mutation($entryID: ID!, $newStatus: String!) {
  setEntryStatus(entryID: $entryID, newStatus: $newStatus) {
    _id
    status
  }
}
`

export const SIGNUP_USER = gql`
mutation($email: String!, $first_name: String!, $last_name: String!, $password: String!, $profile_pic: String!, $is_company: Boolean!) {
  signupUser(email: $email, first_name: $first_name, last_name: $last_name, password: $password, profile_pic: $profile_pic, is_company: $is_company) {
		token
  }
}
`