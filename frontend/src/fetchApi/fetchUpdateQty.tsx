export async function fetchUpdateQty(productId: string | undefined, qty: number) {
    try {
      // Send the request to the backend
      const response = await fetch(`${process.env.REACT_APP_API_URI}/api/products/update-cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          qty,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
  