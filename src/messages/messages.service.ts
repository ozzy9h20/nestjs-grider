import { MessagesRepository } from './messages.repository'

export class MessagesService {
  messagesRepository: MessagesRepository

  constructor() {
    // Service is creating its own dependencies
    // DONT DO THIS ON REAL APPS
    this.messagesRepository = new MessagesRepository()
  }

  async findOne(id: string) {
    return this.messagesRepository.findOne(id)
  }

  async findAll() {
    return this.messagesRepository.findAll()
  }

  async create(content: string) {
    return this.messagesRepository.create(content)
  }
}
