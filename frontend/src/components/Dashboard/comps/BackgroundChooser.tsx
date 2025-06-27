import { useEditorStore } from "../../../store/store";

interface InputStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
  placeholderColor: string;
  labelColor: string;
}

interface BackgroundChooserProps {
  inputStyles: InputStyles;
}

export const BackgroundChooser = ({ inputStyles }: BackgroundChooserProps) => {
  const { backgroundColor, setBackgroundColor } = useEditorStore();

  return (
    <div className="space-y-3">
      <label 
        className="block text-sm font-medium transition-colors"
        style={{ color: inputStyles.labelColor }}
      >
        Background Color
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={backgroundColor || "#ffffff"}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-12 h-12 rounded-lg border-2 cursor-pointer hover:border-gray-400 transition-colors"
          style={{ borderColor: inputStyles.borderColor }}
          title="Choose background color"
        />
        <div className="flex flex-col">
          <span 
            className="text-sm transition-colors"
            style={{ color: inputStyles.labelColor }}
          >
            Selected Color:
          </span>
          <span 
            className="text-sm font-mono transition-colors"
            style={{ color: inputStyles.color }}
          >
            {backgroundColor || "#ffffff"}
          </span>
        </div>
      </div>
    </div>
  );
};