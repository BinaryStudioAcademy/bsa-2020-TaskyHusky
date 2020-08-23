import issueHandler from './issue.handler';
import { ConnectionHandler } from '../../config/io.config';

const IO_Handlers: ConnectionHandler[] = [issueHandler];

export default IO_Handlers;
