$(document).ready(function () {
    // Hide all error messages initially
    $(".error").hide();

    // Validate on form submit
    $("#registrationForm").submit(function (event) {
        // Prevent form submission
        event.preventDefault();
        
        // Initialize error status
        let hasError = false;

        // Username validation
        let username = $("#username").val().trim();
        if (username === "") {
            $("#usernameError").show();
            hasError = true;
        } else {
            $("#usernameError").hide();
        }

        // Email validation
        let email = $("#email").val().trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "" || !emailPattern.test(email)) {
            $("#emailError").show();
            hasError = true;
        } else {
            $("#emailError").hide();
        }

        // Password validation
        let password = $("#password").val().trim();
        if (password === "") {
            $("#passwordError").show();
            hasError = true;
        } else {
            $("#passwordError").hide();
        }

        // Confirm password validation
        let confirmPassword = $("#confirmPassword").val().trim();
        if (confirmPassword === "" || confirmPassword !== password) {
            $("#confirmPasswordError").show();
            hasError = true;
        } else {
            $("#confirmPasswordError").hide();
        }

        // If no error, submit form (for demonstration we show an alert)
        if (!hasError) {
            alert("Form submitted successfully!");
            // Here you would normally submit the form
            // $("#registrationForm")[0].submit();
        }
    });
});
