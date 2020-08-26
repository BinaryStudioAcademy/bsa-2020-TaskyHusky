import { ConnectionHandler } from '../../config/io.config';
import issueHandler from './issue.handler';

const IO_Handlers: ConnectionHandler[] = [issueHandler];
export default IO_Handlers;
