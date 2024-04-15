// renderer.js
async function fetchObjects() {
	try {
		const response = await fetch("http://localhost:5000/objects");
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();
		const objectList = document.getElementById("script-list");
		objectList.innerHTML = ""; // Clear previous list content
		data.forEach((obj) => {
			const listItem = document.createElement("div");
			listItem.classList.add("script-item");
			listItem.textContent = obj.script_name;
			listItem.addEventListener("click", () => {
				openModal(obj.script_content);
			});
			objectList.appendChild(listItem);
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function openModal(scriptContent) {
	const modal = document.getElementById("modal");
	const modalScriptContent = document.getElementById("modal-script-content");
	modalScriptContent.innerHTML = `<pre>${scriptContent}</pre>`;

	modal.style.display = "block";

	const closeModalButton = document.querySelector(".close");
	closeModalButton.addEventListener("click", () => {
		modal.style.display = "none";
	});

	window.addEventListener("click", (event) => {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});

	const downloadButton = document.querySelector(".download-button");
	downloadButton.addEventListener("click", () => {
		window.location.href = "http://localhost:5000/download_script/101";
	});
}

document.addEventListener("DOMContentLoaded", fetchObjects);
