Collection Weight Monitor
====================

Collection Weight Monitor is a client-side utility for watching the size of subscribed publications.

There are two ways to use the Collection Weight Monitor:

1) `CollectionWeightMonitor.get()` prints a table of how large your collections are.

2) `CollectionWeightMonitor.monitor(interval)` will periodically print out a report of how large
your collections are. `interval` is in milliseconds and defaults to 3000.


Why?
====================

With the exception of `_id` lookups, minimongo is slow. Query times scale linearly with collection
size, so limiting the number of published records is critical to performance.

Example Output
====================

In your browser console:

`> CollectionWeightMonitor.get()`

| (index) | count |
| --- | --- |
| ProcessVersionSets | 135 |
| ProcessGroups | 112 |
| FeatureFlagValues | 29 |
| users | 27 |
| Connectors | 12 |
| ACLResources | 0 |
| Analyses | 0 |
| AnalysesAccessLogs | 0 |



`> CollectionWeightMonitor.monitor()`

| (index) | count | previousCount | delta |
| --- | --- | --- | --- |
| ProcessVersionSets | 135 | 0 | 135 |
| ProcessGroups | 112 | 0 | 112 |
| FeatureFlagValues | 29 | 0 | 29 |
| users | 27 | 0 | 27 |
| Connectors | 12 | 0 | 12 |
| ACLResources | 0 | 0 | 0 |
| Analyses | 0 | 0 | 0 |
| AnalysesAccessLogs | 0 | 0 | 0 |


| (index) | count | previousCount | delta |
| --- | --- | --- | --- |
| ProcessVersionSets | 25 | 135 | -110 |
| ProcessGroups | 10 | 112 | -102 |
| FeatureFlagValues | 29 | 29 | 0 |
| users | 27 | 38 | 9 |
| Connectors | 12 | 12 | 0 |
| ACLResources | 0 | 0 | 0 |
| Analyses | 0 | 0 | 0 |
| AnalysesAccessLogs | 0 | 0 | 0 |

`> CollectionWeightMonitor.stopMonitor()`

License
====================

collection-weight-monitor is licensed under the [Apache Public License](LICENSE).


Who's Behind It
====================

Collection Weight Monitor is maintained by Tulip. Tulip is transforming manufacturing processes by bringing the latest technological advances from the lab to the shop floor. Whereas most factories are still using state of the art technology from the mid 19th century, we come from the future to bring them a rich, realtime web app, modern tablets, IoT systems, in-depth analytics, and more.

We do web development (with Meteor+React+Redux), IoT/embedded software, computer vision, data engineering, technical operations / DevOps, web-based UI design, and anything else we need to make the best product possible. Sound interesting? Email us at jobs@tulip.co.
