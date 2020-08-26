import { ConnectionHandler } from '../../config/io.config';
import issueHandler from './issue.handler';
import notificationHandler from './notification.handler';

const IO_Handlers: ConnectionHandler[] = [issueHandler, notificationHandler];
export default IO_Handlers;
