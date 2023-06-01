export async function fetchCarts() {
    try {
      const response = await fetch(`http://localhost:5000/api/carts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }