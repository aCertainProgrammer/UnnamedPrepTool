export function capitalize(string: string): string {
	if (string.length == 0) {
		return "";
	}

	return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function exportData(data: object, fileName: string): void {
	const blob = new Blob([JSON.stringify(data, null, 4)], {
		type: "plain/text",
	});
	const fileUrl = URL.createObjectURL(blob);
	const downloadElement = document.createElement("a");
	downloadElement.href = fileUrl;
	downloadElement.download = fileName;
	downloadElement.style.display = "none";
	document.body.appendChild(downloadElement);
	downloadElement.click();
	document.body.removeChild(downloadElement);
}
