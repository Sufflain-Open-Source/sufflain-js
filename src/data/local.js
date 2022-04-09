/* 
Copyright (C) 2022 Timofey Chuchkanov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const groupIdKey = 'gid';
const userNameKey = 'tid';
const storage = window.localStorage;

function getGroup() {
    return get(groupIdKey);
}

function getName() {
    return get(userNameKey);
}

// get :: String -> String or null
function get(key) {
    return storage.getItem(key);
}

function setGroup(entity) {
    set(groupIdKey, entity);
}

function setName(entity) {
    set(userNameKey, entity);
}

// set :: String Any -> Undefined
function set(key, val) {
    storage.setItem(key, val);
}

function removeGroup() {
    remove(groupIdKey);
}

function removeName() {
    remove(userNameKey);
}

function remove(key) {
    storage.removeItem(key);
}

function clearStorage() {
    storage.clear();
}

export {
    getGroup, setGroup, removeGroup, getName, setName, removeName, clearStorage
}
