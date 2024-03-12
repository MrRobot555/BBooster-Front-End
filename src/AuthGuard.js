import store from './store'

export default (to, from, next) => {
    console.log('u_data: ', store.getters.currentUser)
    if (!store.getters.currentUser) {
        next({
            path: '/pages/login'
        }) 
    } else {
        next()
    }
}