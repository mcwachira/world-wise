import {createContext, useContext, useReducer} from "react";


const AuthContext = createContext()


const initialState = {
    user:null,
    isAuthenticated:false
}



const reducer = (state, action) => {
    switch(action.type){
        case 'login':
            return{
                ...state,
                user:action.payload,
                isAuthenticated: true
            };

        case 'logout':
            return{
                ...state,
                user:null,
                isAuthenticated: false
            }

        default:
            throw new Error('Unknow action')
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

export const AuthProvider = ({children}) => {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    const login = (email, password) => {

        if(email === FAKE_USER.email && password == FAKE_USER.password)
            dispatch({type:'login', payload:FAKE_USER})
    }

    const logOut = () => {
    dispatch({type:'logout'})
    }
    const value ={
        user, isAuthenticated, login, logOut
    }
    return <AuthContext.Provider value={value}>

        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {

    const context = useContext(AuthContext);

    if(context === undefined) throw new Error('auth context was used outside the Auth Provider')

    return (context)
}