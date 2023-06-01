export async function fetchProducts(name:string) {
    try {
      const response = await fetch(`/api/products/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }