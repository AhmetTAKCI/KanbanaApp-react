

export const onDragEnd = (result: any, columns: any, setColumns: any) => {
	

	if (!result.destination) return;
	// Eğer sürüklenen öğenin bir "destination" (bırakılacağı hedef) yoksa (örneğin, kullanıcı öğeyi bırakmadan
	// sürükleme işlemini iptal ederse), fonksiyon hiçbir şey yapmadan geri döner.

	const { source, destination } = result;
	

	if (source.droppableId !== destination.droppableId) {
		// Eğer öğe farklı bir kolona bırakıldıysa (kaynak ve hedef kolonlar farklıysa) bu blok çalışır.

		const sourceColumn = columns[source.droppableId];
	
		
		const destColumn = columns[destination.droppableId];
		

		const sourceItems = [...sourceColumn.items];
		

		const destItems = [...destColumn.items];
		

		const [removed] = sourceItems.splice(source.index, 1);
		

		destItems.splice(destination.index, 0, removed);
		

		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		});
		
	} else {
		

		const column = columns[source.droppableId];
		

		const copiedItems = [...column.items];
		

		const [removed] = copiedItems.splice(source.index, 1);
		

		copiedItems.splice(destination.index, 0, removed);
		

		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		});
		// Kolon güncellenir ve öğenin yeni sırası kaydedilir.
	}
};
