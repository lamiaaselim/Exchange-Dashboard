declare var process: {
  env: {
    NG_APP_API_KEY: string;
  };
};

export const environment = {
  production: true,
  apiKey: process.env.NG_APP_API_KEY || '',
};
