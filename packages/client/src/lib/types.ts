// TODO there is a way of importing the api dist models, check it out later

export interface AllConversations {
	name: string;
	id: string;
}

export interface Conversation {
	name: string;
	id: string;
}

export interface Message {
	content: string;
	id: string;
}

export interface Params {
  conversationID: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

