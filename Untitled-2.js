const passwordInput = document.getElementById("password");
const checkPasswordButton = document.getElementById("check-password-btn");
const passwordStrengthMeter = document.getElementById("password-strength-meter");
const passwordStrengthText = document.getElementById("password-strength-text");

const weakPasswordSuggestions = ["Add numbers to your password", "Add uppercase letters to your password", "Add special characters to your password"];

const strongPasswordSuggestions = ["Use a combination of uppercase and lowercase letters", "Include numbers and special characters in your password", "Use a passphrase instead of a password"];

function getPasswordStrength(password) {
  const passwordLength = password.length;

  if (passwordLength < 8) {
    return { strength: "weak", suggestions: weakPasswordSuggestions };
  }

  let hasLowerCase = false;
  let hasUpperCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  for (let i = 0; i < passwordLength; i++) {
    const char = password.charAt(i);

    if (!hasLowerCase && /[a-z]/.test(char)) {
      hasLowerCase = true;
    } else if (!hasUpperCase && /[A-Z]/.test(char)) {
      hasUpperCase = true;
    } else if (!hasNumber && /\d/.test(char)) {
      hasNumber = true;
    } else if (!hasSpecialChar && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(char)) {
      hasSpecialChar = true;
    }
  }

  if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar) {
    return { strength: "strong" };
  }

  if ((hasLowerCase || hasUpperCase) && hasNumber && passwordLength >= 12) {
    return { strength: "strong" };
  }

  return { strength: "medium", suggestions: strongPasswordSuggestions };
}

function updatePasswordStrengthMeter(strength) {
  passwordStrengthMeter.className = "";
  passwordStrengthMeter.classList.add("password-strength-" + strength);
}

function showPasswordStrengthText(strength, suggestions) {
  if (strength === "weak" || strength === "medium") {
    passwordStrengthText.textContent = "Password strength: " + strength.charAt(0).toUpperCase() + strength.slice(1);
    
    if (suggestions) {
      passwordStrengthText.textContent += ". Suggestions: " + suggestions.join(", ");
    }
  } else {
    passwordStrengthText.textContent = "Password strength: " + strength.charAt(0).toUpperCase() + strength.slice(1);
  }
}

checkPasswordButton.addEventListener("click", function() {
  const password = passwordInput.value;
  const passwordStrength = getPasswordStrength(password);

  updatePasswordStrengthMeter(passwordStrength.strength);
  showPasswordStrengthText(passwordStrength.strength, passwordStrength.suggestions);
});