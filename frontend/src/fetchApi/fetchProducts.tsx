export async function fetchProducts(name:string) {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }