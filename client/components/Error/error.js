import {React} from 'react'
import {NavLink} from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h2>
        Sorry! Either you do not have access to the required access or kindly
        check the URL. Click <NavLink to="/"> here </NavLink> to return to the
        home page
      </h2>
    </div>
  )
}

export default Error
