export type TaskT = {
	id: string;
	title: string;
	description: string;
	priority: string;
	deadline: number;
	image?: string;
	alt?: string;
	color:string,
	tags: { title: string; bg: string; text: string }[];
};

type Column = {
	name: string;
	items: TaskT[];
};

export type Columns = {
	[key: string]: Column; //Bu kısım, dinamik anahtarlarla çalışan bir nesne olduğunu gösterir. Anahtarlar string türündedir. Her anahtar bir sütunu temsil eder.
};
