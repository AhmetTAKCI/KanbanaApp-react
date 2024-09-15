// eslint-disable-next-line @typescript-eslint/no-explicit-any
// TypeScript'te "any" tipi kullanımını önleyen kuralı devre dışı bırakıyoruz çünkü
// `result`, `columns` ve `setColumns` için kesin bir tip tanımlanmadığı için burada "any" kullanılıyor.

export const onDragEnd = (result: any, columns: any, setColumns: any) => {
	// onDragEnd fonksiyonu dışa aktarılıyor. Bu fonksiyon, sürükle-bırak işlemi
	// tamamlandığında çağrılır. "result", sürükleme işlemi sonucunda elde edilen bilgileri içerir.
	// "columns" mevcut kolonları temsil eder ve "setColumns" ise bu kolonları güncelleyen fonksiyondur.

	if (!result.destination) return;
	// Eğer sürüklenen öğenin bir "destination" (bırakılacağı hedef) yoksa (örneğin, kullanıcı öğeyi bırakmadan
	// sürükleme işlemini iptal ederse), fonksiyon hiçbir şey yapmadan geri döner.

	const { source, destination } = result;
	// result nesnesinden, öğenin nereden sürüklendiğini (source) ve nereye bırakıldığını (destination) alıyoruz.

	if (source.droppableId !== destination.droppableId) {
		// Eğer öğe farklı bir kolona bırakıldıysa (kaynak ve hedef kolonlar farklıysa) bu blok çalışır.

		const sourceColumn = columns[source.droppableId];
		// Kaynak kolon (öğenin sürüklendiği kolon) bulunur.
		
		const destColumn = columns[destination.droppableId];
		// Hedef kolon (öğenin bırakıldığı kolon) bulunur.

		const sourceItems = [...sourceColumn.items];
		// Kaynak kolondaki öğeler kopyalanır.

		const destItems = [...destColumn.items];
		// Hedef kolondaki öğeler kopyalanır.

		const [removed] = sourceItems.splice(source.index, 1);
		// Kaynak kolondan öğe, sürüklendiği konuma göre silinir. `splice`, öğeyi kaynak listedeki konumundan
		// çıkarır ve bu öğeyi "removed" değişkenine atar.

		destItems.splice(destination.index, 0, removed);
		// Aynı öğe, hedef kolondaki belirtilen konuma eklenir.

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
		// setColumns fonksiyonu, hem kaynak kolonu hem de hedef kolonu günceller.
		// Kaynak kolon, öğesi eksik olarak güncellenirken hedef kolon da öğesi eklenmiş olarak güncellenir.

	} else {
		// Eğer öğe aynı kolon içinde bırakıldıysa bu blok çalışır.

		const column = columns[source.droppableId];
		// Öğenin bırakıldığı kolon bulunur (hem kaynak hem hedef aynı kolon).

		const copiedItems = [...column.items];
		// Kolondaki öğeler kopyalanır.

		const [removed] = copiedItems.splice(source.index, 1);
		// Öğe, kopyalanan listedeki eski konumundan çıkarılır.

		copiedItems.splice(destination.index, 0, removed);
		// Aynı öğe, kolon içindeki yeni konumuna eklenir.

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
