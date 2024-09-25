// Function to format numbers with commas and two decimal places
function formatNumber(value) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Function to calculate the labor cost
function calculateLabor(event) {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page

    // Get the values from the form
    const driveTime = parseFloat(document.getElementById('driveTime').value) || 0;
    const supplyHouseTime = parseFloat(document.getElementById('supplyHouseTime').value) || 0;
    const diagnosisTime = parseFloat(document.getElementById('diagnosisTime').value) || 0;
    const repairTime = parseFloat(document.getElementById('repairTime').value) || 0;
    const cleanupTime = parseFloat(document.getElementById('cleanupTime').value) || 0;

    // Calculate total time in hours
    const totalTime = (driveTime + supplyHouseTime + diagnosisTime + repairTime + cleanupTime) / 60.0;
    const hourlyRate = 475; // $475 per hour
    const totalLaborCost = totalTime * hourlyRate;

    // Display results with commas and two decimal places
    document.getElementById('totalLaborCost').textContent = formatNumber(totalLaborCost);

    // Show the material section
    document.getElementById('material-section').style.display = 'block';

    // Display labor breakdown under the first calculate button
    const laborBreakdown = `${formatNumber(totalTime)} hours x $475 per hour = $${formatNumber(totalLaborCost)}`;
    document.getElementById('laborBreakdown').textContent = laborBreakdown;
    document.getElementById('laborBreakdown').style.display = 'block'; // Make it visible
}

// Function to calculate the material cost
function calculateMaterial(event) {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page

    // Get the values from the form
    const materialCost = parseFloat(document.getElementById('materialCost').value) || 0;
    const taxRate = 0.1; // 10% tax
    const totalMaterialCost = materialCost + (materialCost * taxRate);

    // Display the total material cost with commas and two decimal places
    document.getElementById('totalMaterialCost').textContent = formatNumber(totalMaterialCost);

    // Proceed to calculate the total job cost
    calculateTotalJobCost();
}

// Function to calculate the total job cost (labor + material + 30% markup)
function calculateTotalJobCost() {
    const laborCost = parseFloat(document.getElementById('totalLaborCost').textContent.replace(/,/g, ''));
    const materialCost = parseFloat(document.getElementById('totalMaterialCost').textContent.replace(/,/g, ''));

    if (!isNaN(laborCost) && !isNaN(materialCost)) {
        const jobMarkup = 1.3; // 30% markup
        const totalJobCost = (laborCost + materialCost) * jobMarkup;

        // Display the total job cost with commas and two decimal places
        document.getElementById('totalJobCost').textContent = formatNumber(totalJobCost);

        // Show the results section
        document.getElementById('results').style.display = 'block';
    } else {
        alert("Please ensure both labor and material costs are calculated properly.");
    }
}

// Function to handle "Enter" key press
function handleEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission

        // Check if the active element is within the labor section
        if (document.activeElement.closest('#labor-section')) {
            calculateLabor(event);  // Trigger labor cost calculation
        }
        // Check if the active element is within the material section
        else if (document.activeElement.closest('#material-section')) {
            calculateMaterial(event);  // Trigger material cost calculation
        }
    }
}

// Add event listeners for the form
document.getElementById('jobForm').addEventListener('submit', calculateLabor);
document.getElementById('material-calculate-btn').addEventListener('click', calculateMaterial);

// Listen for "Enter" key press and trigger appropriate calculation based on section
document.addEventListener('keydown', handleEnterKey);
