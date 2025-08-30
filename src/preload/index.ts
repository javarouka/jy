import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TypeAssessmentFormData } from '../shared/types'

export const api = {
}

export const db = {
  getAssessmentLogs: () => ipcRenderer.invoke('db:get-assessmentLog'),
  createAssessmentLog: (form: TypeAssessmentFormData) => ipcRenderer.invoke('db:create-assessmentLog', form),
  updateAssessmentLog: (id: number, form: TypeAssessmentFormData) =>
    ipcRenderer.invoke('db:update-assessmentLog', form),
  deleteAssessmentLog: (id: number) => ipcRenderer.invoke('db:delete-assessmentLog', id),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // `api` 객체를 window.db 이름으로 노출시킵니다.
    contextBridge.exposeInMainWorld('db', db)
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // contextBridge.exposeInMainWorld('fs', {
    //   createFile: () => ipcRenderer.invoke('create-file'),
    //   readFile: () => ipcRenderer.invoke('read-file'),
    // })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

