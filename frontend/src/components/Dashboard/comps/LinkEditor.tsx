import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../../../store/store";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { linkSchema, validateField } from "../../../lib/validations";

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
  const [validationErrors, setValidationErrors] = useState<Record<string, { label?: string; url?: string }>>({});

  const validateLinkField = (linkId: string, field: 'label' | 'url', value: string) => {
    const validation = validateField(linkSchema.shape[field], value);
    
    setValidationErrors(prev => ({
      ...prev,
      [linkId]: {
        ...prev[linkId],
        [field]: validation.isValid ? undefined : validation.error
      }
    }));

    // Clean up empty error objects
    if (!validation.error) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[linkId] && !newErrors[linkId].label && !newErrors[linkId].url) {
          delete newErrors[linkId];
        }
        return newErrors;
      });
    }
  };

  const handleLabelChange = (linkId: string, value: string) => {
    updateLink(linkId, { label: value });
    validateLinkField(linkId, 'label', value);
  };

  const handleUrlChange = (linkId: string, value: string) => {
    updateLink(linkId, { url: value });
    validateLinkField(linkId, 'url', value);
  };

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
        <div key={link.id} className="space-y-2">
          <div
            className="grid grid-cols-[1fr_2fr_auto] gap-2 items-start border px-3 py-2 rounded-md transition-colors"
            style={{ 
              backgroundColor: inputStyles.backgroundColor,
              borderColor: inputStyles.borderColor
            }}
          >
            {/* Label Field */}
            <div>
              <input
                type="text"
                value={link.label}
                onChange={(e) => handleLabelChange(link.id, e.target.value)}
                placeholder="title"
                className={`text-sm px-2 py-1 rounded-md border focus:outline-none transition-colors w-full ${
                  validationErrors[link.id]?.label ? 'border-red-500' : ''
                }`}
                style={{ 
                  backgroundColor: inputStyles.backgroundColor,
                  color: inputStyles.color,
                  borderColor: validationErrors[link.id]?.label ? '#ef4444' : inputStyles.borderColor
                }}
              />
              {validationErrors[link.id]?.label && (
                <p className="text-red-500 text-xs mt-1">{validationErrors[link.id]?.label}</p>
              )}
            </div>

            {/* URL Field */}
            <div>
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleUrlChange(link.id, e.target.value)}
                placeholder="https://example.com"
                className={`text-sm px-2 py-1 rounded-md border focus:outline-none transition-colors w-full ${
                  validationErrors[link.id]?.url ? 'border-red-500' : ''
                }`}
                style={{ 
                  backgroundColor: inputStyles.backgroundColor,
                  color: inputStyles.color,
                  borderColor: validationErrors[link.id]?.url ? '#ef4444' : inputStyles.borderColor
                }}
              />
              {validationErrors[link.id]?.url && (
                <p className="text-red-500 text-xs mt-1">{validationErrors[link.id]?.url}</p>
              )}
            </div>

            {/* Delete Button */}
            <button onClick={() => removeLink(link.id)} className="mt-1">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
