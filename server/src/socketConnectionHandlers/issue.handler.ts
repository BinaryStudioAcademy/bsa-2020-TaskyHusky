import { ConnectionHandler } from '../../config/io.config';
import { Types } from '../models/IO';

const issueHandler = new ConnectionHandler(Types.Issue);
export default issueHandler;
