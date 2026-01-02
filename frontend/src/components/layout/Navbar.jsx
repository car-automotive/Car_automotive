import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { FiMenu, FiX, FiUser, FiHeart, FiCalendar, FiLogOut, FiSettings } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logout())
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">🚗</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">CarAuto</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/cars" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">
              Cars
            </Link>
            
            {user ? (
              <>
                <Link to="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition flex items-center space-x-1">
                  <FiHeart />
                  <span>Wishlist</span>
                </Link>
                <Link to="/bookings" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition flex items-center space-x-1">
                  <FiCalendar />
                  <span>Bookings</span>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition flex items-center space-x-1">
                    <FiSettings />
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition flex items-center space-x-1">
                  <FiUser />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="btn-secondary flex items-center space-x-1">
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/cars" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
              Cars
            </Link>
            {user ? (
              <>
                <Link to="/wishlist" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link to="/bookings" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                  Bookings
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

