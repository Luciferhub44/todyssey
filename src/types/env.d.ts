interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string
    // Add other env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }