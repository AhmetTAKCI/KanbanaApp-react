/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; 
// DragDropContext, Droppable ve Draggable bileşenlerini react-beautiful-dnd kütüphanesinden içe aktarır. Bunlar sürükle-bırak işlevselliği sağlar.

import { useState } from "react"; 
// useState, React'te state yönetimi için kullanılan bir hook'tur.

import { Board } from "../../data/board"; 
// Board verisini içe aktarır, bu bir Kanban board'u gibi yapıları içeriyor olabilir.

import { Columns } from "../../types"; 
// Columns tipi import edilmiştir. Bu, board'un sütunlarının yapısını tanımlayan bir tip olabilir.

import { onDragEnd } from "../../helpers/onDragEnd"; 
// Sürükle-bırak işlemi sona erdiğinde ne olacağını tanımlayan yardımcı fonksiyon.

import { AddOutline } from "react-ionicons"; 
// AddOutline, React-Ionicons kütüphanesinden ekle simgesi.

import AddModal from "../../components/Modals/AddModal"; 
// AddModal bileşenini modal penceresi olarak kullanır.

import Task from "../../components/Task"; 
// Task bileşeni her bir görevi göstermek için kullanılır.

const Home = () => {
	// Home bileşeni, ana sayfa veya kanban board'unu temsil eder.

	const [columns, setColumns] = useState<Columns>(Board); 
	// State olarak columns, board'un mevcut durumunu içerir ve başlangıçta Board verisi ile başlatılır.

	const [modalOpen, setModalOpen] = useState(false); 
	// modalOpen state'i, modalın açık olup olmadığını yönetir.

	const [selectedColumn, setSelectedColumn] = useState(""); 
	// Hangi sütuna görev ekleneceğini takip eden state.

	const openModal = (columnId: any) => {
		// Modalı açar ve seçilen sütunu belirler.
		setSelectedColumn(columnId);
		setModalOpen(true);
	};

	const closeModal = () => {
		// Modalı kapatır.
		setModalOpen(false);
	};

	const handleAddTask = (taskData: any) => {
		// Yeni bir görev eklemek için kullanılan fonksiyon.
		const newBoard = { ...columns }; 
		// Mevcut board'un bir kopyasını oluşturur.
		newBoard[selectedColumn].items.push(taskData); 
		// Seçilen sütunun items listesine yeni görevi ekler.
	};

	return (
		<>
			{/* DragDropContext bileşeni, sürükle-bırak işleminin bağlamını sağlar. */}
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				
				<div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="w-full flex flex-col gap-0"
							key={columnId}
						>
							{/* Droppable bileşeni, sürüklenebilir öğelerin bırakılabileceği bir alan tanımlar. */}
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
									>
										
										<div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
											{column.name}
										</div>

										{/* Sütunun içindeki her bir görev burada oluşturulur. */}
										{column.items.map((task: any, index: any) => (
											<Draggable
												key={task.id.toString()}
												draggableId={task.id.toString()}
												index={index}
											>
												{(provided: any) => (
													<>
														{/* Her bir görev için Task bileşeni kullanılır. */}
														<Task
															provided={provided}
															task={task}
														/>
													</>
												)}
											</Draggable>
										))}
										{provided.placeholder} 
										{/* Bu, sürükleme sırasında boş alanı temsil eder. */}
									</div>
								)}
							</Droppable>

							{/* Sütuna yeni bir görev eklemek için tıklanabilir buton */}
							<div
								onClick={() => openModal(columnId)}
								className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
							>
								<AddOutline color={"#555"} />
								Add Card
							</div>
						</div>
					))}
				</div>
			</DragDropContext>

			{/* Görev eklemek için kullanılan modal bileşeni */}
			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
			/>
		</>
	);
};

export default Home; 
// Home bileşenini dışa aktarır, böylece başka dosyalarda kullanılabilir.
