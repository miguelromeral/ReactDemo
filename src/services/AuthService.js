
const AuthService = {};

AuthService.user = false;

AuthService.login = (email, password) => {

  return new Promise((resolve, reject) => {
    localStorage.setItem("token", email);
    resolve({ status: true, message: "Login successfully." });
  });

}

AuthService.getProfile = (hard = false) => {
    return new Promise(async (res, rej) => {
      res(localStorage.getItem("token"));
    });
}

AuthService.logout = async () => {
  return new Promise((resolve) => {
    localStorage.setItem("token", "");
    resolve({ status: true, message: "Logged out successfully." });
  })
}

export default AuthService;