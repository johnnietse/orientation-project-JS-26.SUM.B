import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ItemCard({ item, type, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const fields =
    type === "experience"
      ? ["title", "company"]
      : type === "education"
      ? ["course", "school"]
      : ["name", "proficiency"];

  return (
    <div ref={setNodeRef} style={style} className="itemCard">
      <div className="itemHeader">
        <span className="dragHandle" {...attributes} {...listeners}>
          ⠿
        </span>
        <div className="itemInfo">
          {fields.map((f) => (
            <span key={f}>
              <strong>{f.replace("_", " ")}:</strong> {item[f] || "—"}
            </span>
          ))}
        </div>
        <div className="itemActions">
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item.id)} className="deleteBtn">
            Delete
          </button>
        </div>
      </div>
      {item.logo && <img src={item.logo} alt="" className="itemLogo" />}
    </div>
  );
}
