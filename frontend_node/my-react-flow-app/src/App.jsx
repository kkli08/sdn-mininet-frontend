// From Reactflow Drag and Drop Example
// https://reactflow.dev/examples/interaction/drag-and-drop

import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './index.css';

// custom nodes: https://reactflow.dev/learn/customization/custom-nodes
import { hostGroupsNodes, routerNodes, coreSwitchNodes } from './componentNodes';
import './componentNodes.css';

const initialNodes = [
  {
    id: 'sdn_controller',
    type: 'input',
    data: {
        label: 'SDN Controller'
    },
    position: { x: 250, y: 0 },
  },
  {
    id: 'core_switch',
    type: 'coreSwitch',
    data: {
        label: 'Core Switch'
    },
    position: { x: 250, y: 100 },
  },
];

const initialEdges = [
    {
        id: 'init_edge',
        source: 'sdn_controller',
        target: 'core_switch'
    }
]

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
    hostGroups: hostGroupsNodes,
    router: routerNodes,
    coreSwitch: coreSwitchNodes,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      var node_label = type;
      if (type == 'input') {
        node_label = "SDN Controller";
      } else if (type == "default") {
        node_label = "OpenFlow Switch";
      } else if (type == "hostGroups" ) {
        node_label = "Number of Host(s): ";
      } else if (type == "router"){
        node_label = "Router";
      } else if (type == "coreSwitch") {
        node_label = "Core Switch";
      } else {
        alert("TO BE IMPLEMENTED!");
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: node_label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div className="dndflow" style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
