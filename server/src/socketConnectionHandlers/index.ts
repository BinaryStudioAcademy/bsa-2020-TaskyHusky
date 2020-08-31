import { ConnectionHandler } from '../../config/io.config';
import issueHandler from './issue.handler';
import notificationHandler from './notification.handler';

const IOHandlers: ConnectionHandler[] = [issueHandler, notificationHandler];
export default IOHandlers;
