/* eslint-disable react/prop-types */
import { ImageViewer } from "./image";
const Descriptions = ({ title, items, columns = 1 }) => {
  return (
    <div>
      {items && (Array.isArray(items) || items.length > 0) ? (
        <div>
          {title && (
            <div className="w-full mx-auto border bg-card text-card-foreground mb-2 px-6 py-3">
              {typeof title === "string" ? <span>{title}</span> : title}
            </div>
          )}
          <div className="w-full mx-auto rounded-b-lg border-b bg-card text-card-foreground">
            <div className={`grid grid-cols-${columns}`}>
              {items.map(({ key, label, children, type, isEditing, colspan, extras }, index) => (
                <div key={key || index} className={`${colspan && `col-span-${colspan}`} p-4 border`}>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
                    {extras && <div>{typeof extras === "string" ? <span>{extras}</span> : extras}</div>}
                  </div>

                  <div>
                    {isEditing ? (
                      children
                    ) : (
                      <div>
                        {type === "image" ? (
                          <div className="flex mt-1 gap-4 overflow-x-auto">
                            {Array.isArray(children) && children.length > 0 ? (
                              children.map((src, index) => {
                                return (
                                  <div key={index} className="flex-shrink-0">
                                    <a target="_blank" href={src} rel="noreferrer">
                                      <ImageViewer src={src} />
                                    </a>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-gray-400 mt-3 text-xs">No Media</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm mt-1 max-h-40 overflow-auto">
                            {typeof children === "string" ? <span>{children}</span> : children}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center m-4">
          <p>No Results</p>
        </div>
      )}
    </div>
  );
};

export { Descriptions };
