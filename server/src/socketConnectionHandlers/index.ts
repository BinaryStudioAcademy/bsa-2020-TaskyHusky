import { ConnectionHandler } from '../../config/io.config';
import issueHandler from './issue.handler';

const IOHandlers: ConnectionHandler[] = [issueHandler];
export default IOHandlers;
