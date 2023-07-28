import "@potzblitz/components/src/scss/ColorPicker.scss";
import { ColorPickerProps, uniqueName } from "@potzblitz/components/src/api";
import React, { useState } from "react";

export interface ReactColorPickerProps extends ColorPickerProps {
  value: string;
}

export function ColorPicker(props: ReactColorPickerProps) {
  const [idStr, _id] = uniqueName(props.label);
  const [vO, setVO] = useState<string>(props.value);

  const handleColorChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setVO(target.value);
    props.onSelect && props.onSelect(target.value);
  };

  return (
    <div className="colorpicker">
      {props.label && <label htmlFor={idStr}>{props.label}</label>}
      <input id={idStr} type="color" value={vO} onInput={handleColorChange} />
      <label className="color-preview-wrapper" htmlFor={idStr}>
        <div
          className="color-preview"
          style={{ backgroundColor: vO, color: vO }}
        />
      </label>
    </div>
  );
}
