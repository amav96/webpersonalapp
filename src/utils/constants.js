const SERVER_IP = "100.25.199.56:80";

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        MENU: "menu",
        COURSES: "courses",
        COURSE: "course",
        NEWSLETTERS: "newsletters",
        NEWSLETTER: "newsletter",
        POST: "post",
        POSTS: "posts",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
}