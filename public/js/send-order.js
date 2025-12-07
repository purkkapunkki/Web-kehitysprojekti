function sendOrder(event) {
  event.preventDefault();
  fetch("/order/send-order", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((error) => {
          throw new Error("Error Response: " + error);
        });
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      window.location.replace("/order/order-thank-you");
    })
    .catch((error) => console.error(error));
}

const sendOrderButton = document.querySelector("#send-order");
sendOrderButton.addEventListener("click", sendOrder);
