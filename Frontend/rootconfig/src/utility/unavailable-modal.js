export const bootstrap = () => Promise.resolve();

export const mount = (props) => {
  const { appName } = props;

  // Create backdrop
  const backdrop = document.createElement("div");
  backdrop.id = "service-unavailable-backdrop";
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
  `;
  document.body.appendChild(backdrop);

  // Create modal
  const modal = document.createElement("div");
  modal.id = "service-unavailable-modal";
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    max-width: 90%;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    z-index: 9999;
    font-family: Arial, sans-serif;
    text-align: center;
  `;

  // Add modal content
  modal.innerHTML = `
    <h2 style="margin-bottom: 20px;">Service Unavailable</h2>
    <p style="margin-bottom: 20px;">The <strong>${appName}</strong> service is temporarily unavailable. Please try again later.</p>
    <button id="modal-close-button" style="
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;">Close</button>
  `;

  // Append modal to body
  document.body.appendChild(modal);

  // Close button logic
  document.getElementById("modal-close-button").onclick = () => {
    unmount();
  };

  return Promise.resolve();
};

export const unmount = () => {
  // Remove modal and backdrop
  const modal = document.getElementById("service-unavailable-modal");
  const backdrop = document.getElementById("service-unavailable-backdrop");
  if (modal) document.body.removeChild(modal);
  if (backdrop) document.body.removeChild(backdrop);

  return Promise.resolve();
};
