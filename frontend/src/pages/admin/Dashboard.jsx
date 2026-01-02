import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../store/api'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { FiPackage, FiUsers, FiCalendar, FiTrendingUp } from 'react-icons/fi'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard')
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!stats) {
    return <div className="text-center py-12">Failed to load dashboard</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Cars</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.stats.totalCars}
              </p>
            </div>
            <FiPackage className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.stats.totalUsers}
              </p>
            </div>
            <FiUsers className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.stats.totalBookings}
              </p>
            </div>
            <FiCalendar className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Bookings</p>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.stats.pendingBookings}
              </p>
            </div>
            <FiTrendingUp className="text-4xl text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/cars" className="card p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Manage Cars</h3>
          <p className="text-gray-600 dark:text-gray-400">Add, edit, or delete cars</p>
        </Link>
        <Link to="/admin/bookings" className="card p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
          <p className="text-gray-600 dark:text-gray-400">View and manage test drive bookings</p>
        </Link>
        <Link to="/admin/users" className="card p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600 dark:text-gray-400">View and manage user accounts</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      {stats.recentBookings && stats.recentBookings.length > 0 && (
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">Car</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-2">{booking.userId?.name || 'N/A'}</td>
                    <td className="py-2">{booking.carId?.name || 'N/A'}</td>
                    <td className="py-2">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

