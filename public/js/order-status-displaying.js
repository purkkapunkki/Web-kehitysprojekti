const orderStatusElement = document.querySelectorAll(".order-status-text");
orderStatusElement.forEach((statusElement) => {
  const allDisplayStatuses = {
    pending: "Odottaa käsittelyä",
    "in-progress": "Käsittelyssä",
    complete: "Valmis",
  };
  const rawStatus = statusElement.dataset.rawStatus;
  const displayStatus = allDisplayStatuses[rawStatus];
  statusElement.innerHTML = displayStatus;
});
