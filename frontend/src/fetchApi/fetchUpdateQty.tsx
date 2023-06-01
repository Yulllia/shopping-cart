export async function fetchUpdateQty(productId: string | undefined, qty: number) {
    try {
      // Send the request to the backend
      const response = await fetch("http://localhost:5000/api/products/update-cart", {
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
  