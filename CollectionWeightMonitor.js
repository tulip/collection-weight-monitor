import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

function getAllCollections() {
  return _(Meteor.connection._stores)
    .filter((store, name) => !name.startsWith('meteor_'))
    .map(store => store._getCollection())
    .value();
}

function getCollectionWeights() {
  return _(getAllCollections())
    .map(collection => [collection._name, collection.find().count()])
    .fromPairs()
    .value();
}

let monitorInterval;

const CollectionWeightMonitor = {
  get() {
    const tableData = _(getCollectionWeights())
      // format as { [name]: { [column name]: [value]}}
      .map((newCount, collectionName) => [
        collectionName,
        {
          count: newCount,
        },
      ])
      // sort the array descending
      .sortBy(([, { count }]) => -count)
      // convert to an object
      .fromPairs()
      .value();

    console.table(tableData);
  },

  monitor(interval = 3000) {
    CollectionWeightMonitor.stopMonitor();

    let lastWeights = {};
    monitorInterval = setInterval(() => {
      const newWeights = getCollectionWeights();

      const tableData = _(newWeights)
        // format as { [name]: { [column name]: [value]}}
        .map((newCount, collectionName) => [
          collectionName,
          {
            count: newCount,
            previousCount: lastWeights[collectionName] || 0,
            delta: (newCount - (lastWeights[collectionName] || 0)),
          },
        ])
        // sort descending by delta
        .sortBy(([, { delta }]) => -delta)
        .fromPairs()
        .value();

      lastWeights = newWeights;

      // print the table data if there have been changes
      if (_.some(tableData, ({ delta }) => delta !== 0)) {
        console.table(tableData);
      }
    }, interval);
  },

  stopMonitor() {
    clearInterval(monitorInterval);
  },
};

export default CollectionWeightMonitor;
