import {useAuth} from '../context/FakeAuthContext'
import {ReactNode, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


type ProtectedRouteProps = {
  children:ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) =>{

const navigate= useNavigate()
const {isAuthenticated} = useAuth()


useEffect(() => {
  if(!isAuthenticated) navigate('/login')

},[isAuthenticated, navigate]
)

  return   isAuthenticated ? children :null
}

export default ProtectedRoute