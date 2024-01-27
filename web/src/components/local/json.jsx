/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@/components/ui/button";
import { useDebouncedFunction } from "@/hooks/useDebounced";
import { Textarea } from "@/components/ui/textarea";

export function JsonEditor({ data, update }) {
  const [newKey, setNewKey] = React.useState("");
  const [newValue, setNewValue] = React.useState("");

  update = useDebouncedFunction(update);

  const handleAddField = () => {
    if (newKey && !data.hasOwnProperty(newKey)) {
      if (Array.isArray(data)) {
        update([...data, { [newKey]: newValue }]);
      } else if (typeof data === "object") {
        update({ ...data, [newKey]: newValue });
      }
      setNewKey("");
      setNewValue("");
    }
  };

  return (
    <div>
      <div>
        {data.length > 0 && Array.isArray(data)
          ? data.map((obj, arrayIndex) => {
              return (
                <div key={arrayIndex}>
                  {Object.entries(obj).map(([key, value], objectIndex) => (
                    <div className="p-4" key={objectIndex}>
                      <Textarea
                        className="mt-2"
                        type="text"
                        value={key}
                        onChange={(e) => {
                          const newData = [...data];
                          newData[arrayIndex] = { [e.target.value]: value };
                          update(newData);
                        }}
                      />
                      <Textarea
                        className="mt-2 "
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const newData = [...data];
                          newData[arrayIndex] = { [key]: e.target.value };
                          update(newData);
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })
          : typeof data === "object" &&
            Object.entries(data).map(([key, value], index) => {
              return (
                <div className="p-4" key={index}>
                  <Textarea
                    className="mt-2 "
                    type="text"
                    value={key}
                    onChange={(e) => {
                      const newData = Object.entries(data);
                      newData[index] = [e.target.value, value];
                      update(Object.fromEntries(newData));
                    }}
                  />
                  <Textarea
                    className="mt-2 "
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const newData = { ...data, [key]: e.target.value };
                      update(newData);
                    }}
                  />
                </div>
              );
            })}
      </div>
      <div className="p-4 w-full">
        <div>
          <div className="w-full">
            <label className="text-xs">Key</label>
            <Textarea
              className="mt-2 "
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Value</label>
            <Textarea
              className="mt-2 "
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-2 text-xs h-6" onClick={handleAddField}>
          Add
        </Button>
      </div>
    </div>
  );
}

export function JsonViewer({ data }) {
  if (Array.isArray(data)) {
    return data
      .map((obj) =>
        Object.entries(obj)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(" , ")}`;
            } else {
              return `${key}: ${value}`;
            }
          })
          .join(" , ")
      )
      .join(" , ");
  } else if (typeof data === "object") {
    return Object.entries(data)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(" , ")}`;
        } else {
          return `${key}: ${value}`;
        }
      })
      .join(" , ");
  }
}
