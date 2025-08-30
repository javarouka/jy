// src/renderer/src/env.d.ts

/// <reference types="vite/client" />
import { api, db } from '../../preload'

declare global {
  interface Window {
    db: typeof db
    api: typeof api
  }
}
