import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../../../store/store";
import { Trash2 } from "lucide-react";

interface InputStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
  placeholderColor: string;
  labelColor: string;
}

interface LinkEditorProps {
  inputStyles: InputStyles;
}

export const LinkEditor = ({ inputStyles }: LinkEditorProps) => {
  const { links, addLink, updateLink, removeLink } = useEditorStore();

  return (
    <div className="space-y-4 mt-4 mb-5">
      <div className="flex justify-between items-center">
        <h3 
          className="text-sm font-medium transition-colors"
          style={{ color: inputStyles.labelColor }}
        >
          Your Links
        </h3>
        <button
          onClick={() =>
            addLink({
              id: uuidv4(),
              label: "",
              url: "",
              icon: "link",
            })
          }
          className="text-xs hover:underline transition-colors"
          style={{ color: inputStyles.labelColor }}
        >
          + Add Link
        </button>
      </div>

      {links?.map((link) => (
        <div
          key={link.id}
          className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center border px-3 py-2 rounded-md transition-colors"
          style={{ 
            backgroundColor: inputStyles.backgroundColor,
            borderColor: inputStyles.borderColor
          }}
        >
          {/* Label Field */}
          <input
            type="text"
            value={link.label}
            onChange={(e) =>
              updateLink(link.id, { label: e.target.value })
            }
            placeholder="title"
            className="text-sm px-2 py-1 rounded-md border focus:outline-none transition-colors"
            style={{ 
              backgroundColor: inputStyles.backgroundColor,
              color: inputStyles.color,
              borderColor: inputStyles.borderColor
            }}
          />

          {/* URL Field */}
          <input
            type="url"
            value={link.url}
            onChange={(e) =>
              updateLink(link.id, { url: e.target.value })
            }
            placeholder="https://example.com"
            className="text-sm px-2 py-1 rounded-md border focus:outline-none transition-colors"
            style={{ 
              backgroundColor: inputStyles.backgroundColor,
              color: inputStyles.color,
              borderColor: inputStyles.borderColor
            }}
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
