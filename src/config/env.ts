const env = {
  server_host: "",
};

if (process.env.UMI_ENV === "dev") {
  env.server_host = "http://localhost:3000/";
}

if (process.env.UMI_ENV === "prod") {
}

if (process.env.UMI_ENV === "test") {
}

export default env;
