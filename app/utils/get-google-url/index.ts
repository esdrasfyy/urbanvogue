function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
  const client_id = process.env.GOOGLE_CLIENT_ID as string;
  const redirect_uri =
    `${process.env.OAUTH_REDIRECT_URL}provider=google` as string;

  const options = {
    redirect_uri: redirect_uri,
    client_id: client_id,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export {getGoogleOAuthURL};
