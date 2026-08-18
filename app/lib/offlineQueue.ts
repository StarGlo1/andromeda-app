// Simple offline queue using localStorage

interface QueuedAction {
  id: string;
  type: string;
  payload: any;
  createdAt: number;
}

const QUEUE_KEY = "andromeda_offline_queue";

export function getQueue(): QueuedAction[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToQueue(type: string, payload: any): QueuedAction {
  const queue = getQueue();
  const action: QueuedAction = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    payload,
    createdAt: Date.now(),
  };
  queue.push(action);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  return action;
}

export function removeFromQueue(id: string): void {
  const queue = getQueue().filter((a) => a.id !== id);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function clearQueue(): void {
  localStorage.removeItem(QUEUE_KEY);
}

export function getQueueCount(): number {
  return getQueue().length;
}
