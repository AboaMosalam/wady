/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly DEPLOY_ENV?: 'GH'
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  