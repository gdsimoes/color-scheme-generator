const wrappers = document.querySelectorAll(".select-wrapper");

// Loop through all select wrappers
for (const wrapper of wrappers) {
    const select = wrapper.querySelector("select");

    // Div to show the selected element
    const selectedDiv = document.createElement("div");
    selectedDiv.classList.add("select-selected");
    selectedDiv.textContent = select.options[select.selectedIndex].textContent;

    wrapper.append(selectedDiv);

    // Div with all options
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("select-options", "select-hide");
    for (const option of select.options) {
        // Div of a single option
        const optionDiv = document.createElement("div");
        optionDiv.textContent = option.textContent;
        // When option is clicked the original select element and the selectedDiv are updated
        optionDiv.addEventListener("click", (event) => {
            // Update selectedIndex
            select.selectedIndex = [...select.options].findIndex(
                (option) =>
                    option.textContent === event.currentTarget.textContent
            );

            // Update selectedDiv
            selectedDiv.textContent = event.currentTarget.textContent;

            // Unselect previouslySelectedDiv
            const previouslySelectedDiv = wrapper.querySelector(
                ".select-option-selected"
            );
            previouslySelectedDiv.classList.remove("select-option-selected");

            // Add class 'select-option-selected' to current div
            event.currentTarget.classList.add("select-option-selected");

            // Close selects
            closeAllSelectsExcept();
        });

        optionsDiv.append(optionDiv);
    }

    // Add select-option-selected class to first option
    optionsDiv
        .querySelectorAll("div")
        [select.selectedIndex].classList.add("select-option-selected");

    wrapper.append(optionsDiv);

    // When selectedDiv is clicked close any other selects
    // and toggle the current select
    selectedDiv.addEventListener("click", (event) => {
        // We need to stop propagation to avoid triggering the document event
        event.stopPropagation();

        // Hide or show current options
        optionsDiv.classList.toggle("select-hide");

        // Close others
        closeAllSelectsExcept(optionsDiv);
    });
}

// Close all optionsDiv except the one in the argument
function closeAllSelectsExcept(exception) {
    const optionsDivList = document.querySelectorAll(".select-options");
    for (const optionsDiv of optionsDivList) {
        if (optionsDiv !== exception) {
            optionsDiv.classList.add("select-hide");
        }
    }
}

// Close all selects when the user clicks outside
document.addEventListener("click", closeAllSelectsExcept);
