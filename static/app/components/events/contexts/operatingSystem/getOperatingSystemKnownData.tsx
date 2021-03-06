import {getMeta} from 'sentry/components/events/meta/metaProxy';
import {KeyValueListData} from 'sentry/types';
import {defined} from 'sentry/utils';

import getOperatingSystemKnownDataDetails from './getOperatingSystemKnownDataDetails';
import {OperatingSystemKnownData, OperatingSystemKnownDataType} from './types';

function getOperatingSystemKnownData(
  data: OperatingSystemKnownData,
  operatingSystemKnownDataValues: Array<OperatingSystemKnownDataType>
): KeyValueListData {
  const knownData: KeyValueListData = [];

  const dataKeys = operatingSystemKnownDataValues.filter(operatingSystemKnownDataValue =>
    defined(data[operatingSystemKnownDataValue])
  );

  for (const key of dataKeys) {
    const knownDataDetails = getOperatingSystemKnownDataDetails(
      data,
      key as OperatingSystemKnownDataType
    );

    knownData.push({
      key,
      ...knownDataDetails,
      meta: getMeta(data, key),
    });
  }
  return knownData;
}

export default getOperatingSystemKnownData;
