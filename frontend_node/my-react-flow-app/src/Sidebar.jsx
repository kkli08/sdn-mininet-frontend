import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        SDN Controller
      </div>
      <div className="dndnode coreswitch" onDragStart={(event) => onDragStart(event, 'coreSwitch')} draggable>
        Core Switch
      </div>
      <div className="dndnode router" onDragStart={(event) => onDragStart(event, 'router')} draggable>
        Router
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        OpenFlow Switch
      </div>
      <div className="dndnode host" onDragStart={(event) => onDragStart(event, 'hostGroups')} draggable>
        Host Groups
      </div>
    </aside>
  );
};
