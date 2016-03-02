export function index(req, res) {
  res.json({"msg":"things index"});
};

export function show(req, res) {
  res.json({"msg":"things show"});
};

export function create(req, res) {
  res.json({"msg":"things create"});
};

export function update(req, res) {
  res.json({"msg":"things update"});
};

export function destroy(req, res) {
  res.json({"msg":"things delete"});
};
