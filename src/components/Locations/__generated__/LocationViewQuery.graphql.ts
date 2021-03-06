/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationViewQueryVariables = {
    id: string;
};
export type LocationViewQueryResponse = {
    readonly entity: {
        readonly " $fragmentRefs": FragmentRefs<"LocationInfo_data">;
    } | null;
};
export type LocationViewQuery = {
    readonly response: LocationViewQueryResponse;
    readonly variables: LocationViewQueryVariables;
};



/*
query LocationViewQuery(
  $id: ID!
) {
  entity: location(id: $id) {
    ...LocationInfo_data
    id
  }
}

fragment LocationInfo_data on Location {
  id
  coordinateX
  coordinateY
  ...LocationInstancesTabs_data
}

fragment LocationInstanceInfo_locationInstance on LocationInstance {
  id
  name
  description
  constructionDate
  demolitionDate
  startDate
  endDate
}

fragment LocationInstancesTabs_data on Location {
  instances {
    id
    name
    ...LocationInstanceInfo_locationInstance
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationViewQuery",
    "selections": [
      {
        "alias": "entity",
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LocationInfo_data"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationViewQuery",
    "selections": [
      {
        "alias": "entity",
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coordinateX",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coordinateY",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "instances",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "constructionDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demolitionDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "50d8da1d565baeda01d7092623cd2553",
    "id": null,
    "metadata": {},
    "name": "LocationViewQuery",
    "operationKind": "query",
    "text": "query LocationViewQuery(\n  $id: ID!\n) {\n  entity: location(id: $id) {\n    ...LocationInfo_data\n    id\n  }\n}\n\nfragment LocationInfo_data on Location {\n  id\n  coordinateX\n  coordinateY\n  ...LocationInstancesTabs_data\n}\n\nfragment LocationInstanceInfo_locationInstance on LocationInstance {\n  id\n  name\n  description\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n}\n\nfragment LocationInstancesTabs_data on Location {\n  instances {\n    id\n    name\n    ...LocationInstanceInfo_locationInstance\n  }\n}\n"
  }
};
})();
(node as any).hash = '326b4126ade982268a93e56c5c31bd26';
export default node;
