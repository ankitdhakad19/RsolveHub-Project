
// Sidebar Active Menu
const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

// Search Complaint
const searchBox = document.querySelector(".top input");
const rows = document.querySelectorAll("tbody tr");

searchBox.addEventListener("keyup", function () {
    
    const value = this.value.toLowerCase();
    
    rows.forEach(row => {
        
        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";
        
    });
    
});



// Notification Bell
const bell = document.querySelector(".fa-bell");

bell.addEventListener("click", () => {
    
    alert("No new notifications.");
    
});

// Logout
const logout = document.querySelector(".fa-right-from-bracket");

logout.addEventListener("click", () => {
    
    const confirmLogout = confirm("Do you really want to logout?");
    
    if (confirmLogout) {
        
        window.location.href = "login.html";
        
    }
    
});

// Dashboard Card Animation
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    
    card.addEventListener("mouseenter", () => {
        
        card.style.transform = "translateY(-8px)";
        card.style.transition = ".3s";
        
    });
    
    card.addEventListener("mouseleave", () => {
        
        card.style.transform = "translateY(0px)";
        
    });
    
});

const details = document.querySelector(".details")
async function viweComplain(id) {
    
    try {
        const complaint = await fetch(`http://127.0.0.1:3000/complain/${id}`)
        const NewComplain = await complaint.json();
        // console.log(NewComplain);
        renderOneComplain(NewComplain)
    }
    catch (err) {
        console.log(err);
    }
    
}

const complaintList = document.querySelector(".complaintList")
function loadComplain() {

    fetch("http://127.0.0.1:3000/complain/recent")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            complain = data;
            renderComplain();
            // console.log(complain);
        })
        .catch((err) => {
            console.log(err);
        })

}

function renderComplain() {
    complaintList.innerHTML = ""
    complain.forEach((comp) => {
        complaintList.innerHTML += `
         <tr>

            <td>CMP001</td>

            <td>Ankit</td>

            <td>${comp.complaintCategory}</td>

            <td>${comp.date}</td>

            <td><span class="pending">${comp.status}</span></td>

            <td><button onclick="viweComplain('${comp._id}')" >View</button></td>

        </tr>`
    })

}

function renderOneComplain(NewComplain) {
    details.innerHTML = `
            <h2>Complaint Details</h2>

            <p><strong>ID :</strong> CMP001</p>

            <p><strong>Citizen :</strong> Ankit Dhakad</p>

            <p><strong>Category :</strong>${NewComplain.complaintCategory} </p>


            <p><strong>Description :</strong> ${NewComplain.Description}.</p>

            <label>Status</label>

            <select class="status">

                <option>Pending</option>

                <option>In Progress</option>

                <option>Resolved</option>

            </select>

            <br><br>

            <button onclick="updateStatus('${NewComplain._id}')" >Update Status</button>
            `
}




async function updateStatus(id) {
    try {
        const status = document.querySelector(".status");
        console.log(status)
        const res = await fetch(`http://127.0.0.1:3000/complain/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status.value
            })
        });


        const data = await res.json();

        console.log("Updated:", data);

        loadComplain();
        if(data)
        {
            alert("updated")
        }
    } catch (err) {
        console.log(err);
    }
}

loadComplain();

