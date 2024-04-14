// // Define fetchObjects function
// async function fetchObjects() {
// 	try {
// 		const response = await fetch("http://localhost:5000/objects");
// 		if (!response.ok) {
// 			throw new Error("Failed to fetch data");
// 		}
// 		const data = await response.json();
// 		const objectList = document.getElementById("script-list");
// 		objectList.innerHTML = ""; // Clear previous list content
// 		data.forEach((obj) => {
// 			// Create a div element with class "list-item"
// 			const listItem = document.createElement("div");
// 			listItem.classList.add("script-item");

// 			// Set text content for the div
// 			listItem.textContent = obj.script_name;
// 			// Attach a click event listener to each item
// 			listItem.addEventListener("click", () => {
// 				// Navigate to a new page with more information about the item
// 				// For example, you can redirect to a page like "/details?id=1" where "1" is the script ID
// 				window.location.href = `/details?id=${obj.id}`;
// 			});
// 			// Append the div to the objectList
// 			objectList.appendChild(listItem);
// 		});
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		// You can optionally send error message to main process here
// 	}
// }

// // Call fetchObjects when the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", fetchObjects);
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
}

document.addEventListener("DOMContentLoaded", fetchObjects);
