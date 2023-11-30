import { rm } from 'fs/promises'

global.beforeEach(async () => {
  await rm(process.env.TYPEORM_SQLITE_PATH, { force: true })
})
