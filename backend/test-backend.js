// Quick test script to check if backend is running
import fetch from 'node-fetch';

const testBackend = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Backend is running!');
    console.log('Response:', data);
    
    // Test cars endpoint
    const carsResponse = await fetch('http://localhost:5000/api/cars/featured');
    const carsData = await carsResponse.json();
    console.log('\n✅ Cars endpoint working!');
    console.log('Featured cars count:', carsData.count);
    
    return true;
  } catch (error) {
    console.error('❌ Backend is NOT running or not accessible');
    console.error('Error:', error.message);
    console.log('\n💡 Make sure to run: cd backend && npm run dev');
    return false;
  }
};

testBackend();

