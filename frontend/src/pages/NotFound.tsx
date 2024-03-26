import { FaExclamationTriangle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>404</h1>
      <p className="lead">Sorry, This page does not exist!!!</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}

export default NotFound
