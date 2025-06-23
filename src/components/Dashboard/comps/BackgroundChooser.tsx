import { useEditorStore } from "../../../store/store";


export const BackgroundChooser = () => {
  const { backgroundColor, setBackgroundColor } = useEditorStore();
  const colors = ["#fef3c7", "#fcd34d", "#fbbf24", "#a16207", "#78350f"];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-800">
        Background Color
      </label>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBackgroundColor( color)}
            className={`w-8 h-8 rounded-full border-2 ${
              backgroundColor === color ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};