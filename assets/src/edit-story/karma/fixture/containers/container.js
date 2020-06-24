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
 * External dependencies
 */
import { getByRole, queryByRole } from '@testing-library/react';

export class Container {
  /**
   * @param {Element} node
   * @param {string} path
   */
  constructor(node, path) {
    this._node = node;
    this._path = path;
  }

  get node() {
    return this._node;
  }

  get path() {
    return this._path;
  }

  /**
   * See https://testing-library.com/docs/dom-testing-library/api-queries#byrole
   *
   * @param {string} role
   * @param {Object} options
   */
  getByRole(role, options) {
    return getByRole(this._node, role, options);
  }

  /**
   * See https://testing-library.com/docs/dom-testing-library/api-queries#byrole
   *
   * @param {string} role
   * @param {Object} options
   */
  queryByRole(role, options) {
    return queryByRole(this._node, role, options);
  }

  _get(node, name, constr) {
    if (!node) {
      return null;
    }
    const path = `${this._path}.${name}`;
    const key = `FixturePath(${path})`;
    if (!node[key]) {
      node[key] = new constr(node, path);
    }
    return node[key];
  }

  _getAll(nodeList, nameFn, constr) {
    return Array.from(nodeList).map((node) =>
      this._get(node, nameFn(node), constr)
    );
  }
}