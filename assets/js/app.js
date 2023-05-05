const openRegModal = document.querySelector(".open-reg-modal");

function showModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    const closeBtn = modal.querySelector(".close-btn");

    modal.classList.add("active");
    closeBtn.addEventListener("click", (e) => {
      modal.classList.remove("active");
    });
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("active");
      }
    });
  }
}

openRegModal.addEventListener("click", () => {
  showModal("#reg-form-modal");
});

const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector("#register-user"),
  userName = document.querySelector("#user_name"),
  userLastName = document.querySelector("#user_surname"),
  userMobile = document.querySelector("#user_phone"),
  userPersonalId = document.querySelector("#user_personal-id"),
  userEmail = document.querySelector("#user_email"),
  userZipCode = document.querySelector("#user_zip-code"),
  user_id = document.querySelector("#user_id");
let userGender = document.querySelector("[name='gender']");

const createUserUrl = "https://borjomi.loremipsum.ge/api/register",
  getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users",
  getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ",
  updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", 
  deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1";

function addNewUser(userObj) {
  fetch(createUserUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.status === 1) {
        getAllUsers();
        form.reset();
        closeBtn.click();
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error adding new user. Please try again.");
    });
    let userGender = document.querySelector("[name='gender']:checked").value;
}

async function deleteUser(id) {
  try {
    const res = await fetch(
      `https://borjomi.loremipsum.ge/api/delete-user/${id}`,
      {
        method: "delete",
      }
    );

    const data = await res.json();
    console.log(data);
    if (data.status == 1) {
      getAllUsers();
    }
  } catch (error) {
    console.log(error);
  }
}

function renderUsers(usersArray) {
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = "";

  usersArray.forEach((user) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-user-id", user.id);
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.phone}</td>
      <td>${user.id_number}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.zip_code}</td>
      <td>
        <button class="edit-btn" data-user-id="${user.id}">Edit</button>
        <button class="delete-btn" data-user-id="${user.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  userActions();
}

function getAllUsers() {
  fetch(getAllUsersUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.users);
      renderUsers(data.users);
    })
    .catch((err) => console.log(err));
}

function userActions() {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = e.target.dataset.userId;
      deleteUser(userId);
    });
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = e.target.dataset.userId;
      getUser(userId);
    });
  });
}
function deleteUser(id) {
    fetch(`https://borjomi.loremipsum.ge/api/delete-user/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userRow = document.querySelector(`tr[data-user-id="${id}"]`);
        userRow.remove();
      })
      .catch((err) => console.log(err));
  }
  
  function getUser(id) {
    fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userObj = data.user;
        user_id.value = userObj.id;
        userName.value = userObj.first_name;
        userLastName.value = userObj.last_name;
        userMobile.value = userObj.phone;
        userPersonalId.value = userObj.id_number;
        userEmail.value = userObj.email;
        document.querySelector(`[value="${userObj.gender}"]`).checked = true;
        userZipCode.value = userObj.zip_code;
        document.querySelector("#registration-modal").classList.add("show");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function updateUser(userObj) {
    fetch(`https://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userRow = document.querySelector(`tr[data-user-id="${userObj.id}"]`);
        userRow.innerHTML = `
          <td>${userObj.id}</td>
          <td>${userObj.first_name}</td>
          <td>${userObj.last_name}</td>
          <td>${userObj.phone}</td>
          <td>${userObj.id_number}</td>
          <td>${userObj.email}</td>
          <td>${userObj.gender}</td>
          <td>${userObj.zip_code}</td>
          <td>
            <button class="edit-btn" data-user-id="${userObj.id}">Edit</button>
            <button class="delete-btn" data-user-id="${userObj.id}">Delete</button>
          </td>
        `;
      })
      .catch((err) => console.log(err));
  }
  
  function clearForm() {
    user_id.value = "";
    userName.value = "";
  }
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userObj = {
      first_name: userName.value,
      last_name: userLastName.value,
      phone: userMobile.value,
      id_number: userPersonalId.value,
      email: userEmail.value,
      gender: userGender.value,
      zip_code: userZipCode.value,
    };
    addNewUser(userObj);
  });