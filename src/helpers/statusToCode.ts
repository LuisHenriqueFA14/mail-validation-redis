const codeStatus = new Map<string, number>([
	["OK", 200],
	["Created", 201],
	["Accepted", 202],
	["Bad Request", 400],
	["Unauthorized", 401],
	["Payment Required", 402],
	["Forbidden", 403],
	["Not Found", 404],
	["Internal Server Error", 500],
]);

function statusToCode(status: string): number {
	const code = codeStatus.get(status);

	return code || 500;
}

export { statusToCode };
