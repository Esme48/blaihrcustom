import {
  enableInput,
  inputEnabled,
  message,
  setDiv,
  token,
} from "./index.js";
import { showItems } from "./component.js";

let addEditDiv = null;
let item = null;
let group = null;
let status = null;
let addingItem = null;
let messageBox = null;
let donation = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-item");
  item = document.getElementById("item");
  group = document.getElementById("group");
  messageBox = document.getElementById("messageBox");
  donation = document.getElementById("donation");
  status = document.getElementById("status");
  addingItem = document.getElementById("adding-item");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingItem) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/component";

        if (addingItem.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/component/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              item: item.value,
              group: group.value,
              messageBox: messageBox.value,
              donation: donation.value,
              status: status.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              message.textContent = "Your Order Was Updated.";
            } else {
              message.textContent = "Your Order Was Placed.";
            }

            item.value = "";
            group.value = "";
            messageBox.value = "";
            donation.value = "";
            status.value = "Order Not Yet Placed";
            showItems();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showItems();
      }
    }
  });
};

export const showAddEdit = async (compId) => {
  if (!compId) {
    item.value = "";
    group.value = "";
    status.value = "Order Not Yet Placed";
    addingItem.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/component/${compId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        item.value = data.comp.item;
        group.value = data.comp.group;
        messageBox.value = data.comp.messageBox;
        donation.value = data.comp.donation;
        status.value = data.comp.status;
        addingItem.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = compId;

        setDiv(addEditDiv);
      } else {
        message.textContent = "This Order Was Not Found";
        showItems();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showItems();
    }

    enableInput(true);
  }
};

export const deleteItem = async (compId) => {
  try {
    enableInput(false);
    const response = await fetch(`/api/v1/component/${compId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      message.textContent = data.msg;
      showItems();
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }

  enableInput(true);
};