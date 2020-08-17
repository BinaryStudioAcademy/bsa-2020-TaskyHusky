export const extractUUIDFromArrayOfObjects = (arrayOfObjects: any[]) => {
	return arrayOfObjects.map((object) => object.id);
};
