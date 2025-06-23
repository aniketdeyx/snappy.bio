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
              label: "",
              url: "",
              icon: "link",
            })
          }
          className="text-xs text-brown-600 hover:underline"
        >
          + Add Link
        </button>
      </div>

      {links?.map((link) => (
        <div
          key={link.id}
          className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center bg-white border px-3 py-2 rounded-md"
        >
          {/* Label Field */}
          <input
            type="text"
            value={link.label}
            onChange={(e) =>
              updateLink(link.id, { label: e.target.value })
            }
            placeholder="title"
            className="text-sm px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
          />

          {/* URL Field */}
          <input
            type="url"
            value={link.url}
            onChange={(e) =>
              updateLink(link.id, { url: e.target.value })
            }
            placeholder="https://example.com"
            className="text-sm px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
          />

          {/* Delete Button */}
          <button onClick={() => removeLink(link.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};
