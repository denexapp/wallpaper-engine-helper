import { ipcMain } from 'electron'
import VK from 'vk-ts'
import { UnwrapPromise } from '../types/UnwrapPromise'
import { groupId } from '../utils/consts'
import { parseFirstArchiveName } from '../utils/documents'
import state from './state'

const docsToCheck = 20

const getNextArhiveNumber = async (vk: VK): Promise<number | null> => {
  let docs: UnwrapPromise<ReturnType<typeof vk['docsGet']>>

  try {
    docs = await vk.docsGet(docsToCheck, 0, -groupId)
  } catch (e) {
    return null
  }

  let nextArchiveNumber: number | undefined

  docs.items.find(document => {
    const archiveNumber = parseFirstArchiveName(document.title)
    if (archiveNumber !== null) {
      nextArchiveNumber = archiveNumber + 1
    }
    return archiveNumber !== null
  })

  if (nextArchiveNumber === undefined) {
    return null
  }

  return nextArchiveNumber
}

const vkNextArchiveNumber = () => {
  ipcMain.on('vk-next-archive-number', async event => {
    const { vk } = state
    if (vk === null) {
      event.reply('vk-next-archive-number-fail')
      return
    }
    const nextArchiveNumber = await getNextArhiveNumber(vk)
    if (nextArchiveNumber === null) {
      event.reply('vk-next-archive-number-fail')
    } else {
      event.reply('vk-next-archive-number-success', { nextArchiveNumber })
    }
  })
}

export default vkNextArchiveNumber
