import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../../../store/store";
import { Trash2 } from "lucide-react";


export const LinkEditor = () => {
  const { links, addLink, updateLink, removeLink } = useEditorStore();

  return (
    <div className="space-y-4 mt-4 mb-5">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-800">Your Links</h3>
        <button
          onClick={() =>
            addLink({
              id: uuidv4(),
              title: "New Link",
              url: "",
              icon: "link",
            })
          }
          className="text-xs text-brown-600 hover:underline"
        >
          + Add Link
        </button>
      </div>

      {links.map((link) => (
        <div
          key={link.id}
          className="flex items-center gap-2 bg-white border px-3 py-2 rounded-md"
        >
          <input
            value={link.title}
            onChange={(e) => updateLink(link.id, { title: e.target.value })}
            placeholder="Link title"
            className="flex-1 text-sm outline-none"
          />
          <button onClick={() => removeLink(link.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};