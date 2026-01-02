import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchFeaturedCars } from '../store/slices/carSlice'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import CarCard from '../components/cars/CarCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Home = () => {
  const dispatch = useDispatch()
  const { featuredCars, loading } = useSelector((state) => state.cars)

  useEffect(() => {
    dispatch(fetchFeaturedCars()).catch(err => {
      // Silently handle errors - app should still render
      console.warn('Could not fetch featured cars:', err.message)
    })
  }, [dispatch])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Car Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Explore our premium collection of vehicles
            </p>
            <Link to="/cars" className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition">
              Browse Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through hundreds of premium vehicles
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Book test drives with confidence
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All vehicles are thoroughly inspected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <Link to="/cars" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : featuredCars && featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No featured cars available. Make sure the backend server is running on port 5000.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Backend should be running at: http://localhost:5000
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Drive Your Dream Car?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Book a test drive today and experience the difference
          </p>
          <Link to="/cars" className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

