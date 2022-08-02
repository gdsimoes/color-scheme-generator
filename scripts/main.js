function populate({ colors }) {
    const divs = document.querySelectorAll(".color");

    for (let i = 0; i < colors.length; i++) {
        const div = divs[i].querySelector("div");
        const p = divs[i].querySelector("p");

        const hex = colors[i].hex.value;

        div.style.backgroundColor = hex;
        p.textContent = hex;
    }
}

const colorSchemeForm = document.querySelector("#colorSchemeForm");

colorSchemeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const baseUrl = event.currentTarget.action;
    const hex = event.currentTarget.querySelector("#hex").value.slice(1);
    const mode = event.currentTarget.querySelector("select").value;

    const fullUrl = `${baseUrl}?hex=${hex}&mode=${mode}&count=5`;

    fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => populate(data));
});
