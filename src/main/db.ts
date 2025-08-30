// import { app, shell, BrowserWindow, ipcMain } from 'electron'
// import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.jpg?asset'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
//
// // 모든 Task 조회
// ipcMain.handle('db:get-tasks', async () => {
//   return await prisma.task.findMany()
// })
//
// // Task 생성
// ipcMain.handle('db:create-task', async (_, title: string) => {
//   return await prisma.task.create({
//     data: {
//       title,
//     },
//   })
// })
//
// // Task isDone 상태 업데이트
// ipcMain.handle('db:update-task-status', async (_, id: number, isDone: boolean) => {
//   return await prisma.task.update({
//     where: { id },
//     data: { isDone },
//   })
// })
//
// // Task 삭제
// ipcMain.handle('db:delete-task', async (_, id: number) => {
//   return await prisma.task.delete({
//     where: { id },
//   })
// })
