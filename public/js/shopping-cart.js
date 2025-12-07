function increaseCartCount(productPrice) {
  const countElement = document.querySelector("#items-in-shopping-cart-badge");
  const currentCount = Number(countElement.dataset.value);
  const newCount = currentCount + 1;
  countElement.dataset.value = newCount;

  const totalPriceElement = document.querySelector("#total-price");
  if (totalPriceElement !== null) {
    const currentTotalPrice = Number(totalPriceElement.innerHTML);
    const newTotalPrice = (currentTotalPrice + productPrice).toFixed(2);
    totalPriceElement.innerHTML = newTotalPrice;
  }
}

function decreaseCartCount(productPrice) {
  const countElement = document.querySelector("#items-in-shopping-cart-badge");
  const currentCount = Number(countElement.dataset.value);
  const newCount = currentCount - 1;
  countElement.dataset.value = newCount;

  const totalPriceElement = document.querySelector("#total-price");
  if (totalPriceElement !== null) {
    const currentTotalPrice = Number(totalPriceElement.innerHTML);
    const newTotalPrice = (currentTotalPrice - productPrice).toFixed(2);
    totalPriceElement.innerHTML = newTotalPrice;
  }
}

async function addToShoppingCart(productId, price) {
  try {
    const response = await fetch(
      "/shopping-cart-product/add-product-to-shopping-cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error("Error Response: " + error);
    }
    increaseCartCount(price);
  } catch (error) {
    console.error("Caught an error:", error);
  }
}

async function removeProductFromShoppingCart(productId, price) {
  try {
    const response = await fetch(
      "/shopping-cart-product/remove-shopping-cart-product",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error("Error Response: " + error);
    }
    decreaseCartCount(price);
    return true;
  } catch (error) {
    console.error("Caught an error:", error);
    return false;
  }
}

const addToShoppingCartButtons = document.querySelectorAll(
  ".add-to-shopping-cart"
);
const removeButtons = document.querySelectorAll(".remove-from-shopping-cart");

addToShoppingCartButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = button.dataset.productId;
    const price = Number(button.dataset.price);
    await addToShoppingCart(productId, price);
  });
});

removeButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = button.dataset.productId;
    const price = Number(button.dataset.price);
    const success = await removeProductFromShoppingCart(productId, price);
    if (success) {
      const productContainer = button.closest(
        ".shopping-cart-product-container"
      );
      productContainer.remove();
      const allProductContainers = document.querySelectorAll(
        ".shopping-cart-product-container"
      );
      if (allProductContainers.length === 0) {
        const noProductsMessage = document.querySelector(
          "#no-products-message"
        );
        noProductsMessage.classList.remove("hidden");
      }
    }
  });
});
