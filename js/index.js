let emailInput = document.getElementById("email-input")
let errorMsg = document.getElementById("error-msg")
let submitBtn = document.getElementById("submit")
let successMessage = document.getElementById("success")
let NosuccessMessage = document.getElementById("no-success")

emailInput.addEventListener("input", function(){
    if (emailInput.validity.valid){
        errorMsg.classList.add("hidden"); //  remove error message
        emailInput.classList.remove("border-red-500", "focus:ring-red-500");
        emailInput.classList.add("border-green-500", "focus:ring-green-500");
        submitBtn.removeAttribute("disabled");
    }else{
        emailError()
    }
});
function emailError() {
    if (emailInput.validity.valueMissing) {
        errorMsg.classList.remove("hidden"); 
        errorMsg.textContent = "Email address is required"
        emailInput.classList.add("border-red-500", "focus:ring-red-500");
        emailInput.classList.remove("border-green-500", "focus:ring-green-500");
    }
    else if (emailInput.validity.typeMismatch) {
        errorMsg.classList.remove("hidden"); 
        errorMsg.textContent = "Please enter a valid Email address"
        emailInput.classList.add("border-red-500", "focus:ring-red-500");
        emailInput.classList.remove("border-green-500", "focus:ring-green-500");
    }
}
submitBtn.addEventListener("click", function(event) {
    
});
// API submission using fetch()
submitBtn.addEventListener("click", async function (event) {
    console.log("clicked")
    if (!emailInput.validity.valid){
        emailError();
        event.preventDefault();
    }
    const email = emailInput.value;
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (response.ok) {
            successMessage.classList.remove("hidden");
            NosuccessMessage.classList.add("hidden");
            emailInput.value = ""; // Clear input field
           
        } else {
            NosuccessMessage.classList.remove("hidden");
            successMessage.classList.add("hidden");
            emailInput.value = ""; // Clear input field
        }
    } catch (error) {
        NosuccessMessage.classList.remove("hidden");
    }
})
emailInput.addEventListener("input", function () {
    NosuccessMessage.classList.add("hidden");
    successMessage.classList.add("hidden");
});
