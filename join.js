const joinUs = document.getElementById('join-us');
const dropdown = document.getElementById('dropdown-menu');
const arrow = document.getElementById('arrow');

joinUs.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('show');
    arrow.innerHTML = isOpen ? '&#x25B2;' : '&#x25BC;';
});

document.addEventListener('click', (e) => {
    if (!joinUs.contains(e.target)) {
        dropdown.classList.remove('show');
        arrow.innerHTML = '&#x25BC;';
    }
});

document.getElementById("collabForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Create structured email content
    const emailContent = `
    College/Institution Name: ${formData.get("college")}
    Club Name: ${formData.get("club")}
    Contact Person Name: ${formData.get("contactName")}
    Contact Person Email: ${formData.get("contactEmail")}
    Contact Person Phone: ${formData.get("contactPhone")}
    Type of Collaboration: ${formData.get("collabType")}
    Past Events/Experience: ${formData.get("pastEvents")}
  `;

    // Construct email payload (assuming backend handles email sending)
    const emailFormData = new FormData();
    emailFormData.append("subject", "New Campus Collaboration Submission");
    emailFormData.append("body", emailContent);
    emailFormData.append("to", "communications@ingeniumconsultancy.com"); // Change to your recipient email

    // Attach file if provided
    const fileInput = formData.get("proposalUpload");
    if (fileInput && fileInput.size > 0) {
        emailFormData.append("attachment", fileInput);
    }

    try {
        const response = await fetch("/send-email", {
            method: "POST",
            body: emailFormData
        });

        if (response.ok) {
            alert("Form submitted and email sent successfully!");
            form.reset();
        } else {
            alert("There was an error sending the email.");
        }
    } catch (error) {
        console.error("Email submission error:", error);
        alert("An error occurred while submitting the form.");
    }
});