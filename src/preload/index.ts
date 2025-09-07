import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  TypeAssessmentFormData,
  TypeIndividualTherapyFormData,
  TypeGroupTherapyFormData,
  TypeAcademicActivityFormData,
  TypeResearchFormData,
  TypeOtherActivityFormData
} from '@shared/types'
import {
  ASSESSMENT_LOG_CHANNELS,
  INDIVIDUAL_THERAPY_LOG_CHANNELS,
  GROUP_THERAPY_LOG_CHANNELS,
  ACADEMIC_ACTIVITY_LOG_CHANNELS,
  RESEARCH_LOG_CHANNELS,
  OTHER_ACTIVITY_LOG_CHANNELS
} from '@shared/constants/ipcChannels'
import {
  AssessmentLogQueryParams,
  IndividualTherapyLogQueryParams,
  GroupTherapyLogQueryParams,
  AcademicActivityLogQueryParams,
  ResearchLogQueryParams,
  OtherActivityLogQueryParams
} from '@shared/types/db'
import _log from './preloadLogger'
import {
  AcademicActivityLog,
  AssessmentLog,
  GroupTherapyLog,
  IndividualTherapyLog,
  OtherActivityLog,
  ResearchLog
} from '@prisma/client'

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
  getAssessmentLogs: (params?: AssessmentLogQueryParams): Promise<AssessmentLog[]> => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.GET, params),
  createAssessmentLog: (form: TypeAssessmentFormData): Promise<AssessmentLog> => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.CREATE, form),
  updateAssessmentLog: (id: number, form: TypeAssessmentFormData): Promise<AssessmentLog> =>
    ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.UPDATE, id, form),
  deleteAssessmentLog: (id: number): Promise<AssessmentLog> => ipcRenderer.invoke(ASSESSMENT_LOG_CHANNELS.DELETE, id),

  // Individual Therapy Log API functions
  getIndividualTherapyLogs: (params?: IndividualTherapyLogQueryParams): Promise<IndividualTherapyLog[]> => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.GET, params),
  createIndividualTherapyLog: (form: TypeIndividualTherapyFormData): Promise<IndividualTherapyLog> => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.CREATE, form),
  updateIndividualTherapyLog: (id: number, form: TypeIndividualTherapyFormData): Promise<IndividualTherapyLog> =>
    ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.UPDATE, id, form),
  deleteIndividualTherapyLog: (id: number): Promise<IndividualTherapyLog> => ipcRenderer.invoke(INDIVIDUAL_THERAPY_LOG_CHANNELS.DELETE, id),

  // Group Therapy Log API functions
  getGroupTherapyLogs: (params?: GroupTherapyLogQueryParams): Promise<GroupTherapyLog[]> => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.GET, params),
  createGroupTherapyLog: (form: TypeGroupTherapyFormData): Promise<GroupTherapyLog> => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.CREATE, form),
  updateGroupTherapyLog: (id: number, form: TypeGroupTherapyFormData): Promise<GroupTherapyLog> =>
    ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.UPDATE, id, form),
  deleteGroupTherapyLog: (id: number): Promise<GroupTherapyLog> => ipcRenderer.invoke(GROUP_THERAPY_LOG_CHANNELS.DELETE, id),

  // Academic Activity Log API functions
  getAcademicActivityLogs: (params?: AcademicActivityLogQueryParams): Promise<AcademicActivityLog[]> => ipcRenderer.invoke(ACADEMIC_ACTIVITY_LOG_CHANNELS.GET, params),
  createAcademicActivityLog: (form: TypeAcademicActivityFormData): Promise<AcademicActivityLog> => ipcRenderer.invoke(ACADEMIC_ACTIVITY_LOG_CHANNELS.CREATE, form),
  updateAcademicActivityLog: (id: number, form: TypeAcademicActivityFormData): Promise<AcademicActivityLog> =>
    ipcRenderer.invoke(ACADEMIC_ACTIVITY_LOG_CHANNELS.UPDATE, id, form),
  deleteAcademicActivityLog: (id: number): Promise<AcademicActivityLog> => ipcRenderer.invoke(ACADEMIC_ACTIVITY_LOG_CHANNELS.DELETE, id),

  // Research Log API functions
  getResearchLogs: (params?: ResearchLogQueryParams): Promise<ResearchLog[]> => ipcRenderer.invoke(RESEARCH_LOG_CHANNELS.GET, params),
  createResearchLog: (form: TypeResearchFormData): Promise<ResearchLog> => ipcRenderer.invoke(RESEARCH_LOG_CHANNELS.CREATE, form),
  updateResearchLog: (id: number, form: TypeResearchFormData): Promise<ResearchLog> =>
    ipcRenderer.invoke(RESEARCH_LOG_CHANNELS.UPDATE, id, form),
  deleteResearchLog: (id: number): Promise<ResearchLog> => ipcRenderer.invoke(RESEARCH_LOG_CHANNELS.DELETE, id),

  // Other Activity Log API functions
  getOtherActivityLogs: (params?: OtherActivityLogQueryParams): Promise<OtherActivityLog[]> => ipcRenderer.invoke(OTHER_ACTIVITY_LOG_CHANNELS.GET, params),
  createOtherActivityLog: (form: TypeOtherActivityFormData): Promise<OtherActivityLog> => ipcRenderer.invoke(OTHER_ACTIVITY_LOG_CHANNELS.CREATE, form),
  updateOtherActivityLog: (id: number, form: TypeOtherActivityFormData): Promise<OtherActivityLog> =>
    ipcRenderer.invoke(OTHER_ACTIVITY_LOG_CHANNELS.UPDATE, id, form),
  deleteOtherActivityLog: (id: number): Promise<OtherActivityLog> => ipcRenderer.invoke(OTHER_ACTIVITY_LOG_CHANNELS.DELETE, id),
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

