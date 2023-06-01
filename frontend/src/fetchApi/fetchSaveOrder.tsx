import { Order } from "../interfaces/interfaces";

export async function fetchSaveOrder(order:Order) {
    try {
      // Send the request to the backend
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
  