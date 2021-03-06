import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import EditorJS, { BlockToolConstructable, OutputBlockData, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import LocationSearch from '../../editorjs-plugins/LocationSearch';
import { EntityInfoComponentProps, OmitId, Quest } from '../../types/entities';

/**
 * Generates empty quest
 */
export function generateQuest(): OmitId<Quest> {
  return {
    name: '',
    description: '',
    type: 'QUIZ',
    data: {
      time: null,
      version: null,
      blocks: [],
    },
  };
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function QuestInfo(props: EntityInfoComponentProps<OmitId<Quest>>): React.ReactElement {
  const editorRef = useRef<EditorJS>();
  const editorElementRef = useRef<HTMLDivElement>(null);
  const onChange = props.onChange || ((e: OmitId<Quest>): void => { /* do nothing */ });

  const onEditorChangeCallback = useRef<(data: OutputData) => Promise<void>>();

  useEffect(() => {
    onEditorChangeCallback.current = async (editorData: OutputData) => {
      onChange({
        ...props.entity,
        data: {
          time: null,
          version: '',
          ...editorData,
        },
      });
    };
  }, [ props.entity ]);

  useEffect(() => {
    if (editorElementRef.current) {
      editorRef.current = new EditorJS({
        holder: editorElementRef.current,
        placeholder: 'Click here to write an awesome route!',
        data: {
          blocks: (props.entity.data?.blocks || []) as OutputBlockData[],
          time: props.entity.data?.time || undefined,
          version: props.entity.data?.version || undefined,
        },
        tools: {
          header: Header,
          list: List,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: process.env.REACT_APP_API_ENDPOINT + 'upload/route', // Your backend file uploader endpoint
              },
            },
          },
          delimiter: Delimiter,
          quote: Quote,
          marker: Marker,
          locationInstance: LocationSearch as unknown as BlockToolConstructable,
        },
        async onChange(api): Promise<void> {
          onEditorChangeCallback.current && onEditorChangeCallback.current(await api.saver.save());
        },
      });
    }
  }, []);

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor='name'>Name</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='name'
          name='name'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              name: e.target.value,
            });
          }}
          required
          type='text'
          value={props.entity.name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control
          as='textarea'
          disabled={props.viewOnly}
          id='description'
          name='description'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            onChange({
              ...props.entity,
              description: e.target.value,
            });
          }}
          required
          rows={15}
          value={props.entity.description || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='photo'>Photo</Form.Label>
        <Form.File
          disabled
          id='photo'
          name='photo'
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor=''>Type</Form.Label>
        <div>
          <Form.Check
            checked={props.entity.type === 'QUIZ'}
            disabled={props.viewOnly}
            id='quiz'
            inline
            label='Quiz'
            name='type'
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              onChange({
                ...props.entity,
                type: 'QUIZ',
              });
            }}
            required
            type='radio'
            value='QUIZ'
          />
          <Form.Check
            checked={props.entity.type === 'ROUTE'}
            disabled={props.viewOnly}
            id='route'
            inline
            label='Route'
            name='type'
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              onChange({
                ...props.entity,
                type: 'ROUTE',
              });
            }}
            required
            type='radio'
            value='ROUTE'
          />
        </div>
      </Form.Group>
      <Form.Group>
        <h2>Route content</h2>
        <div style={{
          borderRadius: '8px',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 36px 0px',
        }}>
          <div
            ref={editorElementRef}
          />
        </div>
        <button onClick={async (): Promise<void> => console.log(await editorRef.current?.save())}>Test save</button>
      </Form.Group>
    </div>
  );
}
