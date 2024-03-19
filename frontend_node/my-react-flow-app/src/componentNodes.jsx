import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export function hostGroupsNodes({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="host-group-nodes">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Number of Host(s):</label>
        <input id="text" name="numHosts" onChange={onChange} className="nodrag" />
      </div>
    </div>
  );
}

export function routerNodes({ data, isConnectable }) {
  return (
    <div className="router-nodes">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label>Router</label>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}

export function coreSwitchNodes({ data, isConnectable }) {
  return (
    <div className="core-switch-nodes">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label>Core Switch</label>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}