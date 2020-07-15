import EditorJS from '@editorjs/editorjs';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomSelect from '../components/CustomSelect';

/**
 * Location search plugin for EditorJS
 */
class LocationSearch {
  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): EditorJS.ToolboxConfig {
    return {
      icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path d="M11 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
               <path d="M7.5 4h1v9a.5.5 0 0 1-1 0V4z"/>
               <path fill-rule="evenodd" d="M6.489 12.095a.5.5 0 0 1-.383.594c-.565.123-1.003.292-1.286.472-.302.192-.32.321-.32.339 0 .013.005.085.146.21.14.124.372.26.701.382.655.246 1.593.408 2.653.408s1.998-.162 2.653-.408c.329-.123.56-.258.701-.382.14-.125.146-.197.146-.21 0-.018-.018-.147-.32-.339-.283-.18-.721-.35-1.286-.472a.5.5 0 1 1 .212-.977c.63.137 1.193.34 1.61.606.4.253.784.645.784 1.182 0 .402-.219.724-.483.958-.264.235-.618.423-1.013.57-.793.298-1.855.472-3.004.472s-2.21-.174-3.004-.471c-.395-.148-.749-.336-1.013-.571-.264-.234-.483-.556-.483-.958 0-.537.384-.929.783-1.182.418-.266.98-.47 1.611-.606a.5.5 0 0 1 .595.383z"/>
             </svg>`,
      title: 'Location',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const options = [ {
      name: '#1',
      value: '1',
    },
    {
      name: '#2',
      value: '2',
    },
    {
      name: '#3',
      value: '3',
    } ];

    const element = document.createElement('div');

    element.className = 'location-search-container';
    ReactDOM.render(<CustomSelect options={options}/>, element);

    return element;
  }

  /**
   * Return information structure after save
   *
   * @param blockContent - content of plugin block
   */
  public save(blockContent: Element): object {
    return {
      locationId: 'id',
    };
  }
}

export default LocationSearch;
