export async function fetchCarts() {
    try {
      const response = await fetch(`/api/carts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }