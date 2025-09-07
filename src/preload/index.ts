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
  OTHER_ACTIVITY_LOG_CHANNELS,
  TRAINING_YEAR_CHANNELS,
  ASSESSMENT_TARGET_CHANNELS,
  ACADEMIC_TARGET_CHANNELS,
  OTHER_ACTIVITY_TARGET_CHANNELS,
  RESEARCH_TARGET_CHANNELS,
  THERAPY_TARGET_CHANNELS, OVERVIEW_CHANNELS
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
  ResearchLog,
  OtherActivityTarget,
  TrainingYear,
  AssessmentTarget,
  AcademicTarget,
  ResearchTarget,
  TherapyTarget
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

  // Training Year API functions
  getTrainingYears: (): Promise<TrainingYear[]> => ipcRenderer.invoke(TRAINING_YEAR_CHANNELS.GET),
  createTrainingYear: (trainingYear: any): Promise<TrainingYear> => ipcRenderer.invoke(TRAINING_YEAR_CHANNELS.CREATE, trainingYear),
  updateTrainingYear: (id: number, trainingYear: any): Promise<TrainingYear> =>
    ipcRenderer.invoke(TRAINING_YEAR_CHANNELS.UPDATE, id, trainingYear),
  deleteTrainingYear: (id: number): Promise<TrainingYear> => ipcRenderer.invoke(TRAINING_YEAR_CHANNELS.DELETE, id),

  // Assessment Target API functions
  getAssessmentTarget: (): Promise<AssessmentTarget | null> => ipcRenderer.invoke(ASSESSMENT_TARGET_CHANNELS.GET),
  createAssessmentTarget: (assessmentTarget: any): Promise<AssessmentTarget> => ipcRenderer.invoke(ASSESSMENT_TARGET_CHANNELS.CREATE, assessmentTarget),
  updateAssessmentTarget: (id: number, assessmentTarget: any): Promise<AssessmentTarget> =>
    ipcRenderer.invoke(ASSESSMENT_TARGET_CHANNELS.UPDATE, id, assessmentTarget),
  deleteAssessmentTarget: (id: number): Promise<AssessmentTarget> => ipcRenderer.invoke(ASSESSMENT_TARGET_CHANNELS.DELETE, id),

  // Academic Target API functions
  getAcademicTarget: (): Promise<AcademicTarget | null> => ipcRenderer.invoke(ACADEMIC_TARGET_CHANNELS.GET),
  createAcademicTarget: (academicTarget: any): Promise<AcademicTarget> => ipcRenderer.invoke(ACADEMIC_TARGET_CHANNELS.CREATE, academicTarget),
  updateAcademicTarget: (id: number, academicTarget: any): Promise<AcademicTarget> =>
    ipcRenderer.invoke(ACADEMIC_TARGET_CHANNELS.UPDATE, id, academicTarget),
  deleteAcademicTarget: (id: number): Promise<AcademicTarget> => ipcRenderer.invoke(ACADEMIC_TARGET_CHANNELS.DELETE, id),

  // Other Activity Target API functions
  getOtherActivityTarget: (): Promise<OtherActivityTarget | null> => ipcRenderer.invoke(OTHER_ACTIVITY_TARGET_CHANNELS.GET),
  createOtherActivityTarget: (otherActivityTarget: any): Promise<OtherActivityTarget> => ipcRenderer.invoke(OTHER_ACTIVITY_TARGET_CHANNELS.CREATE, otherActivityTarget),
  updateOtherActivityTarget: (id: number, otherActivityTarget: any): Promise<OtherActivityTarget> =>
    ipcRenderer.invoke(OTHER_ACTIVITY_TARGET_CHANNELS.UPDATE, id, otherActivityTarget),
  deleteOtherActivityTarget: (id: number): Promise<OtherActivityTarget> => ipcRenderer.invoke(OTHER_ACTIVITY_TARGET_CHANNELS.DELETE, id),

  // Research Target API functions
  getResearchTarget: (): Promise<ResearchTarget | null> => ipcRenderer.invoke(RESEARCH_TARGET_CHANNELS.GET),
  createResearchTarget: (researchTarget: any): Promise<ResearchTarget> => ipcRenderer.invoke(RESEARCH_TARGET_CHANNELS.CREATE, researchTarget),
  updateResearchTarget: (id: number, researchTarget: any): Promise<ResearchTarget> =>
    ipcRenderer.invoke(RESEARCH_TARGET_CHANNELS.UPDATE, id, researchTarget),
  deleteResearchTarget: (id: number): Promise<ResearchTarget> => ipcRenderer.invoke(RESEARCH_TARGET_CHANNELS.DELETE, id),

  // Therapy Target API functions
  getTherapyTarget: (): Promise<TherapyTarget | null> => ipcRenderer.invoke(THERAPY_TARGET_CHANNELS.GET),
  createTherapyTarget: (therapyTarget: any): Promise<TherapyTarget> => ipcRenderer.invoke(THERAPY_TARGET_CHANNELS.CREATE, therapyTarget),
  updateTherapyTarget: (id: number, therapyTarget: any): Promise<TherapyTarget> =>
    ipcRenderer.invoke(THERAPY_TARGET_CHANNELS.UPDATE, id, therapyTarget),
  deleteTherapyTarget: (id: number): Promise<TherapyTarget> => ipcRenderer.invoke(THERAPY_TARGET_CHANNELS.DELETE, id),

  overviewGetAssessmentLogs: (): Promise<AssessmentLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_ASSESSMENT_LOGS),
  overviewGetResearchLogs: (): Promise<ResearchLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_RESEARCH_LOGS),
  overviewGetAcademicLogs: (): Promise<AcademicActivityLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_ACADEMIC_ACTIVITY_LOGS),
  overviewGetGroupTherapyLogs: (): Promise<GroupTherapyLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_GROUP_THERAPY_LOGS),
  overviewGetIndividualTherapyLogs: (): Promise<IndividualTherapyLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_INDIVIDUAL_THERAPY_LOGS),
  overviewGetOtherActivityLogs: (): Promise<OtherActivityLog[]> => ipcRenderer.invoke(OVERVIEW_CHANNELS.GET_OTHER_ACTIVITY_LOGS),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', db)
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('log', log)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

