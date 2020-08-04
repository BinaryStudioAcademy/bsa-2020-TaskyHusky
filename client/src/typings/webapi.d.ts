namespace WebApi.Result {
	interface UserAuthResult {
		id: string;
		jwtToken: string;
		email: string;
	}
}

namespace WebApi.Entities {
	interface Example {
		id: string;
		name?: string;
		text?: string;
	}

	interface Filter {
		id: string;
		ownerId?: string;
		name?: string;
		stared?: boolean;
	}

	interface FilterDefinition {
		id: string;
		filterType?: string;
		dataType?: string;
		title?: string;
	}

	interface FilterPart {
		id: string;
		filter?: Filter;
		filterDef?: FilterDefinition;
		// members?: User[];
		searchText?: string;
	}
}
