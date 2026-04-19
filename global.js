console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"
    : "/dsc-106-lab-1/";

const pages = [
  { url: "", title: "home" },
  { url: "contact/", title: "contact" },
  { url: "projects/", title: "projects" },
  { url: "resume/", title: "resume" },
];

function normalizePath(pathname) {
  let p = pathname.replace(/\/?index\.html?$/i, "") || "/";
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }
  return p || "/";
}

function pathsMatch(aPath, bPath) {
  return normalizePath(aPath) === normalizePath(bPath);
}

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = url.startsWith("http") ? url : BASE_PATH + url;

  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;
  a.classList.toggle(
    "current",
    a.host === location.host && pathsMatch(a.pathname, location.pathname),
  );
  if (a.host !== location.host) {
    a.target = "_blank";
  }
  nav.append(a);
}

document.body.insertAdjacentHTML(
  "afterbegin",
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`,
);

let select = document.querySelector("select");

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty("color-scheme", colorScheme);
  if (select) {
    select.value = colorScheme;
  }
}

select?.addEventListener("input", (event) => {
  const value = event.target.value;
  setColorScheme(value);
  localStorage.colorScheme = value;
});

if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}
