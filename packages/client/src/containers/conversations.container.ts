import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { Conversation } from '../lib/types';
import { api } from '../lib/API';

export const Conversations = createContainer(() => {
  const [allConversations, setConversations] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    const convos = await api.getAllConversations();
    setConversations(convos);
  };

  const createConversation = async (name: string) => {
    const convo = await api.createConversation(name);
    setConversations(convos => [...convos, convo]);
    return convo;
  };

  return { allConversations, loadConversations, createConversation };
})