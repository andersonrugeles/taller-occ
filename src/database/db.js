import { data } from './data'

class Database {
  constructor() {}

  async getAll() {
    await randomDelay()
    return data
  }

  async getById(id) {
    if (!Object.prototype.hasOwnProperty.call(allData, id)) {
      return null
    }

    const entry = allData[id]
    await randomDelay()
    return entry
  }
}

// Let's also add a delay to make it a bit closer to reality
const randomDelay = () =>
  new Promise((resolve) => {
    const max = 350
    const min = 100
    const delay = Math.floor(Math.random() * (max - min + 1)) + min

    setTimeout(resolve, delay)
  })

export default Database
