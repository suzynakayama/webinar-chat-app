import axios from 'axios';

class API {
  prefix = 'http://localhost:9999';
  
  async getAllConversations() {
    try {
      const res = await axios.get(`${this.prefix}/conversations`);
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async getConversation(id: string) {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${id}`);
      return res.data;
    } catch (err) {
      return null;
    }
  }

    async createConversation(name: string) {
    const res = await axios.post(`${this.prefix}/conversations`, { name });
    return res.data;
  }

  
  async getMessages(id: string) {
    const res = await axios.get(`${this.prefix}/conversations/${id}/messages`);
    return res.data;
  }

  async createMessage(conversationId: string, content: string) {
    const res = await axios.post(`${this.prefix}/messages`, {
      "userId": "006ca94e-194a-4db1-a31c-9954fce21bb4",
      content,
      conversationId
    });
    return res.data;
  }
}

export const api = new API();