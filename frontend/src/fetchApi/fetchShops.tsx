export async function fetchShops() {
    try {
      const response = await fetch(`/api/products/shops`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }