import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";

export default function ResumeSection({
  title,
  items,
  type,
  onDelete,
  onReorder,
}) {
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    onReorder(reordered);
  }

  return (
    <div className="resumeSection">
      <div className="sectionHeader">
        <h2>{title}</h2>
        <button onClick={() => navigate(`/${type}/new`)}>Add {type}</button>
      </div>
      {items.length === 0 ? (
        <p className="emptyState">No {type} added yet.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                type={type}
                onEdit={(i) => navigate(`/${type}/${i.id}/edit`)}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
