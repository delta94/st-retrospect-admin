import React, {ReactElement} from 'react';
import {createPaginationContainer, QueryRenderer} from 'react-relay';
import {PersonsPageQuery} from './__generated__/PersonsPageQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {ENTITIES_PER_PAGE} from '../../constants';
import EntitiesList from "../TableView/EntitiesList";

/**
 * Page for displaying persons
 */
export default function PersonsPage(): ReactElement {
  return (
    <QueryRenderer<PersonsPageQuery>
      environment={environment}
      query={graphql`
          query PersonsPageQuery (
            $first: Int,
            $after: Cursor
          ) {
             ...PersonsList_personsConnection @arguments(first: $first, after: $after)
          }
        `}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
      render={({error, props}): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading persons...</div>;
        }
        return createPaginationContainer(
          EntitiesList,
          {
            entityConnection: graphql`
              fragment PersonsList_personsConnection on Query @argumentDefinitions (
                first: {type: "Int", defaultValue: 10}
                after: {type: "Cursor"}
              ) {
                entities: persons(
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
                }}
              />
  );
}
