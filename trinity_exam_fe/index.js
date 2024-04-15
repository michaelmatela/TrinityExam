
var isUpdate = false;
var modal = document.getElementById("add_user_modal");
var btn = document.getElementById("add_user");
var span = document.getElementsByClassName("close")[0];
var user_id = -1;

btn.onclick = function() {
    isUpdate = false;
    modal.style.display = "block";
    const firstname = document.getElementById("add_first_name");
    const lastname = document.getElementById("add_last_name");
    const email = document.getElementById("email");
    const phonenumber = document.getElementById("add_phone_number");
    const address = document.getElementById("add_address");
    const image = document.getElementById("add_address");
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    phonenumber.value = "";
    address.value = "";
    user_id = -1;
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const form = document.getElementById("form");
const firstname = document.getElementById("add_first_name");
const lastname = document.getElementById("add_last_name");
const email = document.getElementById("email");
const phonenumber = document.getElementById("add_phone_number");
const address = document.getElementById("add_address");

form.addEventListener("submit", e => {
e.preventDefault();
var isValid = checkInputs();
if (isValid) {
    if(isUpdate) {
        save_user(firstname.value, lastname.value, email.value, phonenumber.value, address.value);
    } else {
        add_user(firstname.value, lastname.value, email.value, phonenumber.value, address.value);
    }
}
});

function checkInputs() {
    //Get the value the form field.
    const firstnameValue = firstname.value.trim(); 
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const phonenumberValue = phonenumber.value.trim(); 
    const addressValue = address.value.trim();
    var fnValid = false;
    var lnValid = false;
    var eValid = false;
    var pnValid = false;
    var aValid = false;

    if (firstnameValue === "") {
        setErrorInput(firstname, "First Name cannot be blank.");
    } else {
        fnValid = true;
        setSuccessInput(firstname);
    }

    if (lastnameValue === "") {
        setErrorInput(lastname, "First Name cannot be blank.");
    } else {
        lnValid = true;
        setSuccessInput(lastname);
    }

    if (emailValue === "") {
        setErrorInput(email, "Email cannot be blank.");
    } else {
        if (!validateEmail(emailValue)) {
            setErrorInput(email, "Invalid email address format.");
        } else {
            eValid = true;
            setSuccessInput(email);
        }
    }

    if (phonenumberValue === "") {
        setErrorInput(phonenumber, "Phone Number cannot be blank.");
    } else {
        pnValid = true;
        setSuccessInput(phonenumber);
    }

    if (addressValue === "") {
        setErrorInput(address, "Address cannot be blank.");
    } else {
        aValid = true;
        setSuccessInput(address);
    }

    return fnValid && lnValid && eValid && pnValid && aValid;
}
        
    function setErrorInput(input, errorMessage) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");

        small.innerText = errorMessage;
        formControl.className = "form__control error";
    }

    function setSuccessInput(input) {
        const formControl = input.parentElement;
        formControl.className = "form__control success";
    }

    function validateEmail(email) {
        let regular_expressions = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regular_expressions.test(String(email).toLocaleLowerCase());
    }


    function refresh() {
        fetch("http://127.0.0.1:8000/api/users", {
        method: 'get',
        headers: {
            'Authorization': 'Basic c2FtcGxlUHJvamVjdF9zYW1wbGVfT25seQ==',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then((response) => {
            return response.json()
        }).then((res) => {
            
            var table = document.getElementById("user_table");
            var tbody = document.getElementsByTagName('tbody')[0];
            tbody.parentNode.removeChild(tbody);
            
            tbody = document.createElement('tbody')
            for(var i=0; i != res.length; i++){
                const user = res[i];
                const imgsrc = 'http://127.0.0.1:8000' + user['filename'].replace('\\', '');
                const row = document.createElement("tr");
                const colaction = document.createElement("td");
                const colimage = document.createElement("td");
                const colfirstname = document.createElement("td");
                const collastname = document.createElement("td");
                const colemail = document.createElement("td");
                const colphonenumber = document.createElement("td");
                const coladdress = document.createElement("td");
                colaction.innerHTML = '<td data-label="Action"><button onClick="update_user('+user['id']+', \''+user['first_name']+'\', \''+user['last_name']+'\', \''+user['email']+'\', \''+user['phone_number']+'\', \''+user['address']+'\', \''+imgsrc+'\')">Edit</button><button style="background-color: red;" onClick="delete_user('+user['id']+', \''+user['first_name']+'\', \''+user['last_name']+'\')">Delete</button></td>';
                colimage.innerHTML = '<td data-label="Image"><img src="'+imgsrc+'"/></td>';
                colfirstname.innerHTML = '<td data-label="First Name">'+user['first_name']+'</td>';
                collastname.innerHTML = '<td data-label="Last Name">'+user['last_name']+'</td>';
                colemail.innerHTML = '<td data-label="Email">'+user['email']+'</td>';
                colphonenumber.innerHTML = '<td data-label="Phone Number">'+user['phone_number']+'</td>';
                coladdress.innerHTML = '<td data-label="Address">'+user['address']+'</td>';
                row.appendChild(colaction);
                row.appendChild(colimage);
                row.appendChild(colfirstname);
                row.appendChild(collastname);
                row.appendChild(colemail);
                row.appendChild(colphonenumber);
                row.appendChild(coladdress);
                tbody.appendChild(row);
            }
            table.appendChild(tbody); 
            
        }).catch((error) => {
        });
    }

    function update_user(id, fn, ln, e, pn, a, i) {
        modal.style.display = "block";
        isUpdate = true;
        user_id = id;
        const firstname = document.getElementById("add_first_name");
        const lastname = document.getElementById("add_last_name");
        const email = document.getElementById("email");
        const phonenumber = document.getElementById("add_phone_number");
        const address = document.getElementById("add_address");
        const image = document.getElementById("add_address");
        firstname.value = fn;
        lastname.value = ln;
        email.value = e;
        phonenumber.value = pn;
        address.value = a;
        image.src = i;
    }

    function delete_user(id, fn, ln){
        let text = "Are you sure you want to delete " + fn + " " + ln;
        if (confirm(text) == true) {
            fetch("http://127.0.0.1:8000/api/users/"+id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic c2FtcGxlUHJvamVjdF9zYW1wbGVfT25seQ=='
            }
        }).then((response) => {
            return response
        }).then((res) => {
            refresh();
        }).catch((error) => {
            console.log(error);
        })
        } 
    }

    function save_user(fn, ln, e, pn, a) {
        let postObj = { 
            first_name: fn, 
            last_name: ln, 
            email: e,
            phone_number: pn,
            address: a
        };

        let post = JSON.stringify(postObj)

        fetch("http://127.0.0.1:8000/api/users/"+user_id.toString(), {
        method: 'put',
        body: post,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic c2FtcGxlUHJvamVjdF9zYW1wbGVfT25seQ=='
        }
        }).then((response) => {
            return response.json()
        }).then((res) => {
            modal.style.display = "none";
            refresh();
            
        }).catch((error) => {
            modal.style.display = "none";
            alert(error);
        })
    }

    function add_user(fn, ln, e, pn, a) {
        let postObj = { 
            first_name: fn, 
            last_name: ln, 
            email: e,
            phone_number: pn,
            address: a
        };

        let post = JSON.stringify(postObj)

        fetch("http://127.0.0.1:8000/api/users", {
        method: 'post',
        body: post,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic c2FtcGxlUHJvamVjdF9zYW1wbGVfT25seQ=='
        }
        }).then((response) => {
            return response.json()
        }).then((res) => {
            modal.style.display = "none";
            refresh();
            
        }).catch((error) => {
            modal.style.display = "none";
            alert(error);
        })
    }

    refresh();