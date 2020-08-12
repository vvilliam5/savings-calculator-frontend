import jwt from "jsonwebtoken";

export const decodeJWT = {
    methods: {
        decodeJWT(token) {
            return jwt.verify(
                token,
                process.env.VUE_APP_PUBLIC_KEY,
                (err, decoded) => {
                    return decoded;
                }
            );
        },
        getUserDetails() {
            //get user token
            let token = window.sessionStorage.getItem("userDetails");
            //validate token and extract users info from token
            return this.decodeJWT(token);
        }
    },
}