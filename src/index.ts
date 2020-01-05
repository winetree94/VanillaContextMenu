import { Request } from "./http/Client";

export function a() {
  return "hello world";
}

fetch("www.google.com").then(res => {
  console.log(res);
});

const api = {
  Grid: Request
};

export default api;
