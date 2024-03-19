import React, { useCallback } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import { Button, Flex } from 'antd';
import 'reactflow/dist/style.css';
import './sdngraph.css';

const initialNodes = [
    { id: 's1', position: { x: 300, y: 50 }, data: { label: 'Switch 1' } },
    { id: 'r1', position: { x: 150, y: 200 }, data: { label: 'Router 1' } },
];

const initialEdges = [{ id: 'es1-r1', source: 's1', target: 'r1' }];

function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    
    const addNode = useCallback((type) => {
        const typeInitial = type.charAt(0).toLowerCase(); // 's' for Switch, 'r' for Router, 'h' for Host
        const filteredNodes = nodes.filter(node => node.id.startsWith(typeInitial));
        const maxNumber = filteredNodes.reduce((max, node) => {
            const currentNumber = parseInt(node.id.slice(1), 10);
            return currentNumber > max ? currentNumber : max;
        }, 0);
        const newNumber = maxNumber + 1;
        const newNodeId = `${typeInitial}${newNumber}`;
        const newNode = {
            id: newNodeId,
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Adjust position logic as needed
            data: { label: `${type} ${newNumber}` },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [nodes, setNodes]);

    return (
        <div>
            <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            </div>

            <div className='buttonGroup'>
                <Button type="primary" onClick={() => addNode('Switch')}>Switch</Button>
                <Button type="primary" onClick={() => addNode('Router')}>Router</Button>
                <Button type="primary" onClick={() => addNode('Host')}>Host</Button>
            </div>
            
        </div>
        
    );
    }
  
  export default Flow;
