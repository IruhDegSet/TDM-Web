// script.js

const arabicLabels=
    {
        "NumArret": "رقم القرار",
        "ChambreArret": "الغرفة القضائية",
        "DateArret": "تاريخ إصدار القرار",
        "PartiesArret": "أطراف القضية",
        "PrincipeArret": "مبدأ القرار",
        "DecisionArret": "القرار",
        "DecisOperArret": "منطوق القرار",
        "ComposArret": "تشكيلة المجلس",
        "RefArret": "المصدر",
        "AnneeRef": "سنة المصدر",
        "numRef": "العدد الصادر",
        "numPageRef": "رقم الصفحة في المصدر"
    }


document.addEventListener("DOMContentLoaded", function() {
    const loadDataButton = document.getElementById("loadDataButton");
    const clearDataButton = document.getElementById("clearDataButton");
    const applyFilterButton = document.getElementById("applyFilterButton");
    const clearFilterButton = document.getElementById("clearFilterButton");
    const decisionsList = document.getElementById("decisionsList");
    const chamberInput = document.getElementById("chamberInput");
    const yearInput = document.getElementById("yearInput");
    const referenceInput = document.getElementById("referenceInput");
    let originalData = []; // Original data loaded from data.json
    let filteredData = []; // Filtered data based on user input

    loadDataButton.addEventListener("click", loadData);
    clearDataButton.addEventListener("click", clearData);
    applyFilterButton.addEventListener("click", applyFilter);
    clearFilterButton.addEventListener("click", clearFilter);

    async function loadData() {
        try {
            // Load data from data.json file
            const response = await fetch("data.json");
            originalData = await response.json();
            applyFilter()
        } catch (error) {
            console.error("Error loading data:", error);
            alert("Failed to load data!");
        }
    }

    function clearData() {
        // Clear the decisions list
        decisionsList.innerHTML = "";
        alert("Data cleared successfully!");
    }

    function applyFilter() {
        // Reset filteredData array
        filteredData = [...originalData];

        // Filter data based on user input
        if (chamberInput.value.trim() !== "") {
            filteredData = filteredData.filter(decision => decision.ChambreArret.includes(chamberInput.value.trim()));
        }
        if (yearInput.value.trim() !== "") {
            filteredData = filteredData.filter(decision => decision.DateArret.includes(yearInput.value.trim()));
        }
        if (referenceInput.value.trim() !== "") {
            filteredData = filteredData.filter(decision => decision.RefArret.includes(referenceInput.value.trim()));
        }

        // Display filtered data
        displayDecisions(filteredData);
    }

    function clearFilter() {
        // Clear filter input fields
        chamberInput.value = "";
        yearInput.value = "";
        referenceInput.value = "";

        // Reset filteredData to original data
        filteredData = [...originalData];

        // Display all decisions
        displayDecisions(filteredData);
    }

    function displayDecisions(data) {
        // Clear previous decisions
        decisionsList.innerHTML = "";

        // Display each decision
        data.forEach(decision => {
            const decisionItem = document.createElement("div");
            decisionItem.classList.add("decision");
            decisionItem.dataset.decision = JSON.stringify(decision); // Store decision data in dataset
            decisionItem.innerHTML = `
                <p dir=rtl><strong>القرار رقم:</strong> ${decision.NumArret} <strong> الصادر عن :</strong> ${decision.RefArret} <strong>  بتاريخ :</strong> ${decision.DateArret}</p>
                <button class="detailsButton">View Details</button> <!-- Button to view details -->
                <!-- Add more attributes here as needed -->
            `;
            decisionsList.appendChild(decisionItem);
        });

        // Add event listener to details buttons
        const detailsButtons = document.querySelectorAll(".detailsButton");
        detailsButtons.forEach(button => {
            button.addEventListener("click", showDetails);
        });
    }

    function showDetails(event) {
        const decisionItem = event.target.closest(".decision");
        if (decisionItem) {
            decisionsList.innerHTML= `<button class="goBackButton">go Back</button> <!-- Button to view details -->`
            
            const decisionData = JSON.parse(decisionItem.dataset.decision);
            for (const key in decisionData){
                const item = document.createElement("div");
                
                item.innerHTML =`<p dir="rtl"><strong>${arabicLabels[key]}</strong> : ${decisionData[key]}</p>`;
                decisionsList.appendChild(item);
            };
            // console.log(decisionData)
            decisionsList.innerHTML= decisionsList.innerHTML + `<button class="goBackButton">go Back</button> <!-- Button to view details -->`
            
            goBackButtons= document.querySelectorAll('.goBackButton')

            goBackButtons.forEach(button => {
                button.addEventListener("click", applyFilter)
            })
        }
    }

});
