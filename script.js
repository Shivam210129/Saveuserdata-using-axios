function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios.get("https://crudcrud.com/api/f4bf52fddbb048ddb13514c505b609aa/appointmentData",userDetails)
        .then((response) =>{
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
            })
    
        .catch ((error) => {
            console.log(error)
    })
  axios
    .post(
      "https://crudcrud.com/api/f4bf52fddbb048ddb13514c505b609aa/appointmentData",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));
    axios
    .delete("https://crudcrud.com/api/f4bf52fddbb048ddb13514c505b609aa/appointmentData/698788c79a4cac03e8a335a8",
        userDetails
    )
    .then((response) => {
      console.log(response)
    .catch((error) => console.log(error));
   });
   axios
    .post(
      "https://crudcrud.com/api/f4bf52fddbb048ddb13514c505b609aa/appointmentData",
      userDetails
    )
    .then((response) => {
      showUserOnScreen(response.data);
    })
    .catch((err) => console.log(err));


    axios
        .post("https://crudcrud.com/api/KEY/appointmentData", userDetails)
        .then((response) => {
            showUserOnScreen(response.data)
        })
        .catch((error) => 
            console.log(error)
        )

  
}
function editUser(userId, username, email, phone) {
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    axios
        .delete(`https://crudcrud.com/api/KEY/appointmentData/${userId}`)
        .then(() => {
            removeUserFromScreen(userId);

        })
        .catch((error) => {
            console.log(error);
        })
}



  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";


function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(userDetails.email);
  });

  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(userDetails.email);
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
  });
}

// Do not touch code below
module.exports = handleFormSubmit;
