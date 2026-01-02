import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../store/api'
import toast from 'react-hot-toast'
import { FiHeart, FiX } from 'react-icons/fi'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/users/wishlist')
      setWishlist(response.data.data || [])
    } catch (error) {
      // Only show error if it's not a 401 (unauthorized) - user might not be logged in
      if (error.response?.status !== 401) {
        console.warn('Failed to fetch wishlist:', error.message)
      }
      setWishlist([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (carId) => {
    try {
      await api.delete(`/users/wishlist/${carId}`)
      toast.success('Removed from wishlist')
      fetchWishlist()
    } catch (error) {
      toast.error('Failed to remove from wishlist')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <FiHeart className="mx-auto text-6xl text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Your wishlist is empty</p>
          <Link to="/cars" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((car) => (
            <div key={car._id} className="card relative">
              <button
                onClick={() => handleRemove(car._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
              >
                <FiX />
              </button>
              <Link to={`/cars/${car._id}`}>
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[0].url}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{car.brand}</p>
                  <p className="text-xl font-bold text-primary-600">
                    ${car.price?.toLocaleString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist

