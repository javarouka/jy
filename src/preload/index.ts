import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TypeAssessmentFormData } from '@shared/types'
import { ASSESSMENT_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { AssessmentLogQueryParams } from '@shared/types/db'

export const api = {
}

export const db = {
  getAssessmentLogs: (params?: AssessmentLogQueryParams) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.GET, params),
  createAssessmentLog: (form: TypeAssessmentFormData) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.CREATE, form),
  updateAssessmentLog: (id: number, form: TypeAssessmentFormData) =>
    ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.UPDATE, id, form),
  deleteAssessmentLog: (id: number) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.DELETE, id),
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

