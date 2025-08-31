import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TypeAssessmentFormData, TypeIndividualTherapyFormData, TypeGroupTherapyFormData } from '@shared/types'
import { ASSESSMENT_LOG_CHANNELS, INDIVIDUAL_THERAPY_LOG_CHANNELS, GROUP_THERAPY_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { AssessmentLogQueryParams, IndividualTherapyLogQueryParams, GroupTherapyLogQueryParams } from '@shared/types/db'
import _log from './preloadLogger'

export const api = {
}

export const log = {
  info: (...args: any) => _log.info(...args),
  warn: (...args: any) => _log.warn(...args),
  error: (...args: any) => _log.error(...args)
  // You can expose other methods as needed
}

export const db = {
  // Assessment Log API functions
  getAssessmentLogs: (params?: AssessmentLogQueryParams) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.GET, params),
  createAssessmentLog: (form: TypeAssessmentFormData) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.CREATE, form),
  updateAssessmentLog: (id: number, form: TypeAssessmentFormData) =>
    ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.UPDATE, id, form),
  deleteAssessmentLog: (id: number) => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.DELETE, id),

  // Individual Therapy Log API functions
  getIndividualTherapyLogs: (params?: IndividualTherapyLogQueryParams) => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.GET, params),
  createIndividualTherapyLog: (form: TypeIndividualTherapyFormData) => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.CREATE, form),
  updateIndividualTherapyLog: (id: number, form: TypeIndividualTherapyFormData) =>
    ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.UPDATE, id, form),
  deleteIndividualTherapyLog: (id: number) => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.DELETE, id),

  // Group Therapy Log API functions
  getGroupTherapyLogs: (params?: GroupTherapyLogQueryParams) => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.GET, params),
  createGroupTherapyLog: (form: TypeGroupTherapyFormData) => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.CREATE, form),
  updateGroupTherapyLog: (id: number, form: TypeGroupTherapyFormData) =>
    ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.UPDATE, id, form),
  deleteGroupTherapyLog: (id: number) => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.DELETE, id),
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
    contextBridge.exposeInMainWorld('log', log)
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

