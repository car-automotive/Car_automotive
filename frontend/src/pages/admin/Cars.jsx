import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../store/api'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const AdminCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '',
    engine: '',
    bodyType: 'Sedan',
    availability: 'In Stock',
    featured: false,
    description: '',
  })

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await api.get('/admin/cars')
      setCars(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch cars')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        formDataToSend.append(key, formData[key])
      }
    })

    try {
      if (editingCar) {
        await api.put(`/admin/cars/${editingCar._id}`, formDataToSend)
        toast.success('Car updated successfully')
      } else {
        await api.post('/admin/cars', formDataToSend)
        toast.success('Car created successfully')
      }
      setShowModal(false)
      setEditingCar(null)
      setFormData({
        name: '', brand: '', price: '', fuelType: 'Petrol',
        transmission: 'Automatic', mileage: '', engine: '',
        bodyType: 'Sedan', availability: 'In Stock', featured: false, description: ''
      })
      fetchCars()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save car')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return
    try {
      await api.delete(`/admin/cars/${id}`)
      toast.success('Car deleted successfully')
      fetchCars()
    } catch (error) {
      toast.error('Failed to delete car')
    }
  }

  const handleEdit = (car) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      brand: car.brand,
      price: car.price,
      fuelType: car.fuelType,
      transmission: car.transmission,
      mileage: car.mileage,
      engine: car.engine,
      bodyType: car.specifications?.bodyType || 'Sedan',
      availability: car.availability,
      featured: car.featured,
      description: car.description || '',
    })
    setShowModal(true)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Cars</h1>
        <button onClick={() => { setShowModal(true); setEditingCar(null) }} className="btn-primary flex items-center space-x-2">
          <FiPlus />
          <span>Add Car</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="card">
            {car.images?.[0] && (
              <img src={car.images[0].url} alt={car.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{car.brand}</p>
              <p className="text-xl font-bold text-primary-600 mb-4">${car.price?.toLocaleString()}</p>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(car)} className="btn-secondary flex-1 flex items-center justify-center space-x-1">
                  <FiEdit />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(car._id)} className="btn-danger flex-1 flex items-center justify-center space-x-1">
                  <FiTrash2 />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingCar ? 'Edit Car' : 'Add Car'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fuel Type</label>
                  <select value={formData.fuelType} onChange={(e) => setFormData({...formData, fuelType: e.target.value})} className="input-field">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Transmission</label>
                  <select value={formData.transmission} onChange={(e) => setFormData({...formData, transmission: e.target.value})} className="input-field">
                    <option>Manual</option>
                    <option>Automatic</option>
                    <option>CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mileage</label>
                  <input type="number" value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Engine</label>
                  <input type="text" value={formData.engine} onChange={(e) => setFormData({...formData, engine: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Body Type</label>
                  <select value={formData.bodyType} onChange={(e) => setFormData({...formData, bodyType: e.target.value})} className="input-field">
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Hatchback</option>
                    <option>Coupe</option>
                    <option>Convertible</option>
                    <option>Wagon</option>
                    <option>Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Availability</label>
                  <select value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} className="input-field">
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                    <option>Pre-Order</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="mr-2" />
                  <label className="text-sm font-medium">Featured</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field" rows="3" />
              </div>
              <div className="flex space-x-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingCar(null) }} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCars

