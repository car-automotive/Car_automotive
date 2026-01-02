import { Link } from 'react-router-dom'
import { FiDroplet, FiSettings } from 'react-icons/fi'

const CarCard = ({ car }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <Link to={`/cars/${car._id}`}>
        <div className="relative">
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
          {car.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {car.availability === 'Out of Stock' && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {car.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{car.brand}</p>
            </div>
            <span className="text-xl font-bold text-primary-600">
              ${car.price?.toLocaleString()}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="flex items-center space-x-1">
              <FiDroplet />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiSettings />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📊</span>
              <span>{car.mileage?.toLocaleString()} km</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CarCard

