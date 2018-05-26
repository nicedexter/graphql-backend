import fetch from "node-fetch";

const Variables = fetch("http://localhost:8080/services/variables").then(res =>
  res.json()
);

const Groups = fetch(
  "http://localhost:8080/services/groups"
).then(res => res.json());

const Hierarchy = fetch(
  "http://localhost:8080/services/variables/hierarchy"
).then(res => res.json());

export { Variables, Groups, Hierarchy };
