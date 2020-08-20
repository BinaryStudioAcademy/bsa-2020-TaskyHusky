export interface IModifiedEntity<T> {
	data: Partial<T>;
	title: string;
	key: string;
}
