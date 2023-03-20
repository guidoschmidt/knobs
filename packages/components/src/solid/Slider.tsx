import "../scss/Slider.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { SliderProps, uniqueName } from "../api";
import { CopyValueButton, ValueView } from "./blocks";

export function Slider(props: SliderProps) {
  const mprops: SliderProps = mergeProps(
    {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      onUpdate: () => {},
      onBlur: () => {},
      showCopyButton: false,
    },
    props
  );

  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  const handleInput = (e: InputEvent): number => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const newValue = parseFloat(value);
    setVO(newValue);
    return newValue;
  };

  createEffect(() => {
    setVO(mprops.value);
  });

  return (
    <div classList={{ slider: true, ...mprops.classList }} id={idStr}>
      {mprops.label && <label>{mprops.label}</label>}
      <input
        type="range"
        value={vO()}
        min={mprops.min}
        max={mprops.max}
        step={mprops.step}
        onInput={(e: InputEvent) =>
          mprops.onUpdate && mprops.onUpdate(handleInput(e))
        }
        onPointerUp={(e: InputEvent) =>
          mprops.onBlur && mprops.onBlur(handleInput(e))
        }
      />
      <ValueView value={vO()} />
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}
