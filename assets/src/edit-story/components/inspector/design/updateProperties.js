/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { MULTIPLE_VALUE } from '../../form';

/**
 * @param {Object} currentProperties The existing element properties.
 * @param {Object|function(Object):Object} newPropertiesOrUpdater Either a map
 * of the updated properties or a function that will return a map of the updated
 * properties.
 * @param {boolean} commitValues Whether the values are finalized, such as
 * "multi" values are removed.
 * @return {Object} The updated properties.
 */
function updateProperties(
  currentProperties,
  newPropertiesOrUpdater,
  commitValues
) {
  const newProperties =
    typeof newPropertiesOrUpdater === 'function'
      ? newPropertiesOrUpdater(currentProperties)
      : newPropertiesOrUpdater;
  if (!newProperties) {
    return {};
  }

  // Filter out empty properties ("multiple" values specifically).
  let updatedKeys = Object.keys(newProperties);
  if (commitValues) {
    updatedKeys = updatedKeys.filter(
      (key) => newProperties[key] !== MULTIPLE_VALUE
    );
  }
  if (updatedKeys.length === 0) {
    // Of course abort if no keys have a value
    return {};
  }

  const properties = Object.fromEntries(
    updatedKeys.map((key) => [key, newProperties[key]])
  );
  return properties;
}

export default updateProperties;
