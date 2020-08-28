import { IsDefined, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class Board {
	@Expose()
	id!: string;

	@Expose()
	boardType!: 'Kanban' | 'Scrum';

	@Expose()
	@IsNotEmpty()
	name!: string;

	@Expose()
	createdAt!: Date;

	@Expose()
	createdBy!: {
		id: string;
		firstName: string;
		lastName: string;
		avatar: string | null;
	};
}
