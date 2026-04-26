import { fetchJSON, renderProjects, fetchGitHubData } from "./global.js";

const projects = await fetchJSON("./lib/projects.json");
const latestProjects = projects.slice(0, 3);

const projectsContainer = document.querySelector(".projects");
renderProjects(latestProjects, projectsContainer, "h2");

const githubData = await fetchGitHubData("Jaerinx");
const profileStats = document.querySelector("#profile-stats");

if (profileStats && githubData) {
  profileStats.innerHTML = `
    <h2>GitHub Profile Stats</h2>
    <dl>
      <dt>Public Repos</dt><dd>${githubData.public_repos ?? 0}</dd>
      <dt>Public Gists</dt><dd>${githubData.public_gists ?? 0}</dd>
      <dt>Followers</dt><dd>${githubData.followers ?? 0}</dd>
      <dt>Following</dt><dd>${githubData.following ?? 0}</dd>
    </dl>
  `;
}
