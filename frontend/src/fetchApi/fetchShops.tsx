export async function fetchShops() {
    try {
      const response = await fetch(`http://localhost:5000/api/products/shops`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }