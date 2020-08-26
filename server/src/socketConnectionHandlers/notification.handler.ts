import { ConnectionHandler } from '../../config/io.config';
import { Types } from '../models/IO';

const notificationHandler = new ConnectionHandler(Types.Notification);
export default notificationHandler;
