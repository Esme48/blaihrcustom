import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit, deleteItem } from "./addEdit.js";

let itemsDiv = null;
let itemsTable = null;
let itemsTableHeader = null;

export const handleItems = () => {
  itemsDiv = document.getElementById("items");
  const logoff = document.getElementById("logoff");
  const addItem = document.getElementById("add-item");
  itemsTable = document.getElementById("items-table");
  itemsTableHeader = document.getElementById("items-table-header");

  itemsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addItem) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged out.";
        itemsTable.replaceChildren([itemsTableHeader]);
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        deleteItem(e.target.dataset.id);
      }
    }
  });
};

export const showItems = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/component", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [itemsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        console.log("itemsTableHeader:", itemsTableHeader);
        console.log("children:", children);
        console.log("itemsTable:", itemsTable);
        itemsTable.replaceChildren(...children);
      } else {
          //Added Filtering Component
        const filterComp = {
          "Order Not Yet Placed": 1,
          "Order Has Been Placed And Is Being Arranged": 2,
          "Bouquet Delivered": 3,
        } ///Object thatt has the status types in numerical order priority
        data.components.sort((a, b) => {
          return (filterComp[a.status] || 5) - (filterComp[b.status] || 5);
        })
          //Sorts numerical values for value 'a' and 'b' that are in status based on priority value filterComp.
          //Whatever numerical value it bets for a and b it subtracts (a-b), and then sort method is used to sort in ascending order
          //Defaults to number 5 if it cannot find any value for status

          for (let i = 0; i < data.components.length; i++) {
          //let comp = data.components[i]
          let rowEntry = document.createElement("tr");
          let formattedDate = new Date(data.components[i].date).toLocaleDateString();

          let editButton = `<button type="button" class="editButton" data-id="${data.components[i]._id}">edit</button>`;
          let deleteButton = `<button type="button" class="deleteButton" data-id="${data.components[i]._id}">delete</button>`;

          if (data.components[i].status === 'Bouquet Delivered' || data.components[i].status === 'Order Has Been Placed And Is Being Arranged') {
            editButton = `<button type="button" disabled class="editButton" data-id="${data.components[i]._id}">edit</button>`;
            deleteButton = `<button type="button" disabled class="deleteButton" data-id="${data.components[i]._id}">delete</button>`;
          }
          //Added the component to disable the edit and delete buttons when given a specific status. Also fixed a few bugs with comp = data.components[i] and formmated Date.
          let rowHTML = `
            <td>${data.components[i].item}</td>
            <td>${data.components[i].group}</td>
            <td>${data.components[i].donation}</td>
            <td>${data.components[i].quantity}</td>
            <td>${formattedDate}</td>
            <td>${data.components[i].status}</td>
            <td>${editButton}</td>
            <td>${deleteButton}</td>
          `;
          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        itemsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }

  enableInput(true);
  setDiv(itemsDiv);
};