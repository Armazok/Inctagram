export const OAUTH_AUTHORIZATION = {
  registrationGoogle() {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/google/registration`)
  },
  registrationGithub() {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/github/registration`)
  },
  loginGoogle() {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/google/authorization`)
  },
  loginGithub() {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/github/authorization`)
  },
}
