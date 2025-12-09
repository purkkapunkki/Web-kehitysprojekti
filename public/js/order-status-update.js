function setInitialStatus(orderStatusField) {
  const currentStatus = orderStatusField.dataset.currentStatus;
  orderStatusField.value = currentStatus;
}

async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch("/order/update-order-status", {
      method: "POST",
      body: JSON.stringify({ orderId, status }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error("Error Response: " + error);
    }
  } catch (error) {
    console.error("Caught an error:", error);
  }
}

const orderStatusFields = document.querySelectorAll(".order-status");
const orderTable = document.querySelector("#order-table");

orderStatusFields.forEach(setInitialStatus);

orderTable.addEventListener("change", (event) => {
  const target = event.target;
  if (!target.classList.contains("order-status")) {
    return;
  }
  const orderId = Number(target.dataset.orderId);
  const status = target.value;
  updateOrderStatus(orderId, status);
});
