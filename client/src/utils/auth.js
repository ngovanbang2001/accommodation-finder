import Cookies from "js-cookie";
export const saveTokenToCookie = ({ accessToken, refreshToken, sessionId }) => {
  if (accessToken) {
    Cookies.set(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      expires: 7,
      path: "/",
    });
    Cookies.set(
      process.env.NEXT_PUBLIC_COOKIE_REFRESH_ACCESS_TOKEN_KEY,
      refreshToken,
      {
        expires: 7,
        path: "/",
      }
    );

    Cookies.set(process.env.NEXT_PUBLIC_SESSION_ID, sessionId, {
      expires: 7,
      path: "/",
    });
  }
};

export const getToken = () => {
  const accessToken = Cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY
  );
  const refreshToken = Cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_REFRESH_ACCESS_TOKEN_KEY
  );

  return { accessToken, refreshToken };
};

export const removeToken = () => {
  const accessToken = Cookies.remove(
    process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
    { path: "/" }
  );
  const refreshToken = Cookies.remove(
    process.env.NEXT_PUBLIC_COOKIE_REFRESH_ACCESS_TOKEN_KEY,
    { path: "/" }
  );
  const sessionId = Cookies.remove(process.env.NEXT_PUBLIC_SESSION_ID, {
    path: "/",
  });
  return { accessToken, refreshToken };
};
