/**
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
    along with this program.  If not, see <https:www.gnu.org/licenses/>.
 */

import config from '../../cli-config.js';

const buildFullUrl = (path) => `${ config.baseUrl + path }/`;
const groupsFullPath = buildFullUrl(config.paths.groups);
const namesFullPath = buildFullUrl(config.paths.names);
const timetablesFullPath = buildFullUrl(config.paths.timetables);
const teachersTimetablesFullPath = buildFullUrl(config.paths.teachersTimetables);
const orderFullPath = buildFullUrl(config.paths.order);

async function fetchTeachersTimetables() {
    const response = await fetchFromDb(teachersTimetablesFullPath);

    return removeInternalFields(response);
}

async function fetchTimetables() {
    const response = await fetchFromDb(timetablesFullPath);

    return removeInternalFields(response);
}

async function fetchOrder() {
    const resonse = await fetchFromDb(orderFullPath);

    return removeInternalFields(resonse);
}

async function fetchNames() {
    const result = await fetchFromDb(namesFullPath);
    const data = result.data;
    const iterableData = Object.entries(data);
    const sortedData = iterableData.sort((fst, snd) => fst[1].localeCompare(snd[1]));

    return sortedData;
}

async function fetchGroups() {
    const result = await fetchFromDb(groupsFullPath);
    const data = result.data;

    return data;
}

async function fetchFromDb(fullPath) {
    const response = await fetch(fullPath);
    const json = await response.json();

    return json;
}

export {
    fetchGroups, fetchNames, fetchOrder, fetchTeachersTimetables, fetchTimetables
};
