import { rm } from 'fs/promises'

global.beforeEach(async () => {
  await rm(process.env.SQLITE_PATH, { force: true })
})
