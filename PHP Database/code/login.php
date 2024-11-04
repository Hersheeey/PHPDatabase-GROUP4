<?php
session_start(); // Start the session

// Initialize variables
$email = "";
$password = "";
$error = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    
    // Dummy credentials for demonstration
    $dummyEmail = "user@example.com";
    $dummyPassword = "password123";

    // Check credentials (this is just a dummy check, replace with your database logic)
    if ($email === $dummyEmail && $password === $dummyPassword) {
        $_SESSION['user'] = $email; // Store user in session

        // Set a cookie for 'Remember Me' functionality (optional)
        if (isset($_POST['remember_me'])) {
            setcookie('user_email', $email, time() + (86400 * 30), "/"); // 30 days
        }

        header("Location: index.html"); // Redirect to index page
        exit();
    } else {
        $error = "Invalid email or password.";
    }
}

// Check for cookie
if (isset($_COOKIE['user_email'])) {
    $email = $_COOKIE['user_email']; // Pre-fill email input if cookie exists
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Caffeine Kick</title>
    <style>

form {
    width: 300px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

form h2 {
    color: #d35400;
    text-align: center;
}

form input[type="text"],
form input[type="password"] {
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

form button {
    width: 100%;
    padding: 10px;
    background-color: #6e2c00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

form p {
    text-align: center;
    color: gray;
    font-size: 14px;
}

form p a {
    color: #d35400;
    text-decoration: none;
}

    body {
        font-family: Arial, sans-serif;
        background-color: #fdf3e7;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        }

    .login-container {
        width: 360px;
        padding: 20px;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        text-align: center;
    }

    .login-container h2 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #cd7f32;
    }

    .inputBox {
        display: flex; /* Use flexbox for alignment */
        align-items: center; /* Center items vertically */
        justify-content: center; /* Center items horizontally */
        position: relative;
        margin-bottom: 20px;
    }

    .inputBox input {
        width: 50%;
        padding: 12px 40px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .inputBox .fas {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #888;
    }

    .btn {
        width: 100%;
        padding: 12px;
        background-color: rgb(110, 38, 14);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
    }

    .btn:hover {
        background-color: rgb(136, 39, 7);
    }

    .login-container p {
        margin-top: 20px;
        color: #666;
    }

    .login-container a {
        color: #cd7f32;
        text-decoration: none;
    }

    .login-container a:hover {
        text-decoration: underline;
    }
</style>
<link rel="icon" href="logo.jpg" type="image/x-icon">
    </style>
    <link rel="icon" href="logo.jpg" type="image/x-icon">
</head>
<body>
    <div class="login-container">
        <h2>Login to Caffeine Kick</h2>
        
        <?php if ($error): ?>
            <p style="color: red;"><?php echo $error; ?></p>
        <?php endif; ?>

        <form id="loginForm" method="POST" action="">
    <div class="inputBox">
        <span class="fas fa-user"></span>
        <input type="text" name="email" placeholder="Email or Username" value="<?php echo htmlspecialchars($email); ?>" required>
    </div>
    <div class="inputBox">
        <span class="fas fa-lock"></span>
        <input type="password" name="password" placeholder="Password" required>
    </div>
    <div class="inputBox">
        <input type="checkbox" name="remember_me" id="remember_me">
        <label for="remember_me">Remember Me</label>
    </div>
    <input type="submit" value="Login" class="btn">
</form>
        <p>Don't have an account? <a href="signup.html">Sign up</a></p>
        <p><a href="#">Forgot Password?</a></p>
    </div>

    <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission
            window.location.href = "index.html"; // Redirect to the index page
        });
    </script>
</body>
</html>