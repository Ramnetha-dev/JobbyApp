import {AiFillHome} from 'react-icons/ai'

import {FiLogOut} from 'react-icons/fi'

import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-nav-container">
        <Link to="/" className="link-item">
          <img
            className="website-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="header-items-container">
          <Link className="link-item" to="/">
            <li className="item">Home</li>
          </Link>
          <Link className="link-item" to="/jobs">
            <li className="item">Jobs</li>
          </Link>
        </ul>

        <div className="button-container">
          <ul className="nav-items-conntainer">
            <Link className="link-item" to="/">
              <li className="nav-item">
                <AiFillHome className="nav-icon" size={20} />
              </li>
            </Link>
            <Link className="link-item" to="/jobs">
              <li className="nav-item">
                <BsBriefcaseFill className="nav-icon" size={20} />
              </li>
            </Link>
            <button
              type="button"
              className="logout-icon"
              onClick={onClickLogoutButton}
            >
              <li>
                <FiLogOut className="nav-icon" size={20} />
              </li>
            </button>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
