document.addEventListener("htmx:afterOnLoad", event => {
	if (
		event.detail.xhr.responseURL.includes("/register") ||
		event.detail.xhr.responseURL.includes("/login")
	) {
		const response = JSON.parse(event.detail.xhr.responseText);
		localStorage.setItem("token", response.token);
		console.log(response);
		window.location.replace("/");
	}
});
