import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">CarAuto</h3>
            <p className="text-sm">
              Your trusted partner for premium automotive solutions. Find your dream car today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white transition">Browse Cars</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="hover:text-white transition">Car Sales</Link></li>
              <li><Link to="/bookings" className="hover:text-white transition">Test Drive</Link></li>
              <li><Link to="/" className="hover:text-white transition">Car Financing</Link></li>
              <li><Link to="/" className="hover:text-white transition">Trade-In</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition"><FiFacebook size={20} /></a>
              <a href="#" className="hover:text-white transition"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-white transition"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-white transition"><FiLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CarAuto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

