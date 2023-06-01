export async function fetchDeleteCart(productId: string | undefined) {
    try {
      const response = await fetch(`http://localhost:5000/api/carts/${productId}`, {
        method: 'PATCH',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }