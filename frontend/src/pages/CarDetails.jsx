import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarById } from '../store/slices/carSlice'
import api from '../store/api'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { FiHeart, FiCalendar, FiDroplet, FiSettings, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentCar, loading } = useSelector((state) => state.cars)
  const { user } = useSelector((state) => state.auth)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingLocation, setBookingLocation] = useState('')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    dispatch(fetchCarById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (user && currentCar) {
      checkWishlist()
    }
  }, [user, currentCar])

  const checkWishlist = async () => {
    if (!user || !currentCar) return
    
    try {
      const response = await api.get('/users/wishlist')
      const wishlist = response.data.data || []
      setIsInWishlist(wishlist.some(car => car && car._id === currentCar._id))
    } catch (error) {
      // Silently fail - user might not have wishlist or not logged in
      setIsInWishlist(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error('Please login to add to wishlist')
      navigate('/login')
      return
    }

    try {
      if (isInWishlist) {
        await api.delete(`/users/wishlist/${id}`)
        setIsInWishlist(false)
        toast.success('Removed from wishlist')
      } else {
        await api.post(`/users/wishlist/${id}`)
        setIsInWishlist(true)
        toast.success('Added to wishlist')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wishlist')
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to book a test drive')
      navigate('/login')
      return
    }

    try {
      await api.post('/bookings', {
        carId: id,
        date: bookingDate,
        location: bookingLocation,
      })
      toast.success('Test drive booked successfully!')
      setShowBookingModal(false)
      setBookingDate('')
      setBookingLocation('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book test drive')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!currentCar) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Car not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="mb-4">
            {currentCar.images && currentCar.images.length > 0 ? (
              <img
                src={currentCar.images[selectedImage]?.url}
                alt={currentCar.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>
          {currentCar.images && currentCar.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {currentCar.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${currentCar.name} ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentCar.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{currentCar.brand}</p>
            </div>
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <FiHeart />
            </button>
          </div>

          <div className="text-3xl font-bold text-primary-600 mb-6">
            ${currentCar.price?.toLocaleString()}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <FiDroplet />
              <span>{currentCar.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <FiSettings />
              <span>{currentCar.transmission}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>📊</span>
              <span>{currentCar.mileage?.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>🚗</span>
              <span>{currentCar.specifications?.bodyType}</span>
            </div>
          </div>

          {currentCar.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400">{currentCar.description}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Engine:</span>
                <span className="font-medium">{currentCar.engine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Seating Capacity:</span>
                <span className="font-medium">{currentCar.specifications?.seatingCapacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Body Type:</span>
                <span className="font-medium">{currentCar.specifications?.bodyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Color:</span>
                <span className="font-medium">{currentCar.specifications?.color || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                <span className={`font-medium ${
                  currentCar.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentCar.availability}
                </span>
              </div>
            </div>
          </div>

          {currentCar.features && currentCar.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {currentCar.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentCar.specifications?.safetyFeatures && currentCar.specifications.safetyFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Safety Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {currentCar.specifications.safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => setShowBookingModal(true)}
              disabled={currentCar.availability === 'Out of Stock'}
              className="btn-primary flex items-center space-x-2 flex-1 justify-center"
            >
              <FiCalendar />
              <span>Book Test Drive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book Test Drive</h2>
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={bookingLocation}
                  onChange={(e) => setBookingLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                  className="input-field"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarDetails

