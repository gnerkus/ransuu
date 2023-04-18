type NodeTextInputProps = {
  value: string;
  handleId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function NodeTextInput({
  value,
  handleId,
  onChange,
}: NodeTextInputProps) {
  return (
    <div className="flex gap-2 hover:bg-gray-300">
      <p className="pl-4 py-1">{handleId}</p>
      <input
        type="number"
        inputMode="numeric"
        pattern="\d"
        onChange={onChange}
        value={value}
        className="nodrag appearance-none text-end pr-4 max-w-[128px] bg-transparent"
      />
    </div>
  );
}
