/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_NETWORK_ID: string
    readonly VITE_APP_CHAIN_ID: string
    readonly VITE_APP_CHAIN_NAME: string
    readonly VITE_APP_CHAIN_RPC_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }