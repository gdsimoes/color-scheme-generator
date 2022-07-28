const colorSchemeForm = document.querySelector("#colorSchemeForm");

colorSchemeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(colorSchemeForm);
    for (const entry of data) {
        console.log("budega");
        console.log(entry);
    }
});
