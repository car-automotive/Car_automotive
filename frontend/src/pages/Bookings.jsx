import { useEffect, useState } from 'react'
import api from '../store/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { FiCalendar, FiMapPin, FiX } from 'react-icons/fi'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings')
      setBookings(response.data.data || [])
    } catch (error) {
      // Only show error if it's not a 401 (unauthorized)
      if (error.response?.status !== 401) {
        console.warn('Failed to fetch bookings:', error.message)
        toast.error('Failed to fetch bookings')
      }
      setBookings([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return
    }

    try {
      await api.put(`/bookings/${id}/cancel`)
      toast.success('Booking cancelled successfully')
      fetchBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="card p-6">
              {booking.carId && (
                <>
                  {booking.carId.images && booking.carId.images.length > 0 && (
                    <img
                      src={booking.carId.images[0].url}
                      alt={booking.carId.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{booking.carId.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{booking.carId.brand}</p>
                </>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiCalendar />
                  <span>{format(new Date(booking.date), 'PPP')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiMapPin />
                  <span>{booking.location}</span>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn-danger w-full flex items-center justify-center space-x-2"
                >
                  <FiX />
                  <span>Cancel Booking</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings

