import { ConnectionHandler } from '../../config/io.config';
import { Types } from '../models/IO';

class IssueConnectionHandler extends ConnectionHandler {
	public constructor() {
		super(Types.Issue);
	}
}

const issueHandler = new IssueConnectionHandler();
export default issueHandler;
