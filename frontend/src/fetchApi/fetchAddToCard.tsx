export async function fetchAddToCard(productId: string | undefined) {
  try {
    // Send the request to the backend
    const response = await fetch(`/api/products/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId, // Pass the product ID
        addedCart: true, // Set the addedCart field to true
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
