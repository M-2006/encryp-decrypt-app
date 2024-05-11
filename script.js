// Caesar cipher encryption function
function caesarEncrypt(text, shift) {
    return text
        .split('')
        .map(char => {
            if (char.match(/[a-z0-9!$%&/:;<>+\-*]/i)) { // Include the new format
                let code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
                } else if (code >= 48 && code <= 57) { // Numbers 0-9
                    return String.fromCharCode(((code - 48 + shift) % 10) + 48);
                } else if (code >= 33 && code <= 47) { // Special characters !$%&/:;<>+-*
                    return String.fromCharCode(((code - 33 + shift) % 15) + 33);
                }
            }
            return char;
        })
        .join('');
}

// Caesar cipher decryption function
function caesarDecrypt(text, shift) {
    return text
        .split('')
        .map(char => {
            if (char.match(/[a-z0-9!$%&/:;<>+\-*]/i)) { // Include the new format
                let code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
                } else if (code >= 48 && code <= 57) { // Numbers 0-9
                    return String.fromCharCode(((code - 48 - shift + 10) % 10) + 48);
                } else if (code >= 33 && code <= 47) { // Special characters !$%&/:;<>+-*
                    return String.fromCharCode(((code - 33 - shift + 15) % 15) + 33);
                }
            }
            return char;
        })
        .join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const decryptButton = document.getElementById('decryptButton');
    const decryptedOutput = document.getElementById('decryptedOutput');
    const decryptedTextContainer = document.getElementById('decryptedText');

    document.getElementById('encryptButton').addEventListener('click', function() {
        const inputText = document.getElementById('textInput').value;
        const encryptedText = caesarEncrypt(inputText, 3); // Encrypt with a shift of 3
        document.getElementById('encryptedOutput').value = encryptedText;
        document.getElementById('encryptedText').style.display = 'block';
        decryptedTextContainer.style.display = 'none'; // Hide decrypted text field
        decryptButton.style.display = 'block'; // Show decrypt button
    });

    decryptButton.addEventListener('click', function() {
        const encryptedText = document.getElementById('encryptedOutput').value;
        const decryptedText = caesarDecrypt(encryptedText, 3); // Decrypt with a shift of 3
        decryptedOutput.value = decryptedText;
        decryptedTextContainer.style.display = 'block'; // Show decrypted text field
    });

    // Show decrypt button initially
    decryptButton.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('encryptForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        const inputText = document.getElementById('textInput').value;
        const fileFormat = document.getElementById('fileFormat').value;

        // Encrypt the text
        const encryptedText = caesarEncrypt(inputText, 3); // Encrypt with a shift of 3

        // Create a blob with the encrypted text
        let blob;
        if (fileFormat === 'json') {
            const json = JSON.stringify({ encryptedText }); // Encapsulate the encrypted text in a JSON object
            blob = new Blob([json], { type: 'application/json' }); // Use application/json type for JSON files
        } else {
            blob = new Blob([encryptedText], { type: 'text/plain' }); // Use text/plain for other file formats
        }

        // Create a download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `encrypted_file.${fileFormat}`;
        a.click();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('decryptForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        const fileInput = document.getElementById('encryptedFile');
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const encryptedText = event.target.result;
            const decryptedText = caesarDecrypt(encryptedText, 3); // Decrypt with a shift of 3
            document.getElementById('decryptedOutput').value = decryptedText;
            document.getElementById('decryptedText').style.display = 'block'; // Show decrypted text field

            // Create a blob with the decrypted text
            const blob = new Blob([decryptedText], { type: 'text/plain' });

            // Create a download link
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `decrypted_file.txt`;
            a.click();

            // Clean up the URL.createObjectURL() after download link is clicked
            URL.revokeObjectURL(a.href);
        };
        reader.readAsText(file);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const navbar = document.querySelector('.navbar');

    // Check if dark mode is enabled in local storage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeSwitch.checked = true;
    }

    // Toggle dark mode
    darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        navbar.classList.add('navbar-dark-mode');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        navbar.classList.remove('navbar-dark-mode');
    }
});


