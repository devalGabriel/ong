export default function SettingsField({ field, value }) {
  const inputId = `settings-${field.key}`;
  const commonProps = { id: inputId, name: field.key, maxLength: field.maxLength, defaultValue: value };

  if (field.type === "textarea") {
    return <textarea rows={3} {...commonProps} />;
  }

  if (field.type === "select") {
    return (
      <select id={inputId} name={field.key} defaultValue={value}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  const htmlType = field.type === "iban" ? "text" : field.type;
  return <input type={htmlType} {...commonProps} />;
}
