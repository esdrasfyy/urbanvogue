function getGithubUrl() {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const rootUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}`;

  return rootUrl;
}

export { getGithubUrl };
