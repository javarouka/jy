/**
 * Constants for IPC channel names used in the application
 */

// Assessment Log IPC channels
export const ASSESSMENT_LOG_CHANNELS = {
  GET: 'db:get-assessmentLog',
  CREATE: 'db:create-assessmentLog',
  UPDATE: 'db:update-assessmentLog',
  DELETE: 'db:delete-assessmentLog'
}

// Individual Therapy Log IPC channels
export const INDIVIDUAL_THERAPY_LOG_CHANNELS = {
  GET: 'db:get-individualTherapyLog',
  CREATE: 'db:create-individualTherapyLog',
  UPDATE: 'db:update-individualTherapyLog',
  DELETE: 'db:delete-individualTherapyLog'
}

// Group Therapy Log IPC channels
export const GROUP_THERAPY_LOG_CHANNELS = {
  GET: 'db:get-groupTherapyLog',
  CREATE: 'db:create-groupTherapyLog',
  UPDATE: 'db:update-groupTherapyLog',
  DELETE: 'db:delete-groupTherapyLog'
}
