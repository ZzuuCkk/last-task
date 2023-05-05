function renderUsers(usersArray) {
     const tableBody = document.querySelector("#table-body");
        tableBody.innerHTML = "";
    
        usersArray.forEach((user) => {
          const tr = document.createElement("tr");
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
      

	console.log(usersArray);
	userActions();
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
}

}
function getAllUsers() {
    fetch("https://borjomi.loremipsum.ge/api/all-users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.users);
        renderUsers(data.users);
      })
      .catch((err) => console.log(err));
  }
  
  function renderUsers(usersArray) {
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";
  
    usersArray.forEach((user) => {
      const tr = document.createElement("tr");
      tr.dataset.userId = user.id;
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
  
function getUser(id) {
	fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
		method: "get",
	})
		.then((res) => res.json())
		.then((data) => {
			// გვიბრუნებს იუზერის ობიექტს
			console.log(data);
			//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUser(userObj) {


}

getAllUsers();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		id: user_id.value, 
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};


});