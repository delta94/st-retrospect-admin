import React, { ReactElement } from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsList_personsConnection as PersonsConnection } from './__generated__/PersonsList_personsConnection.graphql';
import { ENTITIES_PER_PAGE } from '../../constants';
import './PersonsList.css';

/**
 * Props for PersonsList component
 */
interface Props {
  /**
   * Persons connection
   */
  personsConnection: PersonsConnection;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
function PersonsList(props: Props): ReactElement<Props> {
  const loadMore = (): void => {
    props.relay.loadMore(ENTITIES_PER_PAGE);
  };

  return (
    <div className={'persons-page'}>
      <div className={'persons-page__page-control'}>
        {props.personsConnection.persons.totalCount}
        <button onClick={loadMore}>Load more</button>
        <input type="text"/>
      </div>
      <table className={'persons-page__table'}>
        <thead>
          <tr>
            <th>№</th>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>patronymic</th>
          </tr>
        </thead>
        <tbody>
          {props.personsConnection.persons.edges.map((person, index) => {
            return (
              <>
                <tr key={person.node.id}>
                  <td>{index + 1}</td>
                  <td>{person.node.id}</td>
                  <td>{person.node.firstName}</td>
                  <td>{person.node.lastName}</td>
                  <td>{person.node.patronymic}</td>
                </tr>
                {(index + 1) % 25 === 0 &&
                  <tr>
                    <td colSpan={4}>Page number {(index + 1) / 25 + 1}</td>
                  </tr>
                }
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default createPaginationContainer(PersonsList,
  {
    personsConnection: graphql`
      fragment PersonsList_personsConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        persons(
          first: $first
          after: $after
        ) @connection(key: "PersonsList_persons") {
          totalCount
          edges {
            node {
              id
              firstName
              lastName
              patronymic
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query PersonsListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...PersonsList_personsConnection @arguments(first: $first, after: $after)
      }
    `,
    getVariables(props, paginationInfo) {
      return {
        first: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);
