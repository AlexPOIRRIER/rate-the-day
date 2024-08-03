import auth from "./services";

const server = Bun.serve({
	port: process.env.PORT,
	async fetch(req) {
		console.log(req);
		if (req.method === "GET") {
			const { pathname } = new URL(req.url);

			switch (pathname) {
				// VIEWS
				case "/":
					return new Response(Bun.file("src/views/index.html"));
				case "/login":
					return new Response(Bun.file("src/views/login.html"));
				case "/register":
					return new Response(Bun.file("src/views/register.html"));

				//	DATA

				default:
					return new Response(Bun.file("src/views/index.html"));
			}
		}

		if (req.method === "POST") {
			const { pathname } = new URL(req.url);
			const data = JSON.parse(JSON.stringify(await req.formData()));

			switch (pathname) {
				case "/login":
					return auth.login(data);
				case "/register":
					const { token } = await auth.register(data);

					if (!token) {
						return Response.redirect("/register");
					}

					return Response.json(token);

				default:
					return new Response(Bun.file("src/views/index.html"));
			}
		}
	},
});

console.log(`Listening on http://localhost:${server.port} ...`);
