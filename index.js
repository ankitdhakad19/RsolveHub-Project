fetch("http://127.0.0.1:3000/stats")
    .then(res => res.json())
    .then(data => {

        document.getElementById("Total").innerText = data.total;
        document.getElementById("pending").innerText = data.pending;
        document.getElementById("resolved").innerText = data.resolved;

    });