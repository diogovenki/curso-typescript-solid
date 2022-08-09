import { MessagingProtocol } from './interfaces/messagin-protocol';

export class Messaging implements MessagingProtocol {
    sendMessage(message: string): void {
        console.log('Send message:', message);
    }
}
